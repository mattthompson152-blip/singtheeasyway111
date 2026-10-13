import { DatabaseSync } from 'node:sqlite';
import { SubmissionDedupe } from '../src/dedupe.js';

export const SECRET = 'test-secret';
export const SID = '5555555555555555555';
export const ENV = { WEBHOOK_SECRET: SECRET, JOTFORM_API_KEY: 'k', GA4_API_SECRET: 's' };

// Real SQL (node:sqlite) behind the same Durable Object class used in production.
export function fakeNamespace() {
  const objects = new Map();
  return {
    idFromName: (n) => n,
    get(id) {
      if (!objects.has(id)) {
        const db = new DatabaseSync(':memory:');
        const sql = { exec: (q, ...b) => { const rows = /^\s*select/i.test(q) ? db.prepare(q).all(...b) : (db.prepare(q).run(...b), []); return { toArray: () => rows }; } };
        objects.set(id, new SubmissionDedupe({ storage: { sql } }));
      }
      const obj = objects.get(id);
      return { fetch: (url, init) => obj.fetch(new Request(url, init)) };
    },
    count: () => objects.size,
  };
}

export function payment(status, extra = {}, total = '25.00 GBP', product = 'Consultation (Qty: 1, Amount: 25.00 GBP)') {
  return { type: 'control_stripe', name: 'payment', answer: { status, paymentArray: JSON.stringify({ total, product: [product] }), ...extra } };
}

export function submission(over = {}) {
  const hidden = (name, answer) => ({ name, type: 'control_hidden', answer });
  return {
    id: SID, form_id: '262622799830063', status: 'ACTIVE',
    answers: {
      1: { name: 'fullName', type: 'control_fullname', answer: { first: 'Jane', last: 'Singer' } },
      2: { name: 'email', type: 'control_email', answer: 'jane@example.com' },
      3: { name: 'bookingOption', type: 'control_radio', answer: 'Consultation' },
      4: payment('COMPLETED'),
      5: hidden('analytics_consent', '1'), 6: hidden('ads_consent', ''),
      7: hidden('ga_client_id', '1234567890.1700000000'), 8: hidden('ga_session_id', '1700000001'),
      9: hidden('ga_session_number', '3'),
      ...(over.answers || {}),
    },
    ...Object.fromEntries(Object.entries(over).filter(([k]) => k !== 'answers')),
  };
}

export function webhook(fields = { submissionID: SID, formID: '262622799830063' }, token = SECRET, method = 'POST') {
  const body = new URLSearchParams(fields);
  return new Request(`https://w.example/jotform${token === null ? '' : '?token=' + token}`, { method, body: method === 'POST' ? body : undefined });
}

// Mock Jotform API + GA4. Records GA4 calls.
export function mocks(sub, { ga = 200, delay = 0 } = {}) {
  const calls = { ga: [], jotform: 0 };
  const fetch = async (url, init) => {
    if (String(url).startsWith('https://www.google-analytics.com/mp/collect')) {
      calls.ga.push(JSON.parse(init.body));
      if (delay) await new Promise((r) => setTimeout(r, delay));
      return new Response(null, { status: typeof ga === 'function' ? ga() : ga });
    }
    calls.jotform++;
    return new Response(JSON.stringify({ responseCode: 200, content: sub }), { status: 200 });
  };
  return { fetch, calls };
}
