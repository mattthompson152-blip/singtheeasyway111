import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const mainJs = fs.readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');
const JOTFORM = 'https://pci.jotform.com/form/262622799830063';

function page({ cookies = [], consent, gtag = true, loaded = true, search = '', html } = {}) {
  const dom = new JSDOM(html || `<body><a id="b" class="btn" href="${JOTFORM}" data-booking-option="consultation">Book</a><a id="o" href="/about.html">x</a></body>`,
    { url: 'https://singtheeasyway.com/book-online.html' + search, runScripts: 'outside-only' });
  const w = dom.window;
  const events = [];
  const gets = [];
  if (gtag) {
    w.gtag = function () {
      const a = Array.from(arguments);
      if (a[0] === 'event') events.push(a.slice(1));
      if (a[0] === 'get') gets.push(a);
    };
  }
  w.gaScriptLoaded = loaded;
  if (consent) w.document.cookie = 'SingTheEasyWay_Consent=' + encodeURIComponent(JSON.stringify(consent)) + ';path=/';
  cookies.forEach((c) => { w.document.cookie = c + ';path=/'; });
  w.eval(mainJs);
  w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
  return { w, events, gets, link: w.document.getElementById('b') };
}

const GA = ['_ga=GA1.1.1234567890.1700000000', '_ga_72QBZSZZBP=GS1.1.1700000001.3.1.1700000100.0.0.0'];

test('no consent: link unchanged on every interaction', () => {
  const { w, link } = page({ cookies: GA, consent: { analytics: false, marketing: false } });
  for (const t of ['mousedown', 'touchstart', 'click', 'contextmenu']) link.dispatchEvent(new w.Event(t, { bubbles: true, cancelable: true }));
  assert.equal(link.getAttribute('href'), JOTFORM);
});

test('no consent cookie at all: link unchanged', () => {
  const { w, link } = page({ cookies: GA });
  link.dispatchEvent(new w.Event('mousedown', { bubbles: true }));
  assert.equal(link.getAttribute('href'), JOTFORM);
});

test('analytics consent: validated GA ids appended (GS1 cookie), no ads params', () => {
  const { w, link } = page({ cookies: [...GA, '_gcl_aw=GCL.1700000000.EAIaIQobChMI12345678'], consent: { analytics: true, marketing: false } });
  link.dispatchEvent(new w.Event('mousedown', { bubbles: true }));
  const u = new URL(link.getAttribute('href'));
  assert.equal(u.origin + u.pathname, JOTFORM);
  assert.equal(u.searchParams.get('analytics_consent'), '1');
  assert.equal(u.searchParams.get('ga_client_id'), '1234567890.1700000000');
  assert.equal(u.searchParams.get('ga_session_id'), '1700000001');
  assert.equal(u.searchParams.get('ga_session_number'), '3');
  for (const k of ['ads_consent', 'gclid', 'gbraid', 'wbraid']) assert.equal(u.searchParams.has(k), false, k);
  assert.equal(link.dataset.bookingOption, 'consultation');
});

test('GS2 session cookie format is parsed', () => {
  const { w, link } = page({ cookies: ['_ga=GA1.1.1234567890.1700000000', '_ga_72QBZSZZBP=GS2.1.s1700000009$o7$g1$t1$j0$l0$h0'], consent: { analytics: true } });
  link.dispatchEvent(new w.Event('click', { bubbles: true, cancelable: true }));
  const u = new URL(link.getAttribute('href'));
  assert.equal(u.searchParams.get('ga_session_id'), '1700000009');
  assert.equal(u.searchParams.get('ga_session_number'), '7');
});

test('invalid identifiers are dropped', () => {
  const { w, link } = page({ cookies: ['_ga=GA1.1.abc.def', '_ga_72QBZSZZBP=GS1.1.xx.yy'], consent: { analytics: true } });
  link.dispatchEvent(new w.Event('mousedown', { bubbles: true }));
  const u = new URL(link.getAttribute('href'));
  assert.equal(u.searchParams.get('analytics_consent'), '1');
  for (const k of ['ga_client_id', 'ga_session_id', 'ga_session_number']) assert.equal(u.searchParams.has(k), false, k);
});

test('gtag get callbacks are used and validated; bad values ignored', () => {
  const { w, link, gets } = page({ consent: { analytics: true } });
  link.dispatchEvent(new w.Event('mousedown', { bubbles: true }));
  assert.deepEqual([...new Set(gets.map((g) => g[2]))].sort(), ['client_id', 'session_id', 'session_number']);
  gets.forEach((g) => g[3]({ client_id: '2222222222.1800000000', session_id: '1800000001', session_number: 'bad' }[g[2]]));
  link.dispatchEvent(new w.Event('mousedown', { bubbles: true }));
  const u = new URL(link.getAttribute('href'));
  assert.equal(u.searchParams.get('ga_client_id'), '2222222222.1800000000');
  assert.equal(u.searchParams.get('ga_session_id'), '1800000001');
  assert.equal(u.searchParams.has('ga_session_number'), false);
});

