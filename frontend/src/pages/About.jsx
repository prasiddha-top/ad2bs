import TopConverterZone from '../components/TopConverterZone'
import AdBanner from '../components/AdBanner'
import './PageLayout.css'

export default function About() {
  return (
    <div className="page">
      {/* ── Top Converter Zone (at the very top of the page) ── */}
      <TopConverterZone
        title="About AD2BS"
        subtitle="Nepal's most accurate and comprehensive Bikram Sambat date converter."
        subtitleNe="एडी र बिएस मिति रूपान्तरणको बारेमा"
        defaultMode="ad-to-bs"
      />

      <div className="container mt-lg">
        {/* Horizontal Ad banner */}
        <div className="inline-ad-row mb-lg">
          <AdBanner format="horizontal" className="ad-leaderboard" />
        </div>

        {/* Detailed Info */}
        <div className="about-section glass-card p-xl">
          <h2>What is AD2BS?</h2>
          <p>
            AD2BS (ad2bs.prasiddha.top) is a free online tool for converting dates between the
            <strong> Gregorian (AD)</strong> and <strong>Bikram Sambat (BS)</strong> calendar systems.
            It is designed for Nepalis, government offices, businesses, and anyone who needs accurate
            Nepali date conversions.
          </p>

          <h2>Supported Date Range</h2>
          <ul>
            <li>BS: 1970 BS to 2100 BS</li>
            <li>AD: 1913 AD to 2043 AD</li>
            <li>131 years of complete calendar data</li>
            <li>Accurate to the day for all conversions</li>
          </ul>

          <h2>How the Conversion Works</h2>
          <p>
            The Bikram Sambat calendar cannot be converted using a simple mathematical formula because
            each month has a different number of days (29–32) that changes every year. Our converter
            uses a complete <strong>lookup table database</strong> stored in SQLite, containing the
            exact start date of every BS month for every year from 1970 to 2100 BS.
          </p>
          <p>
            When you convert a date, we look up which BS month interval contains your AD date, or
            calculate the exact AD date from the BS month's start date. This guarantees 100% accuracy.
          </p>

          <h2>About Bikram Sambat</h2>
          <p>
            Bikram Sambat (BS) is Nepal's official national calendar, named after the ancient king
            Vikramaditya. It is approximately <strong>56 years and 8 months</strong> ahead of the
            Gregorian calendar. The Nepali New Year (Naya Barsha) begins on 1st Baisakh, which
            typically falls around April 13-14 in the Gregorian calendar.
          </p>
          <p>
            The BS calendar is a solar calendar based on the movement of the sun through the zodiac.
            It consists of 12 months, with each month containing between 29 and 32 days. Unlike the
            Gregorian calendar, the number of days per month varies each year.
          </p>

          <h2>Nepali Month Names</h2>
          <ul>
            <li><strong>1. Baisakh (बैशाख)</strong> — New Year month, April-May</li>
            <li><strong>2. Jestha (जेठ)</strong> — May-June</li>
            <li><strong>3. Ashadh (असार)</strong> — June-July</li>
            <li><strong>4. Shrawan (साउन)</strong> — Monsoon month, July-August</li>
            <li><strong>5. Bhadra (भाद्र)</strong> — August-September</li>
            <li><strong>6. Ashwin (आश्विन)</strong> — September-October</li>
            <li><strong>7. Kartik (कार्तिक)</strong> — Dashain month, October-November</li>
            <li><strong>8. Mangsir (मंसिर)</strong> — November-December</li>
            <li><strong>9. Poush (पुष)</strong> — December-January</li>
            <li><strong>10. Magh (माघ)</strong> — January-February</li>
            <li><strong>11. Falgun (फाल्गुन)</strong> — February-March</li>
            <li><strong>12. Chaitra (चैत)</strong> — March-April</li>
          </ul>

          <h2>Technology</h2>
          <p>
            AD2BS is built with modern web technologies:
          </p>
          <ul>
            <li><strong>Frontend:</strong> React 18 + Vite — fast, modern UI</li>
            <li><strong>Backend:</strong> Node.js + Express — REST API</li>
            <li><strong>Database:</strong> SQLite — embedded, fast, reliable</li>
            <li><strong>Hosting:</strong> ad2bs.prasiddha.top</li>
          </ul>

          <h2>Contact</h2>
          <p>
            Created by <a href="https://prasiddha.top" target="_blank" rel="noopener noreferrer">Prasiddha</a>.
            For feedback or issues, visit the{' '}
            <a href="https://github.com/prasiddha-top/ad2bs" target="_blank" rel="noopener noreferrer">
              GitHub repository
            </a>.
          </p>
        </div>

        {/* Rectangle ad */}
        <div className="flex-center mt-xl">
          <AdBanner format="rectangle" className="ad-rectangle" />
        </div>
      </div>
    </div>
  )
}
