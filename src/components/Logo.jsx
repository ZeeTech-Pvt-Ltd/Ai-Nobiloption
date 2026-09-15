export default function Logo({ onDark = false }) {
  return (
    <a className="logo" href="/" aria-label="Ai Nobiloption home">
      <span className="logo-mark">A</span>
      <span className={`logo-text ${onDark ? 'on-dark' : ''}`}>
        Ai <span>Nobiloption</span>
      </span>
    </a>
  )
}
