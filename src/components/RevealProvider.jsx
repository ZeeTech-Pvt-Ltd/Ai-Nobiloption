'use client'

import useReveal from '@/hooks/useReveal.js'

/**
 * Runs the scroll-reveal observer for the whole document.
 *
 * The prerendered HTML ships with every section visible (the reveal rules in
 * globals.css only hide them under `@media (scripting: enabled)`), so this
 * only takes over once JS is running. The
 * hook's MutationObserver picks up sections that mount after a route change,
 * which is why one instance in the root layout is enough.
 */
export default function RevealProvider() {
  useReveal()
  return null
}
