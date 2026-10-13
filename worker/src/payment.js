// Payment verification for a Jotform submission (as returned by
// GET /submission/{id}, `content` object). Everything here FAILS CLOSED:
// unless a payment block positively reports success, nothing is counted.
//
// ASSUMPTION (owner must confirm with one real paid test, see docs): the
// payment gateway answer is a field whose type is a payment control
// (control_stripe, control_paypal, control_square, ...), and its `answer`
// reports the gateway result in `status` / `paymentStatus` (directly or inside
// the JSON `paymentArray`). Jotform's public documentation does not
// guarantee one status vocabulary across gateways, so any value that is not
// in PAID_STATUSES is treated as NOT paid.

const PAYMENT_TYPE = /pay|stripe|square|authnet|braintree|mollie|worldpay|klarna|gocardless|eway|razorpay|2checkout|sofort|ideal/i;

const PAID_STATUSES = new Set(['PAID', 'COMPLETED', 'COMPLETE', 'SUCCEEDED', 'SUCCESS', 'SUCCESSFUL', 'CAPTURED', 'SETTLED']);

function asObject(value) {
  if (value && typeof value === 'object') return value;
  if (typeof value === 'string' && value.trim().startsWith('{')) {
    try { return JSON.parse(value); } catch (e) { return null; }
  }
  return null;
}

export function findPaymentAnswers(submission) {
  const answers = submission && submission.answers;
  if (!answers || typeof answers !== 'object') return [];
  return Object.values(answers).filter((a) => a && typeof a === 'object' && PAYMENT_TYPE.test(String(a.type || '')));
}

function statusCandidates(answer) {
  const out = [];
  const add = (v) => { if (typeof v === 'string' && v.trim()) out.push(v.trim().toUpperCase().replace(/[\s-]+/g, '_')); };
  const inner = asObject(answer.answer);
  const arr = asObject(answer.paymentArray) || (inner && asObject(inner.paymentArray));
  [answer, inner, arr].forEach((o) => {
    if (!o) return;
    add(o.status); add(o.paymentStatus); add(o.payment_status);
  });
  return out;
}

function refundFlag(answer) {
  const inner = asObject(answer.answer) || {};
  const arr = asObject(answer.paymentArray) || asObject(inner.paymentArray) || {};
  return [answer, inner, arr].some((o) => o && (o.refunded === true || o.refunded === '1' || o.refunded === 1 || o.refund === true));
}

// True only when a payment block exists and every status it reports is a
// success state, with at least one success status present and no refund flag.
// Pending, failed, cancelled/abandoned, refunded, unknown and missing blocks
// are all false.
export function isPaymentVerified(submission) {
  const payments = findPaymentAnswers(submission);
  if (payments.length === 0) return false;
  let sawPaid = false;
  for (const p of payments) {
    if (refundFlag(p)) return false;
    const statuses = statusCandidates(p);
    for (const s of statuses) {
      if (!PAID_STATUSES.has(s)) return false; // PENDING, FAILED, CANCELLED, REFUNDED, ...
      sawPaid = true;
    }
  }
  return sawPaid;
}

function parseAmount(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value !== 'string') return null;
  const m = /(-?\d+(?:[.,]\d+)?)/.exec(value.replace(/,(?=\d{3}\b)/g, ''));
  if (!m) return null;
  const n = Number(m[1].replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

// Extracts the paid amount, currency and product names from the payment block.
export function getPaymentDetails(submission) {
  const details = { amount: null, currency: null, products: [] };
  for (const p of findPaymentAnswers(submission)) {
    const inner = asObject(p.answer) || {};
    const arr = asObject(p.paymentArray) || asObject(inner.paymentArray) || {};
    const total = [arr.total, inner.total, inner.amount, p.total, p.amount].find((v) => v !== undefined && v !== null && v !== '');
    if (details.amount === null && total !== undefined) {
      details.amount = parseAmount(total);
      const c = typeof total === 'string' ? /\b([A-Za-z]{3})\b/.exec(total) : null;
      details.currency = (c && c[1].toUpperCase()) || (inner.currency || arr.currency || '').toString().toUpperCase() || null;
    }
    const products = arr.product || inner.product || [];
    (Array.isArray(products) ? products : [products]).forEach((x) => {
      if (typeof x === 'string' && x.trim()) details.products.push(x);
    });
  }
  return details;
}
