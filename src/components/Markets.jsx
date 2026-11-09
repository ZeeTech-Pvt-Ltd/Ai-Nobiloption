import { Icon } from './icons.jsx'

// The asset classes the platform covers, one card each. Copy supplied by the
// operator; nothing added to it.
const markets = [
  {
    icon: 'coin',
    title: 'Crypto',
    text: 'Trade popular coins like Bitcoin and Ethereum.',
  },
  {
    icon: 'globe',
    title: 'Forex',
    text: 'Trade world currencies like USD, EUR and GBP.',
  },
  {
    icon: 'building',
    title: 'Stocks',
    text: 'Follow big companies from around the world.',
  },
  {
    icon: 'commodity',
    title: 'Commodities',
    text: 'Trade gold, silver and oil.',
  },
]

export default function Markets() {
  return (
    <section className="section markets" id="markets">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="h2">Markets</h2>
        </div>

        <div className="markets-grid">
          {markets.map((m) => (
            <article className="market-card reveal" key={m.title}>
              <span className="market-ico">
                <Icon name={m.icon} size={24} />
              </span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
