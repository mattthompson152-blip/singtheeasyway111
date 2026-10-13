// Verified booking conversion Worker.
// Jotform webhook -> verify paid submission via Jotform API -> identify product
// -> consent check -> atomic dedupe -> GA4 Measurement Protocol.
//
// Webhook payload data is NEVER trusted beyond submissionID and formID.
// Nothing from the payload or the submission is ever logged.

import { loadConfig, HIDDEN_FIELDS, CURRENCY } from './config.js';
import { isPaymentVerified, getPaymentDetails } from './payment.js';
import { buildPayload, sendEvent } from './ga4.js';
import { dedupeClient, SubmissionDedupe } from './dedupe.js';

export { SubmissionDedupe };

const CLIENT_ID_RE = /^\d{5,12}\.\d{5,12}$/;
const DIGITS_RE = /^\d{1,20}$/;
const SUBMISSION_ID_RE = /^\d{6,25}$/;
const FORM_ID_RE = /^\d{6,25}$/;

function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

function log(outcome, submissionId) {
  // Outcome words and the submission ID only.
  console.log(JSON.stringify({ outcome, submission_id: submissionId || undefined }));
}

async function constantTimeEqual(a, b) {
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(a)),
    crypto.subtle.digest('SHA-256', enc.encode(b)),
  ]);
  const x = new Uint8Array(ha);
  const y = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

function answerByName(submission, name) {
  const answers = (submission && submission.answers) || {};
  for (const a of Object.values(answers)) {
    if (a && typeof a === 'object' && a.name === name) return a.answer;
  }
  return undefined;
}

function textOf(value) {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(textOf).join(' ');
  if (typeof value === 'object') return Object.values(value).map(textOf).join(' ');
  return '';
}

function matchProducts(text, productMap) {
  const t = text.toLowerCase();
  return Object.keys(productMap).filter((k) => productMap[k].labels.some((l) => t.includes(l.toLowerCase())));
}

// Product comes from the VERIFIED submission only (product field and/or the
// payment block product names), never from client-supplied data. Returns a
// product map entry or null (unknown/ambiguous/inconsistent -> needs_review).
export function identifyProduct(submission, config) {
  const candidates = [];
  // The selected Booking Option field is mandatory: no field value, no product.
  const fieldText = textOf(answerByName(submission, config.productFieldName));
  if (!fieldText.trim()) return null;
  candidates.push(matchProducts(fieldText, config.productMap));
  const payText = getPaymentDetails(submission).products.join(' ');
  if (payText) candidates.push(matchProducts(payText, config.productMap));
  if (candidates.length === 0) return null;
  if (candidates.some((c) => c.length !== 1)) return null;
  const keys = new Set(candidates.map((c) => c[0]));
  if (keys.size !== 1) return null;
  return config.productMap[[...keys][0]];
}

function amountMatches(submission, product) {
  const d = getPaymentDetails(submission);
  if (d.amount === null || Math.abs(d.amount - product.value) > 0.001) return false;
  if (d.currency && d.currency !== CURRENCY) return false;
  return true;
}

