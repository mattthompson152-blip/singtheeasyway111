// Central configuration for the booking conversion Worker.
// Nothing here is secret. Secrets come from `wrangler secret put`.

export const DEFAULT_FORM_ID = '262622799830063';
export const DEFAULT_MEASUREMENT_ID = 'G-72QBZSZZBP';
export const DEFAULT_API_BASE = 'https://api.jotform.com';
export const CURRENCY = 'GBP';

// Unique names of the hidden Jotform fields (created by the owner in Jotform).
export const HIDDEN_FIELDS = {
  analyticsConsent: 'analytics_consent',
  adsConsent: 'ads_consent',
  clientId: 'ga_client_id',
  sessionId: 'ga_session_id',
  sessionNumber: 'ga_session_number',
};

// The unique name of the existing Booking Options field is NOT defaulted. The
// owner must read it from Jotform and set PRODUCT_FIELD_NAME (secret or var);
// until then the Worker refuses to process anything (not_configured).

// Exact mapping of Booking Options. `labels` are matched case-insensitively
// against the verified submission (never against client data). Override with
// PRODUCT_MAP_JSON using the same shape.
export const DEFAULT_PRODUCT_MAP = {
  consultation: { labels: ['Consultation'], booking_type: 'consultation', value: 25 },
  single_lesson: { labels: ['Single Lesson'], booking_type: 'single_lesson', value: 85 },
  development_programme: { labels: ['Development Programme'], booking_type: 'development_programme', value: 700 },
};

function validProductMap(map) {
  if (!map || typeof map !== 'object' || Array.isArray(map)) return false;
  const keys = Object.keys(map);
  if (keys.length === 0) return false;
  return keys.every((k) => {
    const p = map[k];
    return p && Array.isArray(p.labels) && p.labels.length > 0 && p.labels.every((l) => typeof l === 'string' && l.trim()) &&
      typeof p.booking_type === 'string' && /^[a-z_]{1,40}$/.test(p.booking_type) &&
      typeof p.value === 'number' && Number.isFinite(p.value) && p.value > 0;
  });
}

function trimTrailingSlashes(value) {
  let end = value.length;
  while (end > 0 && value[end - 1] === '/') end--;
  return value.slice(0, end);
}

export function loadConfig(env) {
  let productMap = DEFAULT_PRODUCT_MAP;
  if (env.PRODUCT_MAP_JSON) {
    try {
      const parsed = JSON.parse(env.PRODUCT_MAP_JSON);
      // An invalid override is ignored rather than silently weakening checks.
      if (validProductMap(parsed)) productMap = parsed;
    } catch (e) { /* keep defaults */ }
  }
  return {
    webhookSecret: env.WEBHOOK_SECRET || '',
    jotformApiKey: env.JOTFORM_API_KEY || '',
    jotformApiBase: trimTrailingSlashes(env.JOTFORM_API_BASE || DEFAULT_API_BASE),
    measurementId: env.GA4_MEASUREMENT_ID || DEFAULT_MEASUREMENT_ID,
    apiSecret: env.GA4_API_SECRET || '',
    formId: env.JOTFORM_FORM_ID || DEFAULT_FORM_ID,
    productFieldName: (env.PRODUCT_FIELD_NAME || '').trim(),
    productMap,
  };
}
