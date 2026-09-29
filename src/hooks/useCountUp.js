import { useEffect, useRef } from 'react'

/**
 * useCountUp, animates a number from 0 to `end` when its element scrolls
 * into view. Returns { ref, display }.
 *
 * The running value is written straight to the node's textContent on each
 * frame instead of going through setState. A per-frame re-render made React
 * reconcile four counters ~60 times a second while the page was still
 * settling, which invalidated style on every frame and turned the next
 * layout read into a forced reflow. The final value is mirrored into state
 * once so the static markup and the DOM agree when the animation ends.
 */
export default function useCountUp(end, { prefix = '', suffix = '', duration = 1500 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const finalText = prefix + (end % 1 ? end.toFixed(1) : String(end)) + suffix

    if (!('IntersectionObserver' in window)) {
      el.textContent = finalText
      return
    }

    // Show the starting value immediately; it is not a state update, so the
    // first paint is not delayed behind a render pass.
    el.textContent = prefix + '0' + suffix

    let frame = 0
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        obs.disconnect()

        const t0 = performance.now()
        const step = (now) => {
          // Bail if the node went away mid-animation (route change).
          if (!el.isConnected) return
          const p = Math.min((now - t0) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          const v = (end * eased).toFixed(end % 1 ? 1 : 0)
          el.textContent = prefix + v + suffix
          if (p < 1) frame = requestAnimationFrame(step)
          else el.textContent = finalText
        }
        frame = requestAnimationFrame(step)
      },
      { threshold: 0.35 },
    )
    obs.observe(el)

    return () => {
      obs.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [end, prefix, suffix, duration])

  return ref
}
