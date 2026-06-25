import { useState, useEffect } from 'react'
import './TodayDate.css'

const API_BASE = import.meta.env.VITE_API_URL || ''

export default function TodayDate() {
  const [today, setToday] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/api/convert/today`)
      .then(r => r.json())
      .then(d => { if (d.success) setToday(d.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="today-card glass-card">
        <div className="flex-center" style={{ padding: '24px' }}>
          <div className="spinner" />
        </div>
      </div>
    )
  }

  if (!today) return null

  return (
    <div className="today-card glass-card animate-fadeInUp" aria-label="Today's date in both calendars">
      <div className="today-header">
        <span className="today-label">📅 आजको मिति · Today's Date</span>
        <span className="today-day">{today.ad.dayNameEn}</span>
      </div>

      <div className="today-dates">
        <div className="today-date-block today-ad">
          <div className="today-date-type">AD · Gregorian</div>
          <div className="today-date-value">{today.ad.formattedFull}</div>
          <div className="today-date-short">{today.ad.formatted}</div>
        </div>

        <div className="today-separator" aria-hidden="true">⇄</div>

        <div className="today-date-block today-bs">
          <div className="today-date-type">BS · Bikram Sambat</div>
          <div className="today-date-value">{today.bs.formattedFull}</div>
          <div className="today-date-ne nepali-text">{today.bs.formattedNe}</div>
        </div>
      </div>
    </div>
  )
}
