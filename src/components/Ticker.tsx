import { resume } from '../content/resume'

const tickerItems = [
  resume.name,
  'Blaze Sports Intel',
  'Cloudflare Workers',
  'TypeScript',
  'AI-Powered Analytics',
  'Real-Time Dashboards',
  'MLB Analytics',
  'College Baseball',
  'UT Austin',
  'Full Sail University',
  'Product Strategy',
  'BlazeCraft.app',
  resume.origin.birthplace,
  resume.origin.heritage,
  'San Antonio, TX',
]

export default function Ticker() {
  const doubled = [...tickerItems, ...tickerItems]

  return (
    <div className="ticker no-print" aria-hidden="true">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i}>
            <span className="ticker-item">{item}</span>
            <span className="ticker-separator">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}
