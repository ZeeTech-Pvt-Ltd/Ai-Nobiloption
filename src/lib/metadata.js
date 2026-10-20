// Maps the per-route SEO config onto Next's Metadata API, so the same source
// of truth that used to drive <Seo/> now bakes the head at build time.
import { seo, OG_IMAGE } from '@/data/seo.js'

const SITE = 'https://ai-nobiloption.com'
const BRAND = 'Ai Nobiloption'

export function pageMetadata(route) {
  const conf = seo[route]
  if (!conf) throw new Error(`No SEO config for route "${route}"`)

  const meta = {
    // absolute: the root layout's title template must not wrap this.
    title: { absolute: conf.title },
    description: conf.description,
    robots: conf.robots,
    openGraph: {
      siteName: BRAND,
      title: conf.title,
      description: conf.description,
      url: conf.canonical || `${SITE}/`,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: conf.ogImageAlt,
          type: 'image/png',
        },
      ],
      type: conf.type || 'website',
      locale: 'en_AU',
    },
    twitter: {
      card: 'summary_large_image',
      title: conf.title,
      description: conf.description,
      images: [OG_IMAGE],
    },
  }

  if (conf.keywords) meta.keywords = conf.keywords
  // Noindex routes carry no canonical: the two are contradictory signals.
  if (conf.canonical) meta.alternates = { canonical: conf.canonical }

  return meta
}
