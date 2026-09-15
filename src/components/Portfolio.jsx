import { Check } from './icons.jsx'
import { portfolio } from '../data/content.js'

export default function Portfolio() {
  const { eyebrow, title, titleMark, titleEnd, lead, checks, image, imageAlt, imageW, imageH } = portfolio

  return (
    <section className="section feat" id="portfolio">
      <div className="container feat-duo">
        <div className="exp-visual reveal">
          <img
            src={image}
            alt={imageAlt}
            className="exp-img"
            width={imageW}
            height={imageH}
            loading="lazy"
          />
        </div>

        <div className="feat-duo-copy reveal">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h2">{title}<mark>{titleMark}</mark>{titleEnd}</h2>
          <p className="lead">{lead}</p>
          <ul className="hero-checks">
            {checks.map((c) => (
              <li key={c}>
                <span className="tick"><Check /></span> {c}
              </li>
            ))}
          </ul>
          <a className="btn btn-primary" href="/" data-scroll="#register">Get Started</a>
        </div>
      </div>
    </section>
  )
}
