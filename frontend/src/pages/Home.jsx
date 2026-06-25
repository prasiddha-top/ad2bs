import TodayDate from '../components/TodayDate'
import TopConverterZone from '../components/TopConverterZone'
import AdBanner from '../components/AdBanner'
import './Home.css'

export default function Home() {
  return (
    <div className="page">
      {/* ── Top Converter Zone (at the very top of the page) ── */}
      <TopConverterZone
        title="AD ↔ BS Nepali Date Converter"
        subtitle="Convert Gregorian (AD) and Bikram Sambat (BS) Nepali calendar dates instantly. Covers BS 1970–2100 with 100% accuracy."
        subtitleNe="एडी देखि बिएस र बिएस देखि एडी मा मिति रूपान्तरण"
        defaultMode="ad-to-bs"
      />

      {/* ── Rest of the page content ── */}
      <div className="container mt-lg">
        {/* Today widget */}
        <TodayDate />

        {/* inline ad after converter */}
        <div className="inline-ad-row">
          <AdBanner format="horizontal" className="ad-leaderboard" />
        </div>

        {/* Info cards */}
        <section className="info-section" aria-labelledby="info-heading">
          <h2 id="info-heading" className="section-title">About Bikram Sambat</h2>
          <div className="info-grid">
            <article className="info-card">
              <div className="info-card-icon">📅</div>
              <div className="info-card-body">
                <h3>What is BS?</h3>
                <p>Bikram Sambat (BS) is Nepal's official calendar,
                approximately <strong>56 years 8 months</strong> ahead
                of the Gregorian calendar. Based on ancient Hindu traditions.</p>
              </div>
            </article>
            <article className="info-card">
              <div className="info-card-icon">🗃️</div>
              <div className="info-card-body">
                <h3>How it Works</h3>
                <p>Uses an official <strong>lookup-table database</strong>
                covering BS 1970–2100. Each Nepali month has 29–32 days
                that vary per year — a formula can't work here.</p>
              </div>
            </article>
            <article className="info-card">
              <div className="info-card-icon">✅</div>
              <div className="info-card-body">
                <h3>100% Accurate</h3>
                <p>Official Nepal government calendar data.
                <strong> 131 years</strong> of data (BS 1970–2100).
                New year starts on <strong>1 Baisakh</strong> (mid-April).</p>
              </div>
            </article>
          </div>
        </section>

        {/* Months table */}
        <section className="months-section" aria-labelledby="months-heading">
          <h2 id="months-heading" className="section-title">Nepali Month Names</h2>
          <div className="months-table">
            {[
              { num:1,  en:'Baisakh', ne:'बैशाख',  approx:'Apr–May' },
              { num:2,  en:'Jestha',  ne:'जेठ',    approx:'May–Jun' },
              { num:3,  en:'Ashadh',  ne:'असार',   approx:'Jun–Jul' },
              { num:4,  en:'Shrawan', ne:'साउन',   approx:'Jul–Aug' },
              { num:5,  en:'Bhadra',  ne:'भाद्र',  approx:'Aug–Sep' },
              { num:6,  en:'Ashwin',  ne:'आश्विन', approx:'Sep–Oct' },
              { num:7,  en:'Kartik',  ne:'कार्तिक',approx:'Oct–Nov' },
              { num:8,  en:'Mangsir', ne:'मंसिर',  approx:'Nov–Dec' },
              { num:9,  en:'Poush',   ne:'पुष',    approx:'Dec–Jan' },
              { num:10, en:'Magh',    ne:'माघ',    approx:'Jan–Feb' },
              { num:11, en:'Falgun',  ne:'फाल्गुन',approx:'Feb–Mar' },
              { num:12, en:'Chaitra', ne:'चैत',    approx:'Mar–Apr' },
            ].map(m => (
              <div key={m.num} className="month-row">
                <span className="month-num">{String(m.num).padStart(2,'0')}</span>
                <span className="month-en">{m.en}</span>
                <span className="month-ne nepali-text">{m.ne}</span>
                <span className="month-approx">{m.approx}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {[
              { q:"What is the difference between AD and BS?",
                a:"AD (Anno Domini) is the worldwide Gregorian calendar. BS (Bikram Sambat) is Nepal's official calendar, currently about 56 years 8 months ahead. Example: 2083 BS = 2026–2027 AD." },
              { q:"How many days are in a Nepali month?",
                a:"Between 29 and 32 days, varying each year because BS aligns with both solar and astronomical events. Baisakh usually has 30–31 days." },
              { q:"When does the Nepali New Year start?",
                a:"1st Baisakh (BS), which falls around April 13–14 in the Gregorian calendar. In 2026 AD, Nepali New Year 2083 BS started on April 13." },
              { q:"What is today's date in Nepali calendar?",
                a:"See the widget at the top of this page, or click the 'Today' button in the converter for the current Bikram Sambat date." },
              { q:"How accurate is this converter?",
                a:"Very accurate. We use an official lookup-table database covering BS 1970–2100 with day-by-day precision." },
            ].map((item, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-q">{item.q}</summary>
                <p className="faq-a">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom ad */}
        <div className="inline-ad-row">
          <AdBanner format="auto" className="ad-leaderboard" />
        </div>

      </div>
    </div>
  )
}
