import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import Privacy from '@/components/Privacy.jsx'

export const metadata = pageMetadata('privacy')

export default function Page() {
  return (
    <>
      <JsonLd route="privacy" />
      <Privacy />
    </>
  )
}
