import CtaBanner from './CtaBanner.jsx'
import RegistrationForm from './RegistrationForm.jsx'
import { Icon } from './icons.jsx'

// Layout and components follow the site's own design system; copy is
// Ai Nobiloption-branded.
const info = [
  { icon: 'mail', title: 'Email', value: 'support@ai-nobiloption.com', hint: 'Replies within a few hours' },
  { icon: 'clock', title: 'Support Hours', value: '24/7, 365 days a year', hint: 'Round-the-clock assistance' },
  { icon: 'pin', title: 'Location', value: 'Melbourne, Victoria, Australia', hint: 'Serving traders across Australia' },
  { icon: 'zap', title: 'Response Time', value: 'Most questions answered within a few hours', hint: 'Fast, helpful support' },
]

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="ct-hero">
        <div className="container ct-hero-inner reveal">
          <h1 className="h1">
            We&rsquo;d love to <mark>hear from you</mark>
          </h1>
          <p className="lead">
            Questions about Ai Nobiloption, your account, or automated trading? Our team is here around the
            clock, get in touch and we&rsquo;ll reply quickly.
          </p>
        </div>
      </section>

      {/* Get in touch */}
      <section className="section ct-main">
        <div className="container ct-grid">
          <div className="ct-info reveal">
            <h2 className="h2">How to reach us</h2>
            <p className="lead">
              Pick whichever channel works best for you, email, or the message form on this page.
            </p>

            <div className="ct-cards">
              {info.map((i) => (
                <div className="ct-card" key={i.title}>
                  <span className="ct-card-ico"><Icon name={i.icon} size={22} /></span>
                  <div>
                    <h3>{i.title}</h3>
                    <p>{i.value}</p>
                    <small>{i.hint}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ct-form-card reveal">
            <h3>Register your interest</h3>
            <p className="ct-form-sub">Fill in your details and our team will be in touch to get you started.</p>
            {/* The same form component the homepage renders - one implementation,
                so the two can never drift apart. */}
            <RegistrationForm />
          </div>
        </div>
      </section>

      <CtaBanner
        title="Register now and our team will be in touch"
        text="Set up your Ai Nobiloption account in minutes and put automated AI trading to work, with help available 24/7."
        cta="Register Now"
      />
    </>
  )
}
