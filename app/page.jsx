import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import Hero from '@/components/Hero.jsx'
import Metrics from '@/components/Metrics.jsx'
import Experience from '@/components/Experience.jsx'
import Priorities from '@/components/Priorities.jsx'
import Features from '@/components/Features.jsx'
import Precision from '@/components/Precision.jsx'
import CtaBanner from '@/components/CtaBanner.jsx'
import Testimonials from '@/components/Testimonials.jsx'
import Portfolio from '@/components/Portfolio.jsx'
import Capabilities from '@/components/Capabilities.jsx'
import Faq from '@/components/Faq.jsx'
import RiskFirst from '@/components/RiskFirst.jsx'
import FinalCta from '@/components/FinalCta.jsx'

export const metadata = pageMetadata('home')

export default function HomePage() {
  return (
    <>
      <JsonLd route="home" />

      <Hero />
      <Metrics />
      <Experience />
      <Priorities />
      <Features />
      <Precision />

      <CtaBanner
        title="Built for Every Trader"
        text="Ai Nobiloption is built by a team of innovators, analysts, and engineers committed to advancing the world of automated trading. Join thousands of verified traders across Australia today."
        cta="Register Now"
      />

      <Testimonials />
      <Portfolio />
      <Capabilities />
      <Faq />
      {/* The risk band sits above the sign-up CTA so a reader meets the
          downside before being asked for their details. */}
      <RiskFirst />
      <FinalCta />
    </>
  )
}
