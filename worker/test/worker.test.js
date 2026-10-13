import test from 'node:test';
import assert from 'node:assert/strict';
import { handleRequest } from '../src/index.js';
import { dedupeClient } from '../src/dedupe.js';
import { isPaymentVerified } from '../src/payment.js';
import { EVENT_PARAM_WHITELIST, PAYLOAD_KEY_WHITELIST } from '../src/ga4.js';
import { ENV, SECRET, SID, fakeNamespace, payment, submission, webhook, mocks } from './helpers.js';

async function run(sub, opts = {}, ns = fakeNamespace(), req = webhook()) {
  const m = mocks(sub, opts);
  const res = await handleRequest(req, ENV, { fetch: m.fetch, dedupe: dedupeClient(ns) });
  return { res, body: await res.json(), calls: m.calls, ns };
}

test('missing / bad token -> 401, nothing sent', async () => {
  for (const t of [null, 'wrong', '']) {
    const { res, calls } = await run(submission(), {}, fakeNamespace(), webhook(undefined, t));
    assert.equal(res.status, 401);
    assert.equal(calls.ga.length + calls.jotform, 0);
  }
});

test('non-POST rejected', async () => {
  const { res } = await run(submission(), {}, fakeNamespace(), webhook(undefined, 's', 'GET'));
  assert.equal(res.status, 405);
});

test('wrong form ID rejected before any API call', async () => {
  const { res, body, calls } = await run(submission(), {}, fakeNamespace(), webhook({ submissionID: SID, formID: '111111111111' }));
  assert.equal(res.status, 400);
  assert.equal(body.status, 'wrong_form');
  assert.equal(calls.jotform, 0);
});

test('verified form mismatch / non-ACTIVE submission sends nothing', async () => {
  for (const over of [{ form_id: '999999' }, { status: 'DELETED' }, { status: 'OVERQUOTA' }]) {
    const { body, calls } = await run(submission(over));
    assert.equal(body.status, 'unpaid_or_unverified');
    assert.equal(calls.ga.length, 0);
  }
});

const unpaid = {
  pending: payment('PENDING'), failed: payment('FAILED'), cancelled: payment('CANCELLED'),
  abandoned: payment('ABANDONED'), refunded: payment('REFUNDED'), unknown: payment('something_else'),
  refundFlag: payment('PAID', { refunded: true }), noStatus: { type: 'control_stripe', answer: {} },
};
for (const [name, p] of Object.entries(unpaid)) {
  test(`isPaymentVerified false + nothing sent + slot not consumed: ${name}`, async () => {
    const sub = submission({ answers: { 4: p } });
    assert.equal(isPaymentVerified(sub), false);
    const ns = fakeNamespace();
    const first = await run(sub, {}, ns);
    assert.equal(first.body.status, 'unpaid_or_unverified');
    assert.equal(first.calls.ga.length, 0);
    assert.equal(ns.count(), 0);
    // redelivery after payment succeeds
    const second = await run(submission(), {}, ns);
    assert.equal(second.body.status, 'sent');
    assert.equal(second.calls.ga.length, 2);
  });
}

test('isPaymentVerified: paid true; missing payment block false', () => {
  for (const s of ['PAID', 'COMPLETED', 'succeeded']) assert.equal(isPaymentVerified(submission({ answers: { 4: payment(s) } })), true);
  const sub = submission();
  delete sub.answers[4];
  assert.equal(isPaymentVerified(sub), false);
  assert.equal(isPaymentVerified({}), false);
});

const products = [
  ['Consultation', 'consultation', 25], ['Single Lesson', 'single_lesson', 85], ['Development Programme', 'development_programme', 700],
];
for (const [label, type, value] of products) {
  test(`product ${label} -> ${type} ${value} GBP, txn id = submission id`, async () => {
    const sub = submission({ answers: {
      3: { name: 'bookingOption', answer: label },
      4: payment('COMPLETED', {}, `${value}.00 GBP`, `${label} (Qty: 1, Amount: ${value}.00 GBP)`),
    } });
    const { body, calls } = await run(sub);
    assert.equal(body.status, 'sent');
    const [main, lead] = calls.ga;
    assert.equal(main.events[0].name, 'booking_complete');
    assert.equal(lead.events[0].name, 'generate_lead');
    for (const p of [main.events[0].params, lead.events[0].params]) {
      assert.equal(p.booking_type, type); assert.equal(p.value, value);
      assert.equal(p.currency, 'GBP'); assert.equal(p.transaction_id, SID);
    }
  });
}

test('amount mismatch -> needs_review, nothing sent', async () => {
  const sub = submission({ answers: { 4: payment('COMPLETED', {}, '85.00 GBP') } });
  const { body, calls } = await run(sub);
  assert.equal(body.status, 'needs_review');
  assert.equal(calls.ga.length, 0);
});

test('unknown product -> needs_review, nothing sent', async () => {
  const sub = submission({ answers: { 3: { name: 'bookingOption', answer: 'Mystery' }, 4: payment('COMPLETED', {}, '25.00 GBP', 'Mystery (Qty: 1)') } });
  const { body, calls } = await run(sub);
  assert.equal(body.status, 'needs_review');
  assert.equal(calls.ga.length, 0);
});

test('product field and payment block disagree -> needs_review', async () => {
  const sub = submission({ answers: { 3: { name: 'bookingOption', answer: 'Single Lesson' } } });
  assert.equal((await run(sub)).body.status, 'needs_review');
});

