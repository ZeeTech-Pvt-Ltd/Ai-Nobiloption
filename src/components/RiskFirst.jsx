// The risk band.
//
// Sits above the sign-up form's position in the page's reading order, not
// buried in the footer: a reader should meet the downside before they are
// asked for a phone number.
//
// The drawdown chart is the one visual on the site that argues against the
// product. A risk section illustrated with a rising line would undercut every
// sentence next to it.
//
// Every claim here is about how trading works, not about the platform's
// results, so there is nothing that needs a source.

const points = [
  {
    t: 'You can lose money',
    d: 'Trading FX, CFDs and cryptocurrencies is speculative. You could lose some or all of the money you put in.',
  },
  {
    t: 'Leverage cuts both ways',
    d: 'Leverage increases the size of a position and the size of a loss. A small move against you can wipe out a large balance.',
  },
  {
    t: 'AI is not a guarantee',
    d: 'Analysis and signals are built from historical and live data. Models can be wrong, and no output is a promise of profit.',
  },
  {
    t: 'Past performance is not a guide',
    d: 'Any performance shown on this site is illustrative. It is not a reliable indicator of what happens next.',
  },
  {
    t: 'Costs reduce your returns',
    d: 'Spreads and fees apply to every trade, whether it ends in a gain or a loss.',
  },
]

export default function RiskFirst() {
  return (
    <section className="section risk-sec" id="risk">
      <div className="container">
        <div className="risk-band reveal">
          <div className="risk-copy">
            <span className="eyebrow">Risk warning</span>
            <h2 className="h2">Understand the risk before you trade</h2>
            <p className="risk-lead">
              Trading carries real risk. This is not financial advice, and nothing here is a
              personalised recommendation. Please read this before you register, not after.
            </p>

            <ol className="risk-list">
              {points.map((p, i) => (
                <li key={p.t}>
                  <span className="risk-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <b>{p.t}</b>
                    <span>{p.d}</span>
                  </div>
                </li>
              ))}
            </ol>

            <p className="risk-foot">
              Consider seeking independent advice, and never trade money you cannot afford to lose.
            </p>
          </div>

          {/* Drawdown, not growth: the one chart on this site that argues
              against the product. Labelled so it cannot be read as live data. */}
          <div className="risk-visual" aria-hidden="true">
            <div className="risk-chart-head">
              <span>Illustrative drawdown</span>
              <span className="risk-chart-tag">Example only</span>
            </div>
            <svg viewBox="0 0 360 200" preserveAspectRatio="none" className="risk-chart">
              <defs>
                <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F87171" stopOpacity="0.28" />
                  <stop offset="1" stopColor="#F87171" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g className="risk-grid">
                <line x1="0" y1="50" x2="360" y2="50" />
                <line x1="0" y1="100" x2="360" y2="100" />
                <line x1="0" y1="150" x2="360" y2="150" />
              </g>
              <path
                d="M0 30 C40 34 60 52 90 58 C120 64 140 48 168 74 C196 100 214 92 240 130 C262 162 296 154 360 182"
                fill="none" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round"
              />
              <path
                d="M0 30 C40 34 60 52 90 58 C120 64 140 48 168 74 C196 100 214 92 240 130 C262 162 296 154 360 182 L360 200 L0 200 Z"
                fill="url(#riskFill)"
              />
              <circle cx="360" cy="182" r="5" fill="#F87171" />
            </svg>
            <p className="risk-chart-note">
              A hypothetical equity curve, shown to illustrate how a losing run looks.
              It is not this platform's performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
