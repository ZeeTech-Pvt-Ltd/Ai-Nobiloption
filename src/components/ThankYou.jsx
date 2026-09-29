import { Check, ArrowRight } from './icons.jsx'

export default function ThankYou() {
  return (
    <section className="ty-hero">
      <div className="container ty-inner reveal">
        <span className="ty-badge"><Check size={30} /></span>
        <h1 className="h1">
          Thank you for <mark>registering</mark>
        </h1>
        <p className="lead">
          Your application has been received. Our team will review your details and contact you shortly to activate
          your account and get you started.
        </p>

        <div className="ty-actions">
          <a className="btn btn-primary" href="/">
            Back to Home <ArrowRight />
          </a>
          <a className="btn btn-ghost" href="/contact">
            Contact Us
          </a>
        </div>

        <div className="ty-next">
          <h2>What happens next?</h2>
          <div className="ty-steps">
            <div className="ty-step">
              <span>1</span>
              <div>
                <h3>We review your application</h3>
                <p>Our onboarding team checks your registration details.</p>
              </div>
            </div>
            <div className="ty-step">
              <span>2</span>
              <div>
                <h3>We reach out to you</h3>
                <p>A team member contacts you to confirm your account and next steps.</p>
              </div>
            </div>
            <div className="ty-step">
              <span>3</span>
              <div>
                <h3>Start trading with AI</h3>
                <p>Once verified, your account is activated and you can begin automated trading.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