async function fetchSubmission(config, submissionId, fetchImpl) {
  try {
    const res = await fetchImpl(`${config.jotformApiBase}/submission/${submissionId}`, {
      headers: { APIKEY: config.jotformApiKey },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.content && typeof data.content === 'object' ? data.content : null;
  } catch (e) {
    return null;
  }
}

async function sendOnce(dedupe, key, config, payload, bookingType, fetchImpl) {
  const claim = await dedupe.claim(key);
  if (!claim.claimed) return claim.state === 'pending' ? 'in_progress' : 'duplicate';
  const ok = await sendEvent(config, payload, fetchImpl);
  if (!ok) {
    await dedupe.release(key); // non-2xx: allow a retry to succeed
    return 'ga4_error';
  }
  await dedupe.finalize(key, 'sent', bookingType);
  return 'sent';
}

async function terminal(dedupe, key, outcome, bookingType) {
  const claim = await dedupe.claim(key);
  if (!claim.claimed) return claim.state === 'pending' ? 'in_progress' : 'duplicate';
  await dedupe.finalize(key, outcome, bookingType || null);
  return outcome;
}

export async function handleRequest(request, env, deps = {}) {
  const fetchImpl = deps.fetch || fetch;
  const config = loadConfig(env);
  const dedupe = deps.dedupe || dedupeClient(env.SUBMISSION_DEDUPE);
  const url = new URL(request.url);

  if (url.pathname !== '/jotform') return json(404, { status: 'not_found' });
  if (request.method !== 'POST') return json(405, { status: 'method_not_allowed' });

  const token = url.searchParams.get('token') || '';
  if (!config.webhookSecret || !(await constantTimeEqual(token, config.webhookSecret))) {
    return json(401, { status: 'unauthorized' });
  }

  let submissionId = '';
  let formId = '';
  try {
    const form = await request.formData();
    submissionId = String(form.get('submissionID') || '').trim();
    formId = String(form.get('formID') || '').trim();
  } catch (e) {
    return json(400, { status: 'bad_request' });
  }
  if (!SUBMISSION_ID_RE.test(submissionId) || !FORM_ID_RE.test(formId)) return json(400, { status: 'bad_request' });
  if (formId !== config.formId) { log('wrong_form'); return json(400, { status: 'wrong_form' }); }
  if (!config.jotformApiKey || !config.apiSecret || !config.productFieldName) { log('not_configured'); return json(500, { status: 'not_configured' }); }

  const submission = await fetchSubmission(config, submissionId, fetchImpl);
  if (!submission) { log('verification_unavailable', submissionId); return json(502, { status: 'verification_unavailable' }); }

  // Verified record must be this submission, on this form, and active.
  if (String(submission.form_id) !== config.formId || String(submission.id) !== submissionId ||
      String(submission.status).toUpperCase() !== 'ACTIVE' || !isPaymentVerified(submission)) {
    // Does NOT consume the dedupe slot, so a redelivery after payment still works.
    log('unpaid_or_unverified', submissionId);
    return json(200, { status: 'unpaid_or_unverified' });
  }

  const product = identifyProduct(submission, config);
  if (!product || !amountMatches(submission, product)) {
    const r = await terminal(dedupe, submissionId, 'needs_review', null);
    log(r, submissionId);
    return json(200, { status: r });
  }

  const f = HIDDEN_FIELDS;
  if (textOf(answerByName(submission, f.analyticsConsent)).trim() !== '1') {
    const r = await terminal(dedupe, submissionId, 'no_consent', product.booking_type);
    log(r, submissionId);
    return json(200, { status: r });
  }

  const clientId = textOf(answerByName(submission, f.clientId)).trim();
  const sessionId = textOf(answerByName(submission, f.sessionId)).trim();
  const sessionNumber = textOf(answerByName(submission, f.sessionNumber)).trim();
  if (!CLIENT_ID_RE.test(clientId) || !DIGITS_RE.test(sessionId) || (sessionNumber && !DIGITS_RE.test(sessionNumber))) {
    const r = await terminal(dedupe, submissionId, 'consented_missing_identifiers', product.booking_type);
    log(r, submissionId);
    return json(200, { status: r });
  }

  const adsConsent = textOf(answerByName(submission, f.adsConsent)).trim() === '1';
  const base = { clientId, sessionId, sessionNumber, adsConsent, transactionId: submissionId, product, currency: CURRENCY, formId: config.formId };
  const results = [
    await sendOnce(dedupe, submissionId, config, buildPayload({ ...base, eventName: 'booking_complete' }), product.booking_type, fetchImpl),
    await sendOnce(dedupe, submissionId + ':lead', config, buildPayload({ ...base, eventName: 'generate_lead' }), product.booking_type, fetchImpl),
  ];

  let status = 'duplicate';
  if (results.includes('ga4_error')) status = 'ga4_error';
  else if (results.includes('sent')) status = 'sent';
  else if (results.includes('in_progress')) status = 'in_progress';
  log(status, submissionId);
  return json(status === 'ga4_error' ? 502 : 200, { status });
}

export default {
  fetch(request, env) {
    return handleRequest(request, env);
  },
};
