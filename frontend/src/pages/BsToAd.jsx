import TopConverterZone from '../components/TopConverterZone'
import AdBanner from '../components/AdBanner'
import TodayDate from '../components/TodayDate'
import './PageLayout.css'

export default function BsToAd() {
  return (
    <div className="page">
      {/* ── Top Converter Zone (at the very top of the page) ── */}
      <TopConverterZone
        title="BS to AD Converter"
        subtitle="Convert Bikram Sambat (BS) Nepali calendar dates to Gregorian (AD) dates. Supports BS 1970 to 2100."
        subtitleNe="बिएस देखि एडी मा मिति रूपान्तरण गर्नुहोस्"
        defaultMode="bs-to-ad"
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
          <h2>How to Convert BS to AD</h2>
          <ol className="how-to-list">
            <li>Select the <strong>BS Year</strong> (1970 to 2100)</li>
            <li>Select the <strong>Nepali Month</strong> (Baisakh to Chaitra)</li>
            <li>Select the <strong>Day</strong> of the Nepali month</li>
            <li>Click the <strong>Convert Date</strong> button</li>
            <li>Your AD date will appear with the day of the week</li>
          </ol>

          <h2 className="mt-lg">BS to AD Conversion Examples</h2>
          <div className="example-grid">
            {[
              { bs: 'Baisakh 1, 2083 BS', ad: 'April 13, 2026 AD' },
              { bs: 'Ashadh 11, 2083 BS', ad: 'June 25, 2026 AD' },
              { bs: 'Poush 17, 2082 BS', ad: 'January 1, 2026 AD' },
              { bs: 'Chaitra 20, 2083 BS', ad: 'April 2, 2027 AD' },
            ].map((ex, i) => (
              <div key={i} className="example-card glass-card p-md">
                <span className="example-input nepali-text">{ex.bs}</span>
                <span className="example-arrow">→</span>
                <span className="example-output">{ex.ad}</span>
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
