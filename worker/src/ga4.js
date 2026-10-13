// GA4 Measurement Protocol payload builder and sender.
// Only the whitelisted, non-personal fields below can ever be sent.

export const MP_ENDPOINT = 'https://www.google-analytics.com/mp/collect';

export const EVENT_PARAM_WHITELIST = [
  'session_id', 'session_number', 'engagement_time_msec', 'transaction_id',
  'booking_type', 'value', 'currency', 'form_id', 'conversion_location',
];
export const PAYLOAD_KEY_WHITELIST = ['client_id', 'consent', 'events'];

export function buildPayload({ eventName, clientId, sessionId, sessionNumber, adsConsent, transactionId, product, currency, formId }) {
  const params = {
    session_id: String(sessionId),
    engagement_time_msec: 1,
    transaction_id: String(transactionId),
    booking_type: product.booking_type,
    value: product.value,
    currency,
    form_id: String(formId),
    conversion_location: 'jotform_webhook',
  };
  if (sessionNumber) params.session_number = Number(sessionNumber);
  const grant = adsConsent ? 'GRANTED' : 'DENIED';
  // No user_id, user_data, user_properties, IP, user agent or geo override.
  return {
    client_id: clientId,
    consent: { ad_user_data: grant, ad_personalization: grant },
    events: [{ name: eventName, params }],
  };
}

export async function sendEvent(config, payload, fetchImpl = fetch) {
  const url = `${MP_ENDPOINT}?measurement_id=${encodeURIComponent(config.measurementId)}&api_secret=${encodeURIComponent(config.apiSecret)}`;
  try {
    const res = await fetchImpl(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
    return res.status >= 200 && res.status < 300;
  } catch (e) {
    return false;
  }
}
