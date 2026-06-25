import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

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

          {/* Desktop Navigation */}
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
