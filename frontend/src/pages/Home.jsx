import TodayDate from '../components/TodayDate'
import DateConverter from '../components/DateConverter'
import AdBanner from '../components/AdBanner'
import './Home.css'

export default function Home() {
  return (
    <div className="page">
      <div className="container">
        {/* Hero Section */}
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-badge animate-fadeInUp">
            <span>🇳🇵</span> Nepal's Most Accurate Date Converter
          </div>

          <h1 id="hero-heading" className="hero-title animate-fadeInUp stagger-1">
            <span className="text-gradient">AD ↔ BS</span>
            <br />
            Nepali Date Converter
          </h1>

          <p className="hero-subtitle animate-fadeInUp stagger-2">
            Convert between <strong>AD (Anno Domini / Gregorian)</strong> and{' '}
            <strong>BS (Bikram Sambat / Nepali)</strong> calendar dates instantly.
            Accurate lookup-table conversion covering <strong>BS 1970–2100</strong>.
          </p>

          <p className="hero-subtitle-ne nepali-text animate-fadeInUp stagger-3">
            एडी देखि बिएस र बिएस देखि एडी मा मिति रूपान्तरण गर्नुहोस्
          </p>
        </section>

        {/* Today's Date Widget */}
        <section aria-label="Today's date">
          <TodayDate />
        </section>

        {/* Top Ad Banner */}
        <div className="ad-slot ad-top">
          <AdBanner format="horizontal" className="ad-leaderboard" />
        </div>

        {/* Main Converter */}
        <section className="converter-section" aria-labelledby="converter-heading">
          <h2 id="converter-heading" className="section-title text-center">
            Convert Any Date
          </h2>
          <DateConverter defaultMode="ad-to-bs" />
        </section>

        {/* Mid-page Ad */}
        <div className="ad-slot ad-mid flex-center mt-xl">
          <AdBanner format="rectangle" className="ad-rectangle" />
        </div>

        {/* Info Section */}
        <section className="info-section mt-xl" aria-labelledby="info-heading">
          <h2 id="info-heading" className="section-title text-center mb-lg">
            About Bikram Sambat Calendar
          </h2>

          <div className="grid-3">
            <article className="info-card glass-card p-lg animate-fadeInUp stagger-1">
              <div className="info-icon">📅</div>
              <h3>What is BS?</h3>
              <p>
                Bikram Sambat (BS) is Nepal's official calendar system, approximately
                <strong> 56 years and 8 months</strong> ahead of the Gregorian (AD) calendar.
                It is a solar calendar based on ancient Hindu traditions.
              </p>
            </article>

            <article className="info-card glass-card p-lg animate-fadeInUp stagger-2">
              <div className="info-icon">🔄</div>
              <h3>How it Works</h3>
              <p>
                Our converter uses an official <strong>lookup table database</strong> covering
                BS 1970–2100. Each Nepali month has between 29–32 days that vary year to year,
                making a simple formula impossible.
              </p>
            </article>

            <article className="info-card glass-card p-lg animate-fadeInUp stagger-3">
              <div className="info-icon">✅</div>
              <h3>100% Accurate</h3>
              <p>
                Based on official Nepal government calendar data. Supports
                <strong> 131 years</strong> of data from BS 1970 to BS 2100.
                New years start in <strong>Baisakh (April)</strong>.
              </p>
            </article>
          </div>
        </section>

        {/* Nepali Months Table */}
        <section className="months-section mt-xl" aria-labelledby="months-heading">
          <h2 id="months-heading" className="section-title text-center mb-lg">
            Nepali Month Names
          </h2>
          <div className="months-table glass-card">
            <div className="months-grid">
              {[
                { num: 1, en: 'Baisakh', ne: 'बैशाख', season: 'Spring', approx: 'Apr-May' },
                { num: 2, en: 'Jestha', ne: 'जेठ', season: 'Spring', approx: 'May-Jun' },
                { num: 3, en: 'Ashadh', ne: 'असार', season: 'Summer', approx: 'Jun-Jul' },
                { num: 4, en: 'Shrawan', ne: 'साउन', season: 'Monsoon', approx: 'Jul-Aug' },
                { num: 5, en: 'Bhadra', ne: 'भाद्र', season: 'Monsoon', approx: 'Aug-Sep' },
                { num: 6, en: 'Ashwin', ne: 'आश्विन', season: 'Autumn', approx: 'Sep-Oct' },
                { num: 7, en: 'Kartik', ne: 'कार्तिक', season: 'Autumn', approx: 'Oct-Nov' },
                { num: 8, en: 'Mangsir', ne: 'मंसिर', season: 'Winter', approx: 'Nov-Dec' },
                { num: 9, en: 'Poush', ne: 'पुष', season: 'Winter', approx: 'Dec-Jan' },
                { num: 10, en: 'Magh', ne: 'माघ', season: 'Winter', approx: 'Jan-Feb' },
                { num: 11, en: 'Falgun', ne: 'फाल्गुन', season: 'Spring', approx: 'Feb-Mar' },
                { num: 12, en: 'Chaitra', ne: 'चैत', season: 'Spring', approx: 'Mar-Apr' },
              ].map(m => (
                <div key={m.num} className="month-row">
                  <span className="month-num">{m.num}</span>
                  <span className="month-en">{m.en}</span>
                  <span className="month-ne nepali-text">{m.ne}</span>
                  <span className="month-approx text-muted">{m.approx}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section mt-xl" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="section-title text-center mb-lg">
            Frequently Asked Questions
          </h2>
          <div className="faq-list">
            {[
              {
                q: "What is the difference between AD and BS?",
                a: "AD (Anno Domini) is the Gregorian calendar used worldwide. BS (Bikram Sambat) is Nepal's official calendar, which is currently about 56 years and 8 months ahead. For example, 2083 BS corresponds to 2026-2027 AD."
              },
              {
                q: "How many days are in a Nepali month?",
                a: "Nepali months (BS) have between 29 and 32 days. The number of days varies each year because the Bikram Sambat calendar aligns with both solar and astronomical events. Baisakh usually has 30-31 days."
              },
              {
                q: "When does the Nepali New Year start?",
                a: "The Nepali New Year starts on 1st Baisakh (BS), which falls in mid-April in the Gregorian calendar. In 2026 AD, the Nepali New Year 2083 BS started on April 13."
              },
              {
                q: "What is today's date in Nepali calendar?",
                a: "You can see today's date in both AD and BS at the top of this page. Use the 'Today' button in the converter to instantly see the current Bikram Sambat date."
              },
              {
                q: "How accurate is this converter?",
                a: "Very accurate. Our converter uses an official lookup table database with day-by-day data for BS 1970–2100, sourced from official Nepal government calendar data."
              }
            ].map((item, i) => (
              <details key={i} className="faq-item glass-card">
                <summary className="faq-question">{item.q}</summary>
                <p className="faq-answer">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom Ad */}
        <div className="ad-slot ad-bottom flex-center mt-xl">
          <AdBanner format="auto" className="ad-leaderboard" />
        </div>
      </div>
    </div>
  )
}
