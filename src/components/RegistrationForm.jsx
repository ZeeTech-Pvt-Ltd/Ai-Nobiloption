import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from './icons.jsx'
import { Visa, Mastercard, PayPal, GooglePay, BankTransfer } from './PayLogos.jsx'
import PhoneNumberInput from './PhoneNumberInput.jsx'
import { countries } from '../data/countries.js'
import { submitLead } from '../lib/submitLead.js'
import { navigateTo } from '../lib/navigate.js'
import { timezoneCountry, phoneExample } from '../lib/geo.js'
import { parsePhoneInput, toE164, validatePhone } from '../lib/phone.js'

// Rendered in two places - the homepage's #register section and /contact -
// so there is exactly one implementation of the form to keep in step.

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Australia is the site's target market, so the flag starts there and is only
// re-pointed once that baseline has been on screen for a beat.
const MIN_AU_VISIBLE_MS = 1600

const fields = {
  firstName: { label: 'First Name', type: 'text', placeholder: 'Enter First Name', autocomplete: 'given-name' },
  lastName: { label: 'Last Name', type: 'text', placeholder: 'Enter Last Name', autocomplete: 'family-name' },
  email: { label: 'Email', type: 'email', placeholder: 'Enter your Email', autocomplete: 'email' },
}

const payMethods = [
  { name: 'VISA', Icon: Visa },
  { name: 'Mastercard', Icon: Mastercard },
  { name: 'PayPal', Icon: PayPal },
  { name: 'Google Pay', Icon: GooglePay },
  { name: 'Bank Transfer', Icon: BankTransfer },
]

const validateName = (value) => {
  const v = String(value ?? '').trim()
  if (!v) return 'Please enter your name.'
  if (v.length > 60) return 'Name must be under 60 characters.'
  return ''
}

const validateEmail = (value) => {
  const v = String(value ?? '').trim()
  if (!v) return 'Please enter your email address.'
  if (!emailRe.test(v)) return 'Please enter a valid email address, e.g. name@example.com'
  return ''
}

const initialValues = { firstName: '', lastName: '', email: '', phone: '', agree: false, company: '' }