test('analytics_consent absent / 0 -> no GA4 call, no_consent recorded permanently', async () => {
  for (const v of [undefined, '', '0']) {
    const answers = { 5: { name: 'analytics_consent', answer: v } };
    const ns = fakeNamespace();
    const { body, calls } = await run(submission({ answers }), {}, ns);
    assert.equal(body.status, 'no_consent');
    assert.equal(calls.ga.length, 0);
    assert.equal((await run(submission({ answers }), {}, ns)).body.status, 'duplicate');
  }
});

test('consent=1 with valid ids -> genuine client_id, session_id, session_number, consent denied without ads_consent', async () => {
  const { calls } = await run(submission());
  const p = calls.ga[0];
  assert.equal(p.client_id, '1234567890.1700000000');
  assert.equal(p.events[0].params.session_id, '1700000001');
  assert.equal(p.events[0].params.session_number, 3);
  assert.equal(p.events[0].params.engagement_time_msec, 1);
  assert.equal(p.events[0].params.conversion_location, 'jotform_webhook');
  assert.equal(p.events[0].params.form_id, '262622799830063');
  assert.deepEqual(p.consent, { ad_user_data: 'DENIED', ad_personalization: 'DENIED' });
});

test('ads_consent=1 -> consent object GRANTED', async () => {
  const { calls } = await run(submission({ answers: { 6: { name: 'ads_consent', answer: '1' } } }));
  assert.deepEqual(calls.ga[0].consent, { ad_user_data: 'GRANTED', ad_personalization: 'GRANTED' });
});

test('consent=1 with missing/invalid ids -> nothing sent, never invented', async () => {
  const bad = [
    { 7: { name: 'ga_client_id', answer: '' } }, { 7: { name: 'ga_client_id', answer: 'abc.def' } },
    { 8: { name: 'ga_session_id', answer: '' } }, { 8: { name: 'ga_session_id', answer: '12x' } },
    { 9: { name: 'ga_session_number', answer: 'x' } },
  ];
  for (const answers of bad) {
    const { body, calls } = await run(submission({ answers }));
    assert.equal(body.status, 'consented_missing_identifiers');
    assert.equal(calls.ga.length, 0);
  }
});

test('payload whitelist: no personal data, no user_id/user_data/IP', async () => {
  const sub = submission({ ip: '203.0.113.9' });
  const { calls } = await run(sub);
  for (const p of calls.ga) {
    assert.deepEqual(Object.keys(p).sort(), [...PAYLOAD_KEY_WHITELIST].sort());
    for (const e of p.events) for (const k of Object.keys(e.params)) assert.ok(EVENT_PARAM_WHITELIST.includes(k), k);
    const text = JSON.stringify(p);
    for (const s of ['Jane', 'Singer', 'jane@example.com', '203.0.113.9', '"user_id"', '"user_data"', 'ip_override']) assert.ok(!text.includes(s), s);
  }
});

test('gclid in submission is not forwarded to GA4', async () => {
  const sub = submission({ answers: { 10: { name: 'gclid', answer: 'EAIaIQobChMI12345678' } } });
  const { calls } = await run(sub);
  assert.ok(!JSON.stringify(calls.ga).includes('EAIaIQ'));
});

test('duplicate delivery -> exactly one booking_complete and one generate_lead', async () => {
  const ns = fakeNamespace();
  const m = mocks(submission());
  const deps = { fetch: m.fetch, dedupe: dedupeClient(ns) };
  assert.equal((await (await handleRequest(webhook(), ENV, deps)).json()).status, 'sent');
  assert.equal((await (await handleRequest(webhook(), ENV, deps)).json()).status, 'duplicate');
  assert.deepEqual(m.calls.ga.map((c) => c.events[0].name), ['booking_complete', 'generate_lead']);
});

test('concurrent duplicate deliveries -> exactly one GA4 send each', async () => {
  const ns = fakeNamespace();
  const m = mocks(submission(), { delay: 20 });
  const deps = { fetch: m.fetch, dedupe: dedupeClient(ns) };
  await Promise.all(Array.from({ length: 6 }, () => handleRequest(webhook(), ENV, deps)));
  const names = m.calls.ga.map((c) => c.events[0].name).sort();
  assert.deepEqual(names, ['booking_complete', 'generate_lead']);
});

test('GA4 failure releases pending and retry succeeds', async () => {
  const ns = fakeNamespace();
  let fail = true;
  const m = mocks(submission(), { ga: () => (fail ? 500 : 204) });
  const deps = { fetch: m.fetch, dedupe: dedupeClient(ns) };
  const first = await handleRequest(webhook(), ENV, deps);
  assert.equal(first.status, 502);
  fail = false;
  const second = await handleRequest(webhook(), ENV, deps);
  assert.equal((await second.json()).status, 'sent');
  assert.equal(m.calls.ga.filter((c) => c.events[0].name === 'booking_complete').length, 2); // 1 failed + 1 ok
});

test('logs contain no payload/personal data', async () => {
  const lines = [];
  const orig = console.log;
  console.log = (...a) => lines.push(a.join(' '));
  try {
    await run(submission());
    await run(submission({ answers: { 4: payment('PENDING') } }));
  } finally { console.log = orig; }
  const text = lines.join('\n');
  assert.ok(text.length > 0);
  for (const s of ['Jane', 'jane@example.com', '1234567890.1700000000', SECRET, 'GRANTED']) assert.ok(!text.includes(s), s);
});

test('responses never echo submission data', async () => {
  const { body } = await run(submission());
  assert.deepEqual(Object.keys(body), ['status']);
});
