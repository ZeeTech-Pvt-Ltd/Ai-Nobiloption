import { seo } from '@/data/seo.js'

/**
 * Emits the structured data for a route straight into the prerendered HTML.
 * Google reads JSON-LD from the document body, so this replaces the runtime
 * injection <Seo/> used to do in the SPA.
 */
export default function JsonLd({ route }) {
  const schema = seo[route]?.schema || []
  return schema.map((data, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  ))
}
