// Country auto-detection (from visitor IP) + per-country phone examples.

// Example phone-number format shown as the field placeholder, keyed by ISO code.
// Falls back to a generic placeholder for countries not listed here.
const PHONE_EXAMPLE = {
  AU: '0412 345 678',
  US: '555 123 4567',
  CA: '555 123 4567',
  GB: '07123 456789',
  NZ: '021 234 5678',
  PK: '0301 2345678',
  IN: '98765 43210',
  AE: '050 123 4567',
  DE: '0151 23456789',
  FR: '06 12 34 56 78',
  ES: '612 345 678',
  IT: '312 345 6789',
  NL: '06 12345678',
  SE: '070 123 45 67',
  CH: '076 123 45 67',
  SG: '8123 4567',
  MY: '012 345 6789',
  ZA: '071 234 5678',
  BR: '11 91234 5678',
}

export function phoneExample(code) {
  return PHONE_EXAMPLE[code] || 'Enter your phone number'
}

// Resolve the visitor's ISO country code from a free IP-geolocation endpoint.
// Returns null (and callers keep their default) if it can't be determined.
export async function detectCountryCode() {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal })
    if (!res.ok) return null
    const data = await res.json()
    const code = data.country_code || data.country
    return typeof code === 'string' ? code.toUpperCase() : null
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}
