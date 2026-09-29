// Country hints for the phone field.
//
// The hint comes from the browser's own timezone - never from a network geo
// lookup - so no visitor IP leaves the page and the Privacy Policy's "no
// third-party requests" claim stays true.
//
// Australia is the site's target market, so it is the default. The switch to
// the visitor's own country is delayed slightly so the AU baseline is actually
// seen first, and it never fires once the visitor has started typing.

const TZ_COUNTRY = {
  // Australasia
  'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU', 'Australia/Brisbane': 'AU',
  'Australia/Adelaide': 'AU', 'Australia/Perth': 'AU', 'Australia/Darwin': 'AU',
  'Australia/Hobart': 'AU', 'Australia/Lord_Howe': 'AU', 'Australia/Eucla': 'AU',
  'Pacific/Auckland': 'NZ', 'Pacific/Chatham': 'NZ', 'Pacific/Fiji': 'FJ',
  // Asia
  'Asia/Karachi': 'PK', 'Asia/Kolkata': 'IN', 'Asia/Colombo': 'LK', 'Asia/Dhaka': 'BD',
  'Asia/Kathmandu': 'NP', 'Asia/Dubai': 'AE', 'Asia/Riyadh': 'SA', 'Asia/Qatar': 'QA',
  'Asia/Kuwait': 'KW', 'Asia/Muscat': 'OM', 'Asia/Jerusalem': 'IL', 'Asia/Beirut': 'LB',
  'Asia/Shanghai': 'CN', 'Asia/Hong_Kong': 'HK', 'Asia/Taipei': 'TW', 'Asia/Seoul': 'KR',
  'Asia/Tokyo': 'JP', 'Asia/Singapore': 'SG', 'Asia/Kuala_Lumpur': 'MY', 'Asia/Jakarta': 'ID',
  'Asia/Bangkok': 'TH', 'Asia/Manila': 'PH', 'Asia/Ho_Chi_Minh': 'VN',
  // Europe
  'Europe/London': 'GB', 'Europe/Dublin': 'IE', 'Europe/Paris': 'FR', 'Europe/Berlin': 'DE',
  'Europe/Madrid': 'ES', 'Europe/Rome': 'IT', 'Europe/Amsterdam': 'NL', 'Europe/Brussels': 'BE',
  'Europe/Zurich': 'CH', 'Europe/Vienna': 'AT', 'Europe/Stockholm': 'SE', 'Europe/Oslo': 'NO',
  'Europe/Copenhagen': 'DK', 'Europe/Helsinki': 'FI', 'Europe/Warsaw': 'PL', 'Europe/Prague': 'CZ',
  'Europe/Athens': 'GR', 'Europe/Bucharest': 'RO', 'Europe/Istanbul': 'TR', 'Europe/Kyiv': 'UA',
  'Europe/Moscow': 'RU', 'Europe/Lisbon': 'PT',
  // Americas
  'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US',
  'America/Los_Angeles': 'US', 'America/Phoenix': 'US', 'America/Anchorage': 'US',
  'Pacific/Honolulu': 'US', 'America/Toronto': 'CA', 'America/Vancouver': 'CA',
  'America/Mexico_City': 'MX', 'America/Sao_Paulo': 'BR',
  'America/Argentina/Buenos_Aires': 'AR', 'America/Santiago': 'CL',
  'America/Bogota': 'CO', 'America/Lima': 'PE',
  // Africa
  'Africa/Johannesburg': 'ZA', 'Africa/Nairobi': 'KE', 'Africa/Lagos': 'NG', 'Africa/Cairo': 'EG',
}

/** The visitor's ISO country code from the browser timezone, or null. */
export function timezoneCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    return (tz && TZ_COUNTRY[tz]) || null
  } catch {
    return null
  }
}

// Sample national numbers shown in the empty phone field, one per country.
// Written WITHOUT the trunk "0": the dial code is displayed in its own prefix
// beside the field, so the national part must not repeat it.
const PHONE_EXAMPLE = {
  AU: '412 345 678', NZ: '21 234 5678', GB: '7911 123456', IE: '85 123 4567',
  US: '202 555 0134', CA: '416 555 0134', MX: '55 1234 5678', BR: '11 98765 4321',
  AR: '11 2345 6789', CL: '9 1234 5678', CO: '300 123 4567', PE: '912 345 678',
  FR: '6 12 34 56 78', DE: '151 2345 6789', IT: '312 345 6789', ES: '612 345 678',
  PT: '912 345 678', NL: '6 1234 5678', BE: '470 12 34 56', CH: '79 123 45 67',
  AT: '664 123 4567', SE: '70 123 45 67', NO: '412 34 567', DK: '20 12 34 56',
  FI: '40 123 4567', PL: '512 345 678', GR: '691 234 5678', RO: '712 345 678',
  CZ: '601 123 456', HU: '30 123 4567', TR: '532 123 4567', RU: '912 345 67 89',
  UA: '67 123 4567', IN: '98765 43210', PK: '300 1234567', BD: '1712 345678',
  LK: '71 234 5678', NP: '9812 345678', AF: '70 123 4567', CN: '138 0013 8000',
  HK: '9123 4567', TW: '912 345 678', JP: '90 1234 5678', KR: '10 1234 5678',
  SG: '8123 4567', MY: '12 345 6789', TH: '81 234 5678', VN: '91 234 5678',
  ID: '812 3456 789', PH: '917 123 4567', AE: '50 123 4567', SA: '55 123 4567',
  QA: '3312 3456', KW: '5123 4567', IL: '50 123 4567', EG: '10 1234 5678',
  ZA: '71 234 5678', NG: '801 234 5678', KE: '712 345678', GH: '20 123 4567',
  MA: '612 345 678', ET: '91 123 4567',
}

const PHONE_EXAMPLE_FALLBACK = '123 456 789'

/** The empty-field sample number for a country, without its trunk "0". */
export function phoneExample(code) {
  return PHONE_EXAMPLE[code] || PHONE_EXAMPLE_FALLBACK
}
