import RegistrationForm from './RegistrationForm.jsx'
import Ticker from './Ticker.jsx'
import { Check, ArrowRight } from './icons.jsx'
import { hero } from '../data/content.js'

export default function Hero() {
  return (
    <section className="hero" id="register">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="container hero-inner">
        <div className="hero-copy reveal">
          <h1 className="h1">
            {hero.title} <mark>{hero.titleMark}</mark>
          </h1>
          <p className="lead">{hero.lead}</p>

          <ul className="hero-checks">
            {hero.checks.map((c) => (
              <li key={c}>
                <span className="tick"><Check /></span> {c}
              </li>
            ))}
          </ul>

          <div className="hero-cta">
            <a className="btn btn-primary" href="/contact">
              Register Now <ArrowRight />
            </a>
            <a className="btn btn-ghost" href="/how-it-works">How It Works</a>
          </div>
        </div>

        {/* Registration form */}
        <div className="form-wrap reveal">
          <div className="reg-card">
            <h2>Register Now</h2>
            <p className="sub">It only takes about two minutes to get started</p>
            <RegistrationForm />
          </div>
        </div>
      </div>

      <Ticker />
    </section>
  )
}
