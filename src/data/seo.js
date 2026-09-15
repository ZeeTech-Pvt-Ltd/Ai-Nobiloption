// =========================================================
// Per-route SEO configuration for Ai Nobiloption.
// Single source of truth for <title>, meta description, meta
// keywords, canonical URLs, robots rules, Open Graph, Twitter
// cards, and JSON-LD structured data, consumed by <Seo/>.
// Nothing here invents facts: all claims come from content.js.
// =========================================================
import { faq, faqPage } from './content.js'

const SITE = 'https://ai-nobiloption.com'
export const OG_IMAGE = `${SITE}/og-image.png`

// ---------- JSON-LD builders (real site content only) ----------

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'Ai Nobiloption',
  url: SITE,
  logo: `${SITE}/favicon.svg`,
  description:
    'Ai Nobiloption is an AI-powered automated trading platform for users in Australia, automated strategies, live market signals, and dependable security in one place.',
  email: 'support@ai-nobiloption.com',
  inLanguage: 'en-AU',
  areaServed: 'Australia',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressRegion: 'Victoria',
    addressCountry: 'AU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@ai-nobiloption.com',
    availableLanguage: 'en',
    hoursAvailable: 'Mo-Su 00:00-24:00',
  },
}

// The platform described as a schema.org Service, geo-scoped to Australia.
// all fields reflect claims already on the site (Melbourne base, 24/7
// support, AU$250 minimum deposit), nothing invented.
function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE}/#service`,
    name: 'Ai Nobiloption Automated Trading Platform',
    serviceType: 'Automated trading platform',
    description:
      'AI-powered automated trading platform for users in Australia, automated strategies, live market signals, and dependable security in one place.',
    provider: { '@id': `${SITE}/#organization` },
    areaServed: 'Australia',
    audience: { '@type': 'Audience', audienceType: 'Traders in Australia' },
    offers: {
      '@type': 'Offer',
      description: 'Minimum deposit to activate a trading account',
      price: '250',
      priceCurrency: 'AUD',
    },
  }
}

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: 'Ai Nobiloption',
  url: SITE,
  publisher: { '@id': `${SITE}/#organization` },
  inLanguage: 'en-AU',
}

function webPage(name, url, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': `${SITE}/#website` },
    publisher: { '@id': `${SITE}/#organization` },
    inLanguage: 'en-AU',
  }
}

function breadcrumb(name, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name, item: `${SITE}${path}` },
    ],
  }
}

// FAQ schema is generated from the same FAQ content rendered on the
// homepage, never duplicated or invented.
function faqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

// Schema for the standalone /faq page, built from the longer faqPage list.
// "[label](/route)" link tokens are stripped so JSON-LD holds clean text.
const stripLinkTokens = (s) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

function fullFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqPage.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: stripLinkTokens(f.a) },
    })),
  }
}

const homeDescription =
  'Ai Nobiloption, AI-powered automated trading for Australia. 24/7 automated strategies, live signals, bank-grade security. Start with just AU$250.'

