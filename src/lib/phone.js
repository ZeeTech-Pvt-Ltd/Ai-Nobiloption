// Phone-number helpers shared by the signup and contact forms.
import { countries } from '../data/countries.js'

/** Dial code for an ISO country, e.g. "61" for Australia. */
export function dialCodeOf(iso) {
  const entry = countries.find(([c]) => c === iso)
  return entry ? String(entry[2]) : '61'
}

/** Strip everything that is not a digit or a leading "+". */
export function cleanPhone(value) {
  return String(value == null ? '' : value).replace(/[^\d+]/g, '')
}

// Dial code -> the country people most likely mean for a pasted number.
// +1 is shared by the NANP (US/CA/…); +7 by Russia and Kazakhstan.
const DIAL_ISO = (() => {
  const major = { 1: 'US', 7: 'RU' }
  const map = {}
  countries.forEach(([code, , dial]) => {
    if (!(dial in map)) map[dial] = major[dial] || code
  })
  return map
})()

/** The country whose dial code prefixes `digits`, or null. Longest wins, so
    "8801…" reads as Bangladesh (+880) rather than Vietnam (+84). */
export function dialForPrefix(digits) {
  for (let len = Math.min(4, digits.length); len >= 1; len--) {
    const iso = DIAL_ISO[digits.slice(0, len)]
    if (iso) return iso
  }
  return null
}

/**
 * Reduce whatever was typed or pasted into the bare national number for the
 * country that owns it. The dial code already sits in the flag prefix, so a
 * pasted "+61412345678" or "61412345678" reduces to "412345678" and the
 * returned `iso` tells the form whether to re-point the flag.
 *
 * A local trunk "0" is deliberately LEFT IN PLACE. Stripping it here would
 * silently swallow a mistake the visitor should be told about, so it is
 * handed to validatePhone, which rejects it with a message that says why.
 */
export function parsePhoneInput(raw, currentIso) {
  let digits = cleanPhone(raw)
  let iso = currentIso

  if (digits.startsWith('+')) {
    digits = digits.slice(1)
    const codeIso = dialForPrefix(digits)
    if (codeIso) {
      iso = codeIso
      digits = digits.slice(dialCodeOf(codeIso).length)
    }
  } else {
    const dial = dialCodeOf(iso)
    // A pasted number may carry its own country code even without the "+".
    if (digits.startsWith(dial) && digits.length - dial.length >= 5) {
      digits = digits.slice(dial.length)
    }
  }

  return { iso, national: digits }
}

/**
 * Send the number in E.164 (e.g. +61412345678). The national part holds no
 * country code or trunk prefix; the strip below is a belt-and-braces guard so
 * a stray code that slipped through is never double-prefixed.
 */
export function toE164(iso, national) {
  const dial = dialCodeOf(iso)
  let digits = cleanPhone(national).replace(/^\+/, '')
  if (!digits) return ''
  if (digits.startsWith(dial) && digits.length > dial.length) digits = digits.slice(dial.length)
  digits = digits.replace(/^0+(?=\d)/, '')
  return digits ? `+${dial}${digits}` : ''
}

/**
 * The dial code is already selected in the prefix beside the field, so a
 * leading "0" is a trunk prefix that must not be sent. It is rejected with a
 * message that says so rather than silently dropped, so the visitor can see
 * what happened to their input.
 */
export function validatePhone(value) {
  const phone = String(value == null ? '' : value).trim()
  if (!phone) return 'Please enter your phone number.'

  const digits = cleanPhone(phone).replace(/^\+/, '')
  if (!digits) return 'Please enter your phone number.'
  if (digits.startsWith('0')) {
    return 'Please remove the leading 0 - the country code is already selected.'
  }
  if (digits.length < 6 || digits.length > 15) {
    return 'Please enter a valid phone number (6 to 15 digits).'
  }
  return ''
}
