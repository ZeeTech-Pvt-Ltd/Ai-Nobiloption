import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import HowItWorks from '@/components/HowItWorks.jsx'

export const metadata = pageMetadata('how-it-works')

export default function Page() {
  return (
    <>
      <JsonLd route="how-it-works" />
      <HowItWorks asPage />
    </>
  )
}
