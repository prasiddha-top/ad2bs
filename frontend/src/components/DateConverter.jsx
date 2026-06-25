import { useState, useCallback } from 'react'
import './DateConverter.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const BS_MONTHS = [
  { num: 1, en: 'Baisakh', ne: 'बैशाख' },
  { num: 2, en: 'Jestha', ne: 'जेठ' },
  { num: 3, en: 'Ashadh', ne: 'असार' },
  { num: 4, en: 'Shrawan', ne: 'साउन' },
  { num: 5, en: 'Bhadra', ne: 'भाद्र' },
  { num: 6, en: 'Ashwin', ne: 'आश्विन' },
  { num: 7, en: 'Kartik', ne: 'कार्तिक' },
  { num: 8, en: 'Mangsir', ne: 'मंसिर' },
  { num: 9, en: 'Poush', ne: 'पुष' },
  { num: 10, en: 'Magh', ne: 'माघ' },
  { num: 11, en: 'Falgun', ne: 'फाल्गुन' },
  { num: 12, en: 'Chaitra', ne: 'चैत' },
]

const AD_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function DateConverter({ defaultMode = 'ad-to-bs' }) {
  const [mode, setMode] = useState(defaultMode) // 'ad-to-bs' or 'bs-to-ad'
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  // AD to BS state
  const today = new Date()
  const [adYear, setAdYear] = useState(today.getFullYear())
  const [adMonth, setAdMonth] = useState(today.getMonth() + 1)
  const [adDay, setAdDay] = useState(today.getDate())

  // BS to AD state
  const [bsYear, setBsYear] = useState(2083)
  const [bsMonth, setBsMonth] = useState(3)
  const [bsDay, setBsDay] = useState(11)

  const handleConvert = useCallback(async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      let url
      if (mode === 'ad-to-bs') {
        url = `${API_BASE}/api/convert/ad-to-bs?year=${adYear}&month=${adMonth}&day=${adDay}`
      } else {
        url = `${API_BASE}/api/convert/bs-to-ad?year=${bsYear}&month=${bsMonth}&day=${bsDay}`
      }

      const res = await fetch(url)
      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Conversion failed')
      }

      setResult(data.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [mode, adYear, adMonth, adDay, bsYear, bsMonth, bsDay])

  const handleToday = useCallback(async () => {
    const now = new Date()
    setAdYear(now.getFullYear())
    setAdMonth(now.getMonth() + 1)
    setAdDay(now.getDate())
    setMode('ad-to-bs')

    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/api/convert/today`)
      const data = await res.json()
      if (data.success) setResult(data.data)
    } catch (err) {
      setError('Could not load today\'s date')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSwap = () => {
    setMode(mode === 'ad-to-bs' ? 'bs-to-ad' : 'ad-to-bs')
    setResult(null)
    setError(null)
  }

  // Generate arrays
  const adYears = Array.from({ length: 131 }, (_, i) => 1913 + i)
  const bsYears = Array.from({ length: 131 }, (_, i) => 1970 + i)
  const days31 = Array.from({ length: 32 }, (_, i) => i + 1)

  return (
    <div className="converter-wrapper">
      {/* Tab Switcher */}
      <div className="converter-tabs" role="tablist">
        <button
          id="tab-ad-to-bs"
          role="tab"
          aria-selected={mode === 'ad-to-bs'}
          className={`converter-tab ${mode === 'ad-to-bs' ? 'active' : ''}`}
          onClick={() => { setMode('ad-to-bs'); setResult(null); setError(null) }}
        >
          <span className="tab-icon">🌏</span>
          <span className="tab-text">AD → BS</span>
          <span className="tab-sub">Gregorian to Nepali</span>
        </button>
        <button
          id="tab-bs-to-ad"
          role="tab"
          aria-selected={mode === 'bs-to-ad'}
          className={`converter-tab ${mode === 'bs-to-ad' ? 'active' : ''}`}
          onClick={() => { setMode('bs-to-ad'); setResult(null); setError(null) }}
        >
          <span className="tab-icon">🏔️</span>
          <span className="tab-text">BS → AD</span>
          <span className="tab-sub">Nepali to Gregorian</span>
        </button>
      </div>

      {/* Converter Body */}
      <div className="converter-body glass-card">
        {/* Today Quick Button */}
        <div className="converter-toolbar">
          <button
            id="btn-today"
            className="btn btn-ghost btn-sm"
            onClick={handleToday}
            aria-label="Use today's date"
          >
            📅 Today
          </button>
          <button
            id="btn-swap"
            className="btn btn-ghost btn-sm"
            onClick={handleSwap}
            title="Switch conversion direction"
            aria-label="Swap conversion direction"
          >
            ⇄ Swap
          </button>
        </div>

        {/* Input Fields */}
        <div className="converter-inputs">
          {mode === 'ad-to-bs' ? (
            <div className="inputs-grid" role="group" aria-label="AD date input">
              <div className="form-group">
                <label htmlFor="ad-year" className="form-label">Year (AD)</label>
                <select
                  id="ad-year"
                  className="form-select"
                  value={adYear}
                  onChange={e => setAdYear(Number(e.target.value))}
                >
                  {adYears.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ad-month" className="form-label">Month (AD)</label>
                <select
                  id="ad-month"
                  className="form-select"
                  value={adMonth}
                  onChange={e => setAdMonth(Number(e.target.value))}
                >
                  {AD_MONTHS.map((name, i) => (
                    <option key={i + 1} value={i + 1}>{name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ad-day" className="form-label">Day (AD)</label>
                <select
                  id="ad-day"
                  className="form-select"
                  value={adDay}
                  onChange={e => setAdDay(Number(e.target.value))}
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="inputs-grid" role="group" aria-label="BS date input">
              <div className="form-group">
                <label htmlFor="bs-year" className="form-label">Year (BS)</label>
                <select
                  id="bs-year"
                  className="form-select"
                  value={bsYear}
                  onChange={e => setBsYear(Number(e.target.value))}
                >
                  {bsYears.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="bs-month" className="form-label">Month (BS)</label>
                <select
                  id="bs-month"
                  className="form-select"
                  value={bsMonth}
                  onChange={e => setBsMonth(Number(e.target.value))}
                >
                  {BS_MONTHS.map(m => (
                    <option key={m.num} value={m.num}>{m.en} ({m.ne})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="bs-day" className="form-label">Day (BS)</label>
                <select
                  id="bs-day"
                  className="form-select"
                  value={bsDay}
                  onChange={e => setBsDay(Number(e.target.value))}
                >
                  {Array.from({ length: 32 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Convert Button */}
        <button
          id="btn-convert"
          className="btn btn-primary btn-lg converter-btn"
          onClick={handleConvert}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} />
              Converting...
            </>
          ) : (
            <>
              🔄 Convert Date
            </>
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="converter-error" role="alert">
            ⚠️ {error}
          </div>
        )}

        {/* Result */}
        {result && !error && (
          <div className="converter-result animate-fadeInUp" aria-live="polite" aria-label="Conversion result">
            <div className="result-header">
              <span className="result-label">Converted Date</span>
              <span className="badge badge-success">✓ Accurate</span>
            </div>

            <div className="result-cards">
              {/* Input Card */}
              <div className="result-card result-input-card">
                <div className="result-card-label">Input</div>
                {mode === 'ad-to-bs' ? (
                  <>
                    <div className="result-date">{result.ad.formattedFull}</div>
                    <div className="result-day">{result.ad.dayNameEn}</div>
                    <div className="badge badge-primary mt-sm">AD · Gregorian</div>
                  </>
                ) : (
                  <>
                    <div className="result-date">{result.bs.formattedFull}</div>
                    <div className="result-day nepali-text">{result.bs.dayNameNe}</div>
                    <div className="badge badge-gold mt-sm">BS · Bikram Sambat</div>
                  </>
                )}
              </div>

              {/* Arrow */}
              <div className="result-arrow" aria-hidden="true">⇒</div>

              {/* Output Card */}
              <div className="result-card result-output-card">
                <div className="result-card-label">Result</div>
                {mode === 'ad-to-bs' ? (
                  <>
                    <div className="result-date">{result.bs.formattedFull}</div>
                    <div className="result-date-ne nepali-text">{result.bs.formattedNe}</div>
                    <div className="result-day nepali-text">{result.bs.dayNameNe}</div>
                    <div className="badge badge-gold mt-sm">BS · Bikram Sambat</div>
                  </>
                ) : (
                  <>
                    <div className="result-date">{result.ad.formattedFull}</div>
                    <div className="result-day">{result.ad.dayNameEn}</div>
                    <div className="badge badge-primary mt-sm">AD · Gregorian</div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Info */}
            <div className="result-info">
              <span>📌 {result.ad.dayNameEn}</span>
              <span>·</span>
              <span>BS: {result.bs.formatted}</span>
              <span>·</span>
              <span>AD: {result.ad.formatted}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