export default function RegistrationForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [processing, setProcessing] = useState(false)
  const [serverError, setServerError] = useState('')
  const [country, setCountry] = useState('AU')

  // Refs that must not trigger a re-render.
  const countryRef = useRef('AU')
  countryRef.current = country
  const phoneHasValueRef = useRef(false)
  phoneHasValueRef.current = Boolean(values.phone)
  // True while a "+" has been typed but its dial code is still incomplete.
  const plusPendingRef = useRef(false)
  // Guards: no state updates after unmount, no second submit while in flight.
  const mountedRef = useRef(true)
  const submittingRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  // Pre-select the visitor's country from the browser timezone. Purely local:
  // no network geo lookup, so no visitor IP leaves the page.
  useEffect(() => {
    let cancelled = false
    const mountedAt = Date.now()
    const iso = timezoneCountry()
    if (!iso || iso === 'AU' || !countries.some((c) => c[0] === iso)) return undefined
    const delay = Math.max(0, MIN_AU_VISIBLE_MS - (Date.now() - mountedAt))
    const timer = setTimeout(() => {
      if (!cancelled && !phoneHasValueRef.current) setCountry(iso)
    }, delay)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [])

  const errorFor = (name, value) => {
    if (name === 'agree') return value ? '' : 'Please accept the Privacy Policy and Terms of Use to continue.'
    if (name === 'firstName' || name === 'lastName') return validateName(value)
    if (name === 'email') return validateEmail(value)
    if (name === 'phone') return validatePhone(value)
    return ''
  }

  const handleChange = (name) => (event) => {
    let value = name === 'agree' ? event.target.checked : event.target.value

    if (name === 'phone') {
      const raw = String(value)
      if (raw === '') plusPendingRef.current = false
      else if (raw.startsWith('+')) plusPendingRef.current = true

      // While a "+" is pending, keep reading the digits as an international
      // number so a pasted dial code re-points the flag before it can be
      // mistaken for a local number.
      const input = plusPendingRef.current && !raw.startsWith('+') ? `+${raw}` : raw
      const parsed = parsePhoneInput(input, countryRef.current)
      if (parsed.iso !== countryRef.current) setCountry(parsed.iso)

      if (plusPendingRef.current) {
        // The dial is complete once the digits match the country the "+"
        // resolved to; from then on keystrokes are the national tail.
        const digits = input.replace(/^\+/, '')
        const dial = countries.find((c) => c[0] === parsed.iso)?.[2] ?? 61
        if (digits.length >= String(dial).length && digits.startsWith(String(dial))) {
          plusPendingRef.current = false
        } else {
          value = raw // dial still incomplete - leave the typed "+" alone
        }
      }
      if (!plusPendingRef.current) value = parsed.national
    }

    if (serverError) setServerError('')
    setValues((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: errorFor(name, value) }))
  }

  const handleBlur = (name) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    let value = values[name]
    if (name === 'phone' && String(value).startsWith('+')) {
      // Collapse a hand-typed international number now the field is done; the
      // flag prefix carries the dial code.
      const parsed = parsePhoneInput(value, countryRef.current)
      if (parsed.iso !== countryRef.current) setCountry(parsed.iso)
      value = parsed.national
      setValues((prev) => ({ ...prev, phone: value }))
    }
    setErrors((prev) => ({ ...prev, [name]: errorFor(name, value) }))
  }

  const handleCountryChange = (iso) => {
    setCountry(iso)
    if (touched.phone) setErrors((prev) => ({ ...prev, phone: validatePhone(values.phone) }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submittingRef.current) return

    // Honeypot: a real visitor never fills an off-screen field. Drop the
    // submission silently rather than telling a bot what tripped it.
    if (values.company) return

    setServerError('')
    const nextErrors = {}
    for (const name of ['firstName', 'lastName', 'email', 'phone']) {
      const message = errorFor(name, values[name])
      if (message) nextErrors[name] = message
    }
    const agreeError = errorFor('agree', values.agree)
    if (agreeError) nextErrors.agree = agreeError

    setErrors(nextErrors)
    setTouched({ firstName: true, lastName: true, email: true, phone: true, agree: true })
    if (Object.keys(nextErrors).length) return

    setProcessing(true)
    submittingRef.current = true
    try {
      const result = await submitLead({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: toE164(countryRef.current, values.phone),
      })

      if (!mountedRef.current) return

      if (result.ok) {
        navigateTo('/thank-you')
        return
      }

      // Field-level rejections mark the offending inputs; everything else
      // shows as a single banner.
      if (result.fieldErrors && Object.keys(result.fieldErrors).length) {
        setErrors((prev) => ({ ...prev, ...result.fieldErrors }))
      }
      setServerError(result.message)
    } finally {
      submittingRef.current = false
      if (mountedRef.current) setProcessing(false)
    }
  }

  const renderField = (name) => {
    const f = fields[name]
    const shown = touched[name] && errors[name]
    return (
      <div key={name} className={`field ${shown ? 'error' : ''}`}>
        <label htmlFor={name}>{f.label} *</label>
        <input
          className={`input ${shown ? 'invalid' : ''}`}
          type={f.type}
          id={name}
          name={name}
          autoComplete={f.autocomplete}
          placeholder={f.placeholder}
          maxLength={f.type === 'email' ? 120 : 60}
          value={values[name]}
          onChange={handleChange(name)}
          onBlur={handleBlur(name)}
          aria-invalid={Boolean(shown)}
          aria-describedby={shown ? `${name}-error` : undefined}
          required
        />
        <p className="error-msg" id={`${name}-error`}>{errors[name]}</p>
      </div>
    )
  }

  const phoneShown = touched.phone && errors.phone

  return (
    <form id="regForm" onSubmit={handleSubmit} noValidate>
      {/* Honeypot: off-screen, never focusable, must stay empty. */}
      <input
        className="honeypot"
        type="text"
        id="company"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={values.company}
        onChange={handleChange('company')}
      />

      <div className="field-row">
        {renderField('firstName')}
        {renderField('lastName')}
      </div>

      {renderField('email')}

      <div className={`field ${phoneShown ? 'error' : ''}`}>
        <label htmlFor="phone">Phone Number *</label>
        <PhoneNumberInput
          id="phone"
          name="phone"
          country={country}
          onCountryChange={handleCountryChange}
          value={values.phone}
          onValueChange={(v) => handleChange('phone')({ target: { value: v } })}
          onBlur={handleBlur('phone')}
          invalid={Boolean(phoneShown)}
          placeholder={phoneExample(country)}
          autoComplete="tel"
        />
        <p className="error-msg" id="phone-error">{errors.phone}</p>
      </div>

      <div className={`field agree ${touched.agree && errors.agree ? 'error' : ''}`}>
        <label htmlFor="agree" className="agree-label">
          <input
            id="agree"
            name="agree"
            type="checkbox"
            checked={values.agree}
            onChange={handleChange('agree')}
            onBlur={handleBlur('agree')}
            aria-invalid={Boolean(touched.agree && errors.agree)}
            aria-describedby={touched.agree && errors.agree ? 'agree-error' : undefined}
            required
          />
          <span>
            I agree to the <a href="/privacy">Privacy Policy</a> and{' '}
            <a href="/terms">Terms of Use</a>.
          </span>
        </label>
        <p className="error-msg" id="agree-error">{errors.agree}</p>
      </div>

      <button className="btn btn-primary btn-block" type="submit" disabled={processing}>
        {processing ? 'Processing…' : 'Sign Up Now'}
        {!processing && <ArrowRight />}
      </button>

      {serverError && <div className="form-message err" role="alert">{serverError}</div>}

      <div className="pay-label">Accepted payment methods</div>
      <div className="pay-row" aria-label="Accepted payment methods">
        {payMethods.map(({ name, Icon }) => (
          <span className="pay" key={name} title={name}>
            <Icon />
          </span>
        ))}
      </div>
    </form>
  )
}
