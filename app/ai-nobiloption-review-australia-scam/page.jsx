import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import BlogArticle from '@/components/BlogArticle.jsx'

export const metadata = pageMetadata('ai-nobiloption-review-australia-scam')

export default function Page() {
  return (
    <>
      <JsonLd route="ai-nobiloption-review-australia-scam" />
      <BlogArticle />
    </>
  )
}
