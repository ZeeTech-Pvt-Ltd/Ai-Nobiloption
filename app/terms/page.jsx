import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import Terms from '@/components/Terms.jsx'

export const metadata = pageMetadata('terms')

export default function Page() {
  return (
    <>
      <JsonLd route="terms" />
      <Terms />
    </>
  )
}
