'use client'

import { useEffect } from 'react'

/**
 * Handles the in-page navigation the design uses.
 *
 * Links that point at a section of the homepage carry a clean `/` href plus a
 * `data-scroll="#target"` attribute, so the URL bar and the hover preview stay
 * hash-free. On a route page those sections do not exist, so the handler goes
 * home first and then scrolls.
 *
 * Plain `#anchor` links (the legal pages use them) scroll the same way.
 * Everything else is left alone for the browser and Next's router.
 */
export default function ScrollHandler() {
  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target.closest('a[href]')
      if (!anchor) return

      const scrollTo = anchor.getAttribute('data-scroll')
      const href = anchor.getAttribute('href')
      if (!href) return

      const isHome = window.location.pathname === '/' || window.location.pathname === ''

      const scrollNow = (target) => {
        if (target === '#top') window.scrollTo(0, 0)
        else document.querySelector(target)?.scrollIntoView()
      }

      if (scrollTo) {
        event.preventDefault()
        if (isHome) {
          scrollNow(scrollTo)
        } else {
          window.location.assign('/' + scrollTo)
        }
        return
      }

      // Placeholder links (footer socials) keep the URL clean and do nothing.
      if (href === '#') {
        event.preventDefault()
        return
      }

      if (href.startsWith('#')) {
        event.preventDefault()
        if (isHome) scrollNow(href)
        else window.location.assign('/' + href)
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
