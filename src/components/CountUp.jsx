import useCountUp from '../hooks/useCountUp.js'

/**
 * CountUp, counts a number up when it scrolls into view.
 * Accepts a value string like "$500M+", "4.8★", "98+"; non-numeric
 * strings (e.g. "24/7") render statically.
 *
 * The number is rendered as the hook's initial text and then animated by
 * writing to the node directly, so no React render happens per frame.
 */
export default function CountUp({ value, className = '', duration }) {
  const m = value.match(/^(\$?)(\d+\.?\d*)(.*)$/)
  const ref = useCountUp(m ? parseFloat(m[2]) : 0, {
    prefix: m ? m[1] : '',
    suffix: m ? m[3] : '',
    duration,
  })

  if (!m) return <span className={className}>{value}</span>
  return <span ref={ref} className={className}>{m[1]}0{m[3]}</span>
}
