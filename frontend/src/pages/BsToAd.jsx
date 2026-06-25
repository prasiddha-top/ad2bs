import DateConverter from '../components/DateConverter'
import AdBanner from '../components/AdBanner'
import TodayDate from '../components/TodayDate'
import './PageLayout.css'

export default function BsToAd() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-hero">
          <div className="badge badge-gold">BS → AD Conversion</div>
          <h1 className="page-title">
            BS to AD Converter
          </h1>
          <p className="page-subtitle">
            Convert any <strong>Bikram Sambat (BS / Nepali)</strong> date to{' '}
            <strong>Gregorian (AD / Anno Domini)</strong> calendar date.
            Supports <strong>BS 1970 to 2100</strong>.
          </p>
          <p className="page-subtitle-ne nepali-text">
            बिएस बाट एडी मा मिति रूपान्तरण गर्नुहोस्
          </p>
        </div>

        <TodayDate />

        <AdBanner format="horizontal" className="ad-leaderboard mb-lg" />

        <DateConverter defaultMode="bs-to-ad" />

        <div className="flex-center mt-xl">
          <AdBanner format="rectangle" className="ad-rectangle" />
        </div>

        <section className="page-info mt-xl">
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
      </div>
    </div>
  )
}
