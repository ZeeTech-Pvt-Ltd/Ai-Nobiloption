import { ArrowRight } from './icons.jsx'

export default function CtaBanner({ eyebrow, title, text, cta }) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-banner reveal">
          <svg className="cta-chart" viewBox="0 0 560 240" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 190 C50 180 90 150 140 156 C190 162 230 120 280 126 C330 132 370 86 420 92 C460 98 500 58 560 66" fill="none" stroke="#C8F000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
            <path d="M0 190 C50 180 90 150 140 156 C190 162 230 120 280 126 C330 132 370 86 420 92 C460 98 500 58 560 66 L560 240 L0 240 Z" fill="#C8F000" opacity="0.08" />
            <circle cx="280" cy="126" r="5" fill="#C8F000" opacity="0.6" />
            <circle cx="420" cy="92" r="5" fill="#C8F000" opacity="0.6" />
          </svg>
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <a className="btn btn-primary" href="/" data-scroll="#register">
            {cta} <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  )
}
