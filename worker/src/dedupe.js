// Permanent, atomic dedupe keyed on the Jotform submission ID.
//
// A Durable Object (SQLite-backed) is used because it is single-threaded and
// its SQL is synchronous, so claim() is a true atomic put-if-absent. KV cannot
// do that. One object exists per dedupe key (submission ID, or
// "<submission ID>:lead").
//
// States: pending -> sent | no_consent | needs_review | consented_missing_identifiers
// Only the key, outcome, booking type and timestamp are stored. No personal data.

export const TERMINAL = ['sent', 'no_consent', 'needs_review', 'consented_missing_identifiers'];

// A `pending` claim older than this is treated as abandoned (Worker crashed
// between claim and release) so a retry can proceed. Honest limitation: if GA4
// accepted the event but the Worker died before marking it `sent`, a retry
// after this window can send it once more.
export const PENDING_TTL_MS = 2 * 60 * 1000;

export class DedupeStore {
  constructor(sql, now = () => Date.now()) {
    this.sql = sql;
    this.now = now;
    this.sql.exec('CREATE TABLE IF NOT EXISTS dedupe (key TEXT PRIMARY KEY, outcome TEXT NOT NULL, booking_type TEXT, ts INTEGER NOT NULL)');
  }

  row(key) {
    return this.sql.exec('SELECT outcome, ts FROM dedupe WHERE key = ?', key).toArray()[0] || null;
  }

  // Returns { claimed: true } or { claimed: false, state }.
  claim(key) {
    const existing = this.row(key);
    if (existing) {
      if (existing.outcome === 'pending' && this.now() - existing.ts > PENDING_TTL_MS) {
        this.sql.exec('UPDATE dedupe SET ts = ? WHERE key = ?', this.now(), key);
        return { claimed: true };
      }
      return { claimed: false, state: existing.outcome };
    }
    this.sql.exec("INSERT INTO dedupe (key, outcome, booking_type, ts) VALUES (?, 'pending', NULL, ?)", key, this.now());
    return { claimed: true };
  }

  finalize(key, outcome, bookingType = null) {
    if (!TERMINAL.includes(outcome)) throw new Error('invalid outcome');
    this.sql.exec("UPDATE dedupe SET outcome = ?, booking_type = ?, ts = ? WHERE key = ? AND outcome = 'pending'", outcome, bookingType, this.now(), key);
    return { ok: true };
  }

  release(key) {
    this.sql.exec("DELETE FROM dedupe WHERE key = ? AND outcome = 'pending'", key);
    return { ok: true };
  }
}

// Durable Object class (bound as SUBMISSION_DEDUPE in wrangler.toml).
export class SubmissionDedupe {
  constructor(state) {
    this.store = new DedupeStore(state.storage.sql);
  }

  async fetch(request) {
    const url = new URL(request.url);
    const body = await request.json();
    const key = String(body.key || '');
    let result;
    if (url.pathname === '/claim') result = this.store.claim(key);
    else if (url.pathname === '/finalize') result = this.store.finalize(key, body.outcome, body.booking_type || null);
    else if (url.pathname === '/release') result = this.store.release(key);
    else return new Response('not found', { status: 404 });
    return Response.json(result);
  }
}

// Client used by the Worker.
export function dedupeClient(namespace) {
  const call = async (path, payload) => {
    const stub = namespace.get(namespace.idFromName(payload.key));
    const res = await stub.fetch('https://dedupe.internal' + path, { method: 'POST', body: JSON.stringify(payload) });
    return res.json();
  };
  return {
    claim: (key) => call('/claim', { key }),
    finalize: (key, outcome, booking_type) => call('/finalize', { key, outcome, booking_type }),
    release: (key) => call('/release', { key }),
  };
}
