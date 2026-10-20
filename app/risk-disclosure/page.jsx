import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import RiskDisclosure from '@/components/RiskDisclosure.jsx'

export const metadata = pageMetadata('risk-disclosure')

export default function Page() {
  return (
    <>
      <JsonLd route="risk-disclosure" />
      <RiskDisclosure />
    </>
  )
}
