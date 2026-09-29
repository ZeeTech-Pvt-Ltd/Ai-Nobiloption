// Lead submission for the Ai Nobiloption signup/contact forms.
//
// Posts JSON to the platform relay, which assigns the real account password
// and resolves the visitor's IP server-side - no IP is read or sent from here.
//
// `Content-Type: application/json` is load-bearing: a form-encoded body
// arrives at the relay as empty strings and comes back "Enter first name."
// no matter what was typed.

const ENDPOINT = 'https://meridianc-au.com/homeMailAction.php'
const OFFER_NAME = 'AiNobiloption-Site'
const ACCOUNT_PASSWORD = 'Lh23s3' // template constant, not a secret
const TIMEOUT_MS = 15000

// Relay error codes -> the field they belong to. The form marks these
// individually instead of dumping everything into one banner.
const FIELD_BY_CODE = {
  10001: 'firstName', 10006: 'firstName',
  10002: 'lastName', 10007: 'lastName',
  10003: 'email', 10008: 'email',
  10005: 'phone',
}

/** The relay appends an internal reference, e.g. "…try again. (#8plo9)".
    It is noise for a visitor, so strip it before showing the message. */
export function cleanServerMessage(message) {
  return String(message == null ? '' : message)
    .replace(/\s*\(#[A-Za-z0-9]+\)\s*$/, '')
    .trim()
}

/** `_debug.affilix_raw` is a JSON string holding the relay's field errors. */
function parseFieldErrors(body) {
  const raw = body && body._debug && body._debug.affilix_raw
  if (typeof raw !== 'string' || !raw) return {}
  try {
    const parsed = JSON.parse(raw)
    const list = Array.isArray(parsed?.errors) ? parsed.errors : []
    const byField = {}
    for (const err of list) {
      const field = FIELD_BY_CODE[Number(err?.code)]
      if (field && !byField[field] && err?.message) {
        byField[field] = cleanServerMessage(err.message)
      }
    }
    return byField
  } catch {
    return {}
  }
}

/**
 * @returns {Promise<{ok: true} | {ok: false, kind: 'rejected'|'service'|'network', message: string, fieldErrors: object}>}
 *
 * `kind` matters: a 2xx carrying `status: "error"` is the relay rejecting the
 * visitor's details, while a non-2xx or unparseable body is the service
 * failing. The form tells the visitor different things for each.
 */
export async function submitLead({ firstName, lastName, email, phone }) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        password: ACCOUNT_PASSWORD,
        phone,
        offerName: OFFER_NAME,
      }),
    })

    // A non-JSON body throws, and `body` stays null. An empty or HTML
    // response must never be read as a success.
    const body = await response.json().catch(() => null)

    if (!response.ok) {
      return {
        ok: false,
        kind: 'service',
        message: 'The registration service is unavailable right now. Please try again in a moment.',
        fieldErrors: {},
      }
    }

    if (!body || body.status !== 'success') {
      const fieldErrors = parseFieldErrors(body)
      const rawMessage = body && typeof body.message === 'string' ? body.message : ''
      return {
        ok: false,
        kind: 'rejected',
        message:
          rawMessage && Object.keys(fieldErrors).length === 0
            ? cleanServerMessage(rawMessage)
            : 'Please check the highlighted details and try again.',
        fieldErrors,
      }
    }

    return { ok: true }
  } catch {
    // Network failure, CORS, abort/timeout, or the service being unreachable.
    return {
      ok: false,
      kind: 'network',
      message: 'We could not reach the registration service. Please check your connection and try again.',
      fieldErrors: {},
    }
  } finally {
    clearTimeout(timeoutId)
  }
}
