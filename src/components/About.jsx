import CtaBanner from './CtaBanner.jsx'
import TradingVisual from './TradingVisual.jsx'
import { Check, ArrowRight, Icon } from './icons.jsx'

const stats = [
  { num: '4M+', lbl: 'Registered users' },
  { num: '98+', lbl: 'Supported countries' },
  { num: '65+', lbl: 'Currencies available' },
  { num: '$500M+', lbl: 'Customer deposits' },
  { num: '24/7', lbl: 'Trading access' },
  { num: '256-bit', lbl: 'Encryption standard' },
]

const pillars = [
  {
    icon: 'bot',
    title: 'AI-Powered Analysis',
    text: "Ai Nobiloption's AI keeps watch over the markets day and night, turning what it observes into clear, ready-to-use signals so a promising opportunity rarely goes unnoticed.",
  },
  {
    icon: 'shield',
    title: 'Bank-Grade Security',
    text: 'Your funds and personal data are protected by strong encryption and layered account safeguards, from the moment you sign up all the way to your first withdrawal.',
  },
  {
    icon: 'user',
    title: 'Support, Your Way',
    text: 'A real support team is on hand around the clock to guide you, from your first login through to your hundredth trade.',
  },
]

const mission = [
  {
    title: 'Accessible',
    text: "Trading know-how should never be a barrier to getting started. Every screen on Ai Nobiloption is designed to feel clear and welcoming, so a first-time trader can begin with confidence, whatever their background.",
  },
  {
    title: 'Transparent',
    text: 'What you see is what you get. Fees, trade details and platform rules are laid out plainly up front, so nothing is hidden until after you act.',
  },
  {
    title: 'Innovative',
    text: 'The platform is continually refined with the latest AI and algorithmic trading technology, keeping Ai Nobiloption genuinely current rather than standing still.',
  },
  {
    title: 'Responsible',
    text: 'Safety comes first. Trading risks are explained in plain language, and sensible, measured trading is encouraged at every turn.',
  },
]

const story = [
  {
    step: '01',
    title: 'The Beginning',
    image: '/about/the-beginning.jpg', w: 1200, h: 900,
    text: 'Ai Nobiloption started with six fintech and algorithmic-trading specialists who shared one goal: to make automated trading as straightforward and dependable as everyday online banking.',
  },
  {
    step: '02',
    title: 'First Launch',
    image: '/about/first-launch.jpg', w: 1200, h: 900,
    text: 'The platform went live with 12 cryptocurrencies, and more than 10,000 traders joined in the very first month. A clean, uncluttered interface paired with hands-free automation set it apart from day one.',
  },
  {
    step: '03',
    title: 'Growing the Community',
    image: '/about/growing-the-community.jpg', w: 1200, h: 900,
    text: 'Within its first year, Ai Nobiloption passed 500,000 users. New currencies were added, along with round-the-clock customer support in several languages.',
  },
  {
    step: '04',
    title: 'Reaching New Markets',
    image: '/about/reaching-new-markets.jpg', w: 1200, h: 900,
    text: 'As demand grew, Ai Nobiloption expanded into many new markets, introducing local payment options and enabling two-factor authentication on every account along the way.',
  },
  {
    step: '05',
    title: 'Today',
    image: '/about/today.jpg', w: 1200, h: 900,
    text: 'Now serving 4M+ registered users across 65+ currencies, Ai Nobiloption keeps growing every day, with the original mission unchanged: make automated trading accessible to everyone.',
  },
]

const badges = ['SSL Certified', 'GDPR Compliant', '256-bit Encryption', 'Available in 98+ Countries', 'Regular Security Audits']

const security = [
  { icon: 'shield', title: 'Your Funds Stay Safe', text: 'Funds remain in your own account at all times. Ai Nobiloption is authorised only to place trades on your behalf, nothing more.' },
  { icon: 'lock', title: 'Bank-Grade Encryption', text: 'All data is protected by 256-bit SSL encryption, and API keys are encrypted both at rest and in transit.' },
  { icon: 'zap', title: 'Two-Factor Authentication', text: 'Accounts can be secured with two-factor authentication, biometric login, and confirmation steps before any withdrawal.' },
  { icon: 'user', title: 'Data Privacy Standards', text: 'Strict data-privacy and account-security practices are applied in every market Ai Nobiloption serves.' },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="about-hero">
        <div className="container about-hero-inner">
          <div className="about-hero-copy reveal">
            <span className="eyebrow">About Ai Nobiloption</span>
            <h1 className="h1">
              Automated trading, <mark>without the complexity</mark>
            </h1>
            <p className="lead">
              Ai Nobiloption studies the market around the clock and turns what it finds into clear, actionable
              opportunities. Our goal is simple, give every trader across Australia the tools to invest with
              confidence and full transparency.
            </p>
            <div className="about-cta">
              <a className="btn btn-primary" href="/" data-scroll="#register">
                Register Now <ArrowRight />
              </a>
              <a className="btn btn-ghost" href="/how-it-works">How It Works</a>
            </div>
          </div>

          <div className="about-visual reveal">
            <TradingVisual />
            <span className="about-chip one">
              <span className="ico"><Icon name="chart" size={16} /></span>
              24/7 Automated Analysis
            </span>
            <span className="about-chip two">
              <span className="ico"><Icon name="user" size={16} /></span>
              4M+ Traders Worldwide
            </span>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="about-stats">
        <div className="container about-stats-grid reveal">
          {stats.map((s) => (
            <div className="about-stat" key={s.lbl}>
              <div className="num">{s.num}</div>
              <div className="lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What sets us apart */}
      <section className="section about-section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">What Sets Us Apart</span>
            <h2 className="h2">Technology, safety, and personal guidance</h2>
            <p className="lead">
              Our platform pairs automated market analysis with human support, so you never have to make decisions alone.
            </p>
          </div>

          <div className="about-pillars">
            {pillars.map((p) => (
              <article className="about-pillar reveal" key={p.title}>
                <span className="about-pillar-ico"><Icon name={p.icon} size={26} /></span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section about-section alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Our Mission</span>
            <h2 className="h2">What we believe and why we built Ai Nobiloption</h2>
          </div>

          <div className="about-mission">
            {mission.map((m, i) => (
              <div className="about-mission-item reveal" key={m.title}>
                <span className="num">0{i + 1}</span>
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section about-section about-story-sec">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Our Story</span>
            <h2 className="h2">From a simple idea to a platform trusted by millions</h2>
          </div>

          <div className="about-story">
            {story.map((s, i) => (
              <div className={`about-story-row ${i % 2 ? 'reverse' : ''} reveal`} key={s.step}>
                <div className="about-story-media">
                  <img
                    src={s.image}
                    alt={`${s.title}, Ai Nobiloption`}
                    width={s.w}
                    height={s.h}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                </div>
                <div className="about-story-copy">
                  <span className="about-story-step">{s.step}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="section about-section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Security & Data Protection</span>
            <h2 className="h2">Built on a safer trading experience</h2>
            <p className="lead">We apply a range of security and data-protection measures designed to support safer trading.</p>
            <div className="about-badges">
              {badges.map((b) => (
                <span key={b}><Check size={12} /> {b}</span>
              ))}
            </div>
          </div>

          <div className="about-security">
            {security.map((s) => (
              <article className="about-sec-card reveal" key={s.title}>
                <span className="about-pillar-ico"><Icon name={s.icon} size={26} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Ready to begin?"
        title="Put automated trading to work"
        text="Create your Ai Nobiloption account in about two minutes and let AI-driven strategies trade around the clock, with support available 24/7."
        cta="Register Now"
      />
    </>
  )
}