export const seo = {
  home: {
    title: 'Ai Nobiloption, AI-Powered Automated Trading Platform in Australia',
    description: homeDescription,
    keywords:
      'Ai Nobiloption, automated trading platform australia, AI trading platform, automated crypto trading, AI trading Australia',
    canonical: `${SITE}/`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Ai Nobiloption, AI-powered automated trading platform for Australia',
    schema: [organization, website, webPage('Ai Nobiloption, AI-Powered Automated Trading Platform in Australia', `${SITE}/`, homeDescription), faqPageSchema(), serviceSchema()],
  },

  about: {
    title: 'About Ai Nobiloption, Automated Trading Without the Complexity',
    description:
      'Learn about Ai Nobiloption, the AI trading platform trusted by 4M+ users, with automated analysis, bank-grade security, and 24/7 support.',
    keywords: 'about Ai Nobiloption, Ai Nobiloption trading platform, automated trading platform australia, AI trading company',
    canonical: `${SITE}/about`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'About Ai Nobiloption, automated trading without the complexity',
    schema: [
      webPage('About Ai Nobiloption', `${SITE}/about`, 'About the Ai Nobiloption AI-driven automated trading platform, automated market analysis, bank-grade security, and 24/7 support.'),
      breadcrumb('About Us', '/about'),
    ],
  },

  contact: {
    title: 'Contact Ai Nobiloption, 24/7 Support for Australian Traders',
    description:
      'Questions about Ai Nobiloption or automated trading? Contact our 24/7 team by email or the registration form, replies usually within a few hours.',
    keywords: 'contact Ai Nobiloption, Ai Nobiloption support, automated trading help, automated trading Australia support',
    canonical: `${SITE}/contact`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Contact Ai Nobiloption support, 24/7 assistance for Australian traders',
    schema: [
      webPage('Contact Ai Nobiloption', `${SITE}/contact`, 'Contact the Ai Nobiloption support team, email and registration form, available around the clock.'),
      breadcrumb('Contact Us', '/contact'),
    ],
  },

  'how-it-works': {
    title: 'How Ai Nobiloption Works, Get Started in 3 Easy Steps',
    description:
      'Start with Ai Nobiloption in two minutes. Create your account, deposit from just AU$250, and let the AI trade around the clock. No hidden fees.',
    keywords: 'how to start automated trading, Ai Nobiloption sign up, AI trading steps, automated trading for beginners',
    canonical: `${SITE}/how-it-works`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'How Ai Nobiloption works, create your account, deposit, and start automated trading',
    schema: [
      webPage('How Ai Nobiloption Works', `${SITE}/how-it-works`, 'How to get started with Ai Nobiloption automated trading in three easy steps, create an account, deposit, and start trading.'),
      breadcrumb('How It Works', '/how-it-works'),
    ],
  },

  'ai-nobiloption-review-australia-scam': {
    title: 'Ai Nobiloption Review Australia: Scam or Legit? (2026)',
    description:
      'Ai Nobiloption review Australia, is it a scam or legit? Features, benefits, how to get started, plus a straight answer for Australian traders.',
    keywords: 'Ai Nobiloption review, is Ai Nobiloption legit, Ai Nobiloption scam, Ai Nobiloption Australia, automated trading platform review Australia',
    canonical: `${SITE}/ai-nobiloption-review-australia-scam`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'article',
    ogImageAlt: 'Ai Nobiloption review Australia, is it a scam or legit?',
    schema: [
      webPage('Ai Nobiloption Review Australia: Scam or Legit?', `${SITE}/ai-nobiloption-review-australia-scam`, 'A straight Ai Nobiloption review for Australian traders, features, benefits, getting started, and whether the platform is a scam or legit.'),
      breadcrumb('Ai Nobiloption Review', '/ai-nobiloption-review-australia-scam'),
    ],
  },

  faq: {
    title: 'Frequently Asked Questions, Ai Nobiloption',
    description:
      'Ai Nobiloption questions, what the platform does, how reporting works, access requirements, data handling. Not covered? Contact us.',
    keywords: 'Ai Nobiloption FAQ, Ai Nobiloption questions, how does Ai Nobiloption work, Ai Nobiloption help, trading platform FAQ',
    canonical: `${SITE}/faq`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Ai Nobiloption frequently asked questions',
    schema: [
      webPage('Frequently Asked Questions', `${SITE}/faq`, 'Frequently asked questions about Ai Nobiloption, what the platform does, how reporting works, and how to get started.'),
      breadcrumb('FAQ', '/faq'),
      fullFaqSchema(),
    ],
  },

  terms: {
    title: 'Terms of Use, Ai Nobiloption Automated Trading Platform',
    description:
      'Read the Ai Nobiloption Terms of Use, the rules that govern use of the platform and its services for users in Australia.',
    keywords: 'Ai Nobiloption terms of use, automated trading terms, platform terms',
    canonical: `${SITE}/terms`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Ai Nobiloption terms of use',
    schema: [
      webPage('Terms of Use', `${SITE}/terms`, 'The Ai Nobiloption Terms of Use, the rules governing use of the platform.'),
      breadcrumb('Terms of Use', '/terms'),
    ],
  },

  privacy: {
    title: 'Privacy Policy, Ai Nobiloption Automated Trading Platform',
    description:
      'Read the Ai Nobiloption Privacy Policy, how it collects, uses, and protects your personal information on the trading platform.',
    keywords: 'Ai Nobiloption privacy policy, data protection, trading platform privacy',
    canonical: `${SITE}/privacy`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Ai Nobiloption privacy policy',
    schema: [
      webPage('Privacy Policy', `${SITE}/privacy`, 'The Ai Nobiloption Privacy Policy, how personal information is collected and protected.'),
      breadcrumb('Privacy Policy', '/privacy'),
    ],
  },

  disclosure: {
    title: 'Risk Disclosure, Ai Nobiloption Automated Trading Platform',
    description:
      'Read the Ai Nobiloption Risk Disclosure, key information about the risks of trading FX, CFDs, and cryptocurrencies.',
    keywords: 'Ai Nobiloption risk disclosure, trading risk warning, CFD crypto risk',
    canonical: `${SITE}/disclosure`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Ai Nobiloption risk disclosure',
    schema: [
      webPage('Risk Disclosure', `${SITE}/disclosure`, 'The Ai Nobiloption Risk Disclosure, information about the risks of trading FX, CFDs, and cryptocurrencies.'),
      breadcrumb('Risk Disclosure', '/disclosure'),
    ],
  },

  'thank-you': {
    title: 'Thank You, Ai Nobiloption Registration',
    description:
      'Your Ai Nobiloption registration has been received. Our team will review your details and contact you shortly to activate your account.',
    keywords: '',
    canonical: `${SITE}/thank-you`,
    robots: 'noindex, nofollow',
    type: 'website',
    ogImageAlt: 'Thank you, Ai Nobiloption registration',
    schema: [],
  },

  404: {
    title: 'Page Not Found, Ai Nobiloption',
    description: "The page you're looking for doesn't exist or has been moved. Return to the Ai Nobiloption homepage or contact support.",
    keywords: '',
    canonical: null, // 404 page carries no canonical, it is noindexed
    robots: 'noindex, nofollow',
    type: 'website',
    ogImageAlt: 'Page not found, Ai Nobiloption',
    schema: [],
  },
}
