import { useRef, useState } from 'react'
import { ChevronDown, ArrowRight } from './icons.jsx'
import { faqPage } from '../data/content.js'

// Turns "[Sign Up form](/)" tokens in an answer into real <a> links.
const linkify = (text) =>
  text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (!m) return part
    const [, label, href] = m
    const hash = href.split('#')[1]
    return (
      <a key={i} href={hash ? '/' : href} data-scroll={hash ? `#${hash}` : undefined}>
        {label}
      </a>
    )
  })

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null)
  const answerRefs = useRef([])

  const toggle = (index) => {
    const a = answerRefs.current[index]
    if (!a) return
    if (openIndex !== null && openIndex !== index) {
      answerRefs.current[openIndex].style.maxHeight = null
    }
    if (openIndex === index) {
      a.style.maxHeight = null
      setOpenIndex(null)
    } else {
      a.style.maxHeight = a.scrollHeight + 'px'
      setOpenIndex(index)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="terms-hero">
        <div className="container terms-hero-inner reveal">
          <span className="eyebrow">Support</span>
          <h1 className="h1">
            Frequently Asked <mark>Questions</mark>
          </h1>
          <p className="lead">
            Clear answers to the most common questions about how Ai Nobiloption works, what to
            expect from our reporting, and how to get started. If you can't find what you need
            here, reach out through our contact page.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="section faqpage-body">
        <div className="container">
          <div className="faq">
            {faqPage.map((item, i) => (
              <div className={`faq-item ${openIndex === i ? 'open' : ''}`} key={item.q}>
                <button
                  className="faq-q"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faqpage-answer-${i}`}
                  id={`faqpage-question-${i}`}
                >
                  {item.q}
                  <span className="chev"><ChevronDown /></span>
                </button>
                <div
                  className="faq-a"
                  id={`faqpage-answer-${i}`}
                  role="region"
                  aria-labelledby={`faqpage-question-${i}`}
                  ref={(el) => (answerRefs.current[i] = el)}
                >
                  <p>{linkify(item.a)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-support reveal">
            <span className="eyebrow">Support</span>
            <h2>Still have questions?</h2>
            <p>Our team is happy to help with anything not covered above, send us a message and we will point you in the right direction.</p>
            <a className="btn btn-light" href="/contact">
              Contact Us <ArrowRight />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