test('ads consent gates gclid/gbraid/wbraid', () => {
  const cookies = [...GA, '_gcl_aw=GCL.1700000000.EAIaIQobChMI12345678'];
  const search = '?wbraid=WBRAIDVALUE12345&gbraid=0AAAAAGBRAIDVALUE';
  const on = page({ cookies, search, consent: { analytics: true, marketing: true } });
  on.link.dispatchEvent(new on.w.Event('mousedown', { bubbles: true }));
  const u = new URL(on.link.getAttribute('href'));
  assert.equal(u.searchParams.get('ads_consent'), '1');
  assert.equal(u.searchParams.get('gclid'), 'EAIaIQobChMI12345678');
  assert.equal(u.searchParams.get('gbraid'), '0AAAAAGBRAIDVALUE');
  assert.equal(u.searchParams.get('wbraid'), 'WBRAIDVALUE12345');
  const off = page({ cookies, search, consent: { analytics: true, marketing: false } });
  off.link.dispatchEvent(new off.w.Event('mousedown', { bubbles: true }));
  const v = new URL(off.link.getAttribute('href'));
  for (const k of ['ads_consent', 'gclid', 'gbraid', 'wbraid']) assert.equal(v.searchParams.has(k), false, k);
  const noAnalytics = page({ cookies, consent: { analytics: false, marketing: true } });
  noAnalytics.link.dispatchEvent(new noAnalytics.w.Event('mousedown', { bubbles: true }));
  assert.equal(noAnalytics.link.getAttribute('href'), JOTFORM);
});

test('invalid gclid is not appended', () => {
  const { w, link } = page({ cookies: [...GA, '_gcl_aw=GCL.1700000000.bad%20value<>'], consent: { analytics: true, marketing: true } });
  link.dispatchEvent(new w.Event('mousedown', { bubbles: true }));
  assert.equal(new URL(link.getAttribute('href')).searchParams.has('gclid'), false);
});

test('missing gtag: links still work and are unchanged', () => {
  const { w, link } = page({ cookies: GA, consent: { analytics: true }, gtag: false, loaded: false });
  link.dispatchEvent(new w.Event('mousedown', { bubbles: true }));
  assert.equal(link.getAttribute('href'), JOTFORM);
});

test('non-booking links are never modified', () => {
  const p = page({ cookies: GA, consent: { analytics: true } });
  const other = p.w.document.getElementById('o');
  other.dispatchEvent(new p.w.Event('mousedown', { bubbles: true }));
  assert.equal(other.getAttribute('href'), '/about.html');
});

test('withdrawn consent removes previously appended params', () => {
  const { w, link } = page({ cookies: GA, consent: { analytics: true } });
  link.dispatchEvent(new w.Event('mousedown', { bubbles: true }));
  assert.ok(link.getAttribute('href').includes('ga_client_id'));
  w.document.cookie = 'SingTheEasyWay_Consent=' + encodeURIComponent(JSON.stringify({ analytics: false })) + ';path=/';
  link.dispatchEvent(new w.Event('mousedown', { bubbles: true }));
  assert.equal(link.getAttribute('href'), JOTFORM);
});

test('thank-you.html load sends no event; main.js has no booking_complete', () => {
  const html = fs.readFileSync(path.join(root, 'thank-you.html'), 'utf8');
  const dom = new JSDOM(html, { url: 'https://singtheeasyway.com/thank-you.html', runScripts: 'outside-only' });
  const w = dom.window;
  const events = [];
  w.gtag = function () { events.push(Array.from(arguments)); };
  w.gaScriptLoaded = true;
  w.document.cookie = 'SingTheEasyWay_Consent=' + encodeURIComponent(JSON.stringify({ analytics: true })) + ';path=/';
  w.eval(mainJs);
  w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
  w.document.dispatchEvent(new w.Event('analytics-consent-granted'));
  assert.deepEqual(events.filter((e) => e[0] === 'event'), []);
  assert.ok(!mainJs.includes('booking_complete'));
  assert.ok(!mainJs.includes('ten_lesson_block'));
  assert.ok(!/Date\.now\(\)/.test(mainJs));
  const consentJs = fs.readFileSync(path.join(root, 'assets/js/cookie-consent.js'), 'utf8');
  assert.ok(!consentJs.includes('booking_complete'));
});
