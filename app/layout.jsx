import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header.jsx'
import Footer from '@/components/Footer.jsx'
import RevealProvider from '@/components/RevealProvider.jsx'
import ScrollHandler from '@/components/ScrollHandler.jsx'

// Self-hosted at build time, so the font files ship from this origin and there
// is no render-blocking request to fonts.googleapis.com.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
})

const SITE = 'https://ai-nobiloption.com'

export const metadata = {
  metadataBase: new URL(SITE),
  applicationName: 'Ai Nobiloption',
  formatDetection: { telephone: false, address: false, email: false },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'qwhfU6WTaEUZPv4rn30ZOAOd-HsO6f_AGMkgyYNvcuc',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${grotesk.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />

        <RevealProvider />
        <ScrollHandler />

        {/* Analytics is fetched once the page is idle so the tag never competes
            with the document for bandwidth or main-thread time. */}
        <Script
          id="ga-lib"
          src="https://www.googletagmanager.com/gtag/js?id=G-JL95EY65QV"
          strategy="lazyOnload"
        />
        <Script id="ga-init" strategy="lazyOnload">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JL95EY65QV');
        `}</Script>
      </body>
    </html>
  )
}
