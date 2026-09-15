import { useEffect, useState } from 'react'

/**
 * useScrollSpy, returns the id of the section currently in view.
 * Pass the array of section ids to spy on.
 *
 * Perf: section offsets are measured once (plus on resize / shortly after
 * load) and the scroll handler is rAF-throttled. It never calls
 * getBoundingClientRect inside the scroll event, which avoids forced reflow /
 * layout thrash on long pages while scrolling.
 */
export default function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const offsets = new Map()

    const measure = () => {
      offsets.clear()
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) offsets.set(id, el.getBoundingClientRect().top + window.scrollY)
      }
      compute()
    }

    const compute = () => {
      const line = window.scrollY + 140
      let current = ids[0]
      for (const id of ids) {
        const top = offsets.get(id)
        if (top !== undefined && top <= line) current = id
      }
      setActive((prev) => (prev === current ? prev : current))
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        compute()
      })
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure, { passive: true })
    // Fonts/images can settle layout after paint, re-measure once more later.
    const settle = setTimeout(measure, 1200)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      clearTimeout(settle)
    }
  }, [ids])

  return active
}
