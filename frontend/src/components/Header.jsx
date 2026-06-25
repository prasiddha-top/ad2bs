import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <Link to="/" className="logo" aria-label="AD2BS Home">
            <div className="logo-icon" aria-hidden="true">
              <span className="logo-ad">AD</span>
              <span className="logo-arrow">⇄</span>
              <span className="logo-bs">BS</span>
            </div>
            <div className="logo-text">
              <span className="logo-title">AD2BS</span>
              <span className="logo-subtitle">Nepali Date Converter</span>
            </div>
          </Link>

          {/* Actions: Theme Toggle & Desktop Navigation */}
          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>

            <nav className="nav" role="navigation" aria-label="Main navigation">
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
              <NavLink to="/ad-to-bs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                AD → BS
              </NavLink>
              <NavLink to="/bs-to-ad" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                BS → AD
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About
              </NavLink>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
              id="hamburger-btn"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <nav role="navigation" aria-label="Mobile navigation">
          <NavLink to="/" end onClick={() => setMenuOpen(false)} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            🏠 Home
          </NavLink>
          <NavLink to="/ad-to-bs" onClick={() => setMenuOpen(false)} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            🗓️ AD → BS
          </NavLink>
          <NavLink to="/bs-to-ad" onClick={() => setMenuOpen(false)} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            📅 BS → AD
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            ℹ️ About
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
