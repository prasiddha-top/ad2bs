import TopConverterZone from '../components/TopConverterZone'
import AdBanner from '../components/AdBanner'
import TodayDate from '../components/TodayDate'
import './PageLayout.css'

export default function AdToBs() {
  return (
    <div className="page">
      {/* ── Top Converter Zone (at the very top of the page) ── */}
      <TopConverterZone
        title="AD to BS Converter"
        subtitle="Convert Gregorian (AD) dates to Bikram Sambat (BS) Nepali calendar dates. Accurate from 1913 AD to 2043 AD."
        subtitleNe="एडी देखि बिएस मा मिति रूपान्तरण गर्नुहोस्"
        defaultMode="ad-to-bs"
      />

      <div className="container mt-lg">
        {/* Today date widget */}
        <TodayDate />

        {/* Horizontal Ad banner */}
        <div className="inline-ad-row mt-md mb-lg">
          <AdBanner format="horizontal" className="ad-leaderboard" />
        </div>

        {/* How-To & Info */}
        <section className="page-info">
          <h2>How to Convert AD to BS</h2>
          <ol className="how-to-list">
            <li>Select the <strong>Year</strong> in AD (Gregorian) format</li>
            <li>Select the <strong>Month</strong> (January to December)</li>
            <li>Select the <strong>Day</strong> of the month</li>
            <li>Click the <strong>Convert Date</strong> button</li>
            <li>Your BS date will appear with the Nepali month name</li>
          </ol>

          <h2 className="mt-lg">AD to BS Conversion Examples</h2>
          <div className="example-grid">
            {[
              { ad: 'January 1, 2026', bs: 'Poush 17, 2082' },
              { ad: 'April 13, 2026', bs: 'Baisakh 1, 2083' },
              { ad: 'June 25, 2026', bs: 'Ashadh 11, 2083' },
              { ad: 'December 31, 2026', bs: 'Poush 16, 2083' },
            ].map((ex, i) => (
              <div key={i} className="example-card glass-card p-md">
                <span className="example-input">{ex.ad} AD</span>
                <span className="example-arrow">→</span>
                <span className="example-output">{ex.bs} BS</span>
              </div>
            ))}
          </div>
        </section>

        {/* Rectangle ad */}
        <div className="flex-center mt-xl">
          <AdBanner format="rectangle" className="ad-rectangle" />
        </div>
      </div>
    </div>
  )
}
