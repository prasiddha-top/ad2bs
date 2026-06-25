import { useState, useCallback, useEffect } from 'react'
import { adToBs, bsToAd, getToday } from '../utils/nepaliDateConverter'
import './DateConverter.css'

const BS_MONTHS = [
  { num: 1,  en: 'Baisakh',  ne: 'बैशाख'  },
  { num: 2,  en: 'Jestha',   ne: 'जेठ'    },
  { num: 3,  en: 'Ashadh',   ne: 'असार'   },
  { num: 4,  en: 'Shrawan',  ne: 'साउन'   },
  { num: 5,  en: 'Bhadra',   ne: 'भाद्र'  },
  { num: 6,  en: 'Ashwin',   ne: 'आश्विन' },
  { num: 7,  en: 'Kartik',   ne: 'कार्तिक'},
  { num: 8,  en: 'Mangsir',  ne: 'मंसिर'  },
  { num: 9,  en: 'Poush',    ne: 'पुष'    },
  { num: 10, en: 'Magh',     ne: 'माघ'    },
  { num: 11, en: 'Falgun',   ne: 'फाल्गुन'},
  { num: 12, en: 'Chaitra',  ne: 'चैत'    },
]

const AD_MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]

export default function DateConverter({ defaultMode = 'ad-to-bs' }) {
  const [mode, setMode]       = useState(defaultMode)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)

  const today = new Date()
  const [adYear,  setAdYear]  = useState(today.getFullYear())
  const [adMonth, setAdMonth] = useState(today.getMonth() + 1)
  const [adDay,   setAdDay]   = useState(today.getDate())
  const [bsYear,  setBsYear]  = useState(2083)
  const [bsMonth, setBsMonth] = useState(3)
  const [bsDay,   setBsDay]   = useState(11)

  // Sync mode with prop changes (if any)
  useEffect(() => {
    setMode(defaultMode)
    setResult(null)
    setError(null)
  }, [defaultMode])

  const handleConvert = useCallback(() => {
    setError(null)
    setResult(null)
    try {
      const data = mode === 'ad-to-bs'
        ? adToBs(adYear, adMonth, adDay)
        : bsToAd(bsYear, bsMonth, bsDay)
      setResult(data)
    } catch (err) {
      setError(err.message)
    }
  }, [mode, adYear, adMonth, adDay, bsYear, bsMonth, bsDay])

  const handleToday = useCallback(() => {
    const now = new Date()
    setAdYear(now.getFullYear())
    setAdMonth(now.getMonth() + 1)
    setAdDay(now.getDate())
    setMode('ad-to-bs')
    setError(null)
    try {
      const data = getToday()
      setResult(data)
    } catch {
      setError("Could not load today's date")
    }
  }, [])

  const handleSwap = () => {
    setMode(m => m === 'ad-to-bs' ? 'bs-to-ad' : 'ad-to-bs')
    setResult(null)
    setError(null)
  }

  const adYears = Array.from({ length: 131 }, (_, i) => 1913 + i)
  const bsYears = Array.from({ length: 131 }, (_, i) => 1970 + i)

  return (
    <div className="dc-root">
      {/* ── Segmented Control Switch ─────────────────── */}
      <div className="dc-tabs-container">
        <div className="dc-tabs" role="tablist">
          <button
            id="tab-ad-to-bs"
            role="tab"
            aria-selected={mode === 'ad-to-bs'}
            className={`dc-tab ${mode === 'ad-to-bs' ? 'dc-tab--active' : ''}`}
            onClick={() => { setMode('ad-to-bs'); setResult(null); setError(null) }}
          >
            <span className="dc-tab-emoji">🌐</span>
            <span className="dc-tab-text">AD to BS</span>
          </button>

          <button
            id="tab-bs-to-ad"
            role="tab"
            aria-selected={mode === 'bs-to-ad'}
            className={`dc-tab ${mode === 'bs-to-ad' ? 'dc-tab--active' : ''}`}
            onClick={() => { setMode('bs-to-ad'); setResult(null); setError(null) }}
          >
            <span className="dc-tab-emoji">🏔️</span>
            <span className="dc-tab-text">BS to AD</span>
          </button>
        </div>
      </div>

      {/* ── Card ────────────────────────────────────── */}
      <div className="dc-card">
        {/* top row: label + quick actions */}
        <div className="dc-card-top">
          <span className="dc-card-title">
            {mode === 'ad-to-bs' ? 'Gregorian Date (AD)' : 'Nepali Date (BS)'}
          </span>
          <div className="dc-actions">
            <button id="btn-today" className="dc-action-btn" onClick={handleToday} title="Use Today's Date">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>Today</span>
            </button>
            <button id="btn-swap" className="dc-action-btn" onClick={handleSwap} title="Swap Converter Direction">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
              <span>Swap</span>
            </button>
          </div>
        </div>

        {/* inputs */}
        <div className="dc-fields">
          {mode === 'ad-to-bs' ? (
            <>
              <div className="dc-field">
                <label htmlFor="ad-year" className="dc-label">Year (AD)</label>
                <select id="ad-year" className="dc-select" value={adYear} onChange={e => setAdYear(Number(e.target.value))}>
                  {adYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="dc-field dc-field--wide">
                <label htmlFor="ad-month" className="dc-label">Month (AD)</label>
                <select id="ad-month" className="dc-select" value={adMonth} onChange={e => setAdMonth(Number(e.target.value))}>
                  {AD_MONTHS.map((name, i) => <option key={i+1} value={i+1}>{name}</option>)}
                </select>
              </div>
              <div className="dc-field dc-field--narrow">
                <label htmlFor="ad-day" className="dc-label">Day (AD)</label>
                <select id="ad-day" className="dc-select" value={adDay} onChange={e => setAdDay(Number(e.target.value))}>
                  {Array.from({ length: 31 }, (_, i) => i+1).map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="dc-field">
                <label htmlFor="bs-year" className="dc-label">Year (BS)</label>
                <select id="bs-year" className="dc-select" value={bsYear} onChange={e => setBsYear(Number(e.target.value))}>
                  {bsYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="dc-field dc-field--wide">
                <label htmlFor="bs-month" className="dc-label">Month (BS)</label>
                <select id="bs-month" className="dc-select" value={bsMonth} onChange={e => setBsMonth(Number(e.target.value))}>
                  {BS_MONTHS.map(m => <option key={m.num} value={m.num}>{m.en} ({m.ne})</option>)}
                </select>
              </div>
              <div className="dc-field dc-field--narrow">
                <label htmlFor="bs-day" className="dc-label">Day (BS)</label>
                <select id="bs-day" className="dc-select" value={bsDay} onChange={e => setBsDay(Number(e.target.value))}>
                  {Array.from({ length: 32 }, (_, i) => i+1).map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </>
          )}
        </div>

        {/* convert button */}
        <button
          id="btn-convert"
          className="dc-convert-btn"
          onClick={handleConvert}
        >
          <span className="dc-btn-row">
            <svg className="dc-btn-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
            <span>Convert Date</span>
          </span>
        </button>

        {/* error */}
        {error && (
          <div className="dc-error" role="alert">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>{error}</span>
          </div>
        )}

        {/* result */}
        {result && !error && (
          <div className="dc-result" aria-live="polite">
            <div className="dc-result-header">
              <span className="dc-result-label">Converted Date</span>
              <span className="dc-accurate-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Accurate</span>
              </span>
            </div>

            <div className="dc-result-body">
              {/* FROM */}
              <div className="dc-result-side dc-result-side--from">
                <p className="dc-result-type">{mode === 'ad-to-bs' ? 'Gregorian (AD)' : 'Bikram Sambat (BS)'}</p>
                <p className="dc-result-main">
                  {mode === 'ad-to-bs' ? result.ad.formattedFull : result.bs.formattedFull}
                </p>
                {mode === 'bs-to-ad' && (
                  <p className="dc-result-ne nepali-text">{result.bs.formattedNe}</p>
                )}
                <p className={`dc-result-day ${mode === 'bs-to-ad' ? 'nepali-text' : ''}`}>
                  {mode === 'ad-to-bs' ? result.ad.dayNameEn : result.bs.dayNameNe}
                </p>
              </div>

              {/* Arrow separator */}
              <div className="dc-result-divider" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>

              {/* TO */}
              <div className="dc-result-side dc-result-side--to">
                <p className="dc-result-type">{mode === 'ad-to-bs' ? 'Bikram Sambat (BS)' : 'Gregorian (AD)'}</p>
                <p className="dc-result-main dc-result-main--highlight">
                  {mode === 'ad-to-bs' ? result.bs.formattedFull : result.ad.formattedFull}
                </p>
                {mode === 'ad-to-bs' && (
                  <p className="dc-result-ne nepali-text">{result.bs.formattedNe}</p>
                )}
                <p className={`dc-result-day ${mode === 'ad-to-bs' ? 'nepali-text' : ''}`}>
                  {mode === 'ad-to-bs' ? result.bs.dayNameNe : result.ad.dayNameEn}
                </p>
              </div>
            </div>

            {/* meta strip */}
            <div className="dc-result-meta">
              <span>AD <strong>{result.ad.formatted}</strong></span>
              <span className="dc-meta-sep">|</span>
              <span>BS <strong>{result.bs.formatted}</strong></span>
              <span className="dc-meta-sep">|</span>
              <span>{result.ad.dayNameEn} ({result.bs.dayNameNe})</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
