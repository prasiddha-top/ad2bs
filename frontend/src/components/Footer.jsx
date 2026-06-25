import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      {/* Footer Ad Banner */}
      <div className="footer-ad">
        <div className="container">
          <div className="ad-container ad-leaderboard">
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-7051110697789992"
              data-ad-slot="auto"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <span className="footer-logo-icon">AD⇄BS</span>
                <span className="footer-logo-name">Nepali Date Converter</span>
              </Link>
              <p className="footer-desc">
                The most accurate and fastest AD to BS and BS to AD date converter.
                Supports Bikram Sambat years 1970–2100 BS.
              </p>
              <p className="footer-desc nepali-text">
                एडी देखि बिएस र बिएस देखि एडी मिति रूपान्तरण
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-links">
              <h3 className="footer-heading">Quick Convert</h3>
              <ul>
                <li><Link to="/ad-to-bs">AD to BS Converter</Link></li>
                <li><Link to="/bs-to-ad">BS to AD Converter</Link></li>
                <li><Link to="/">Today's Date</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </div>

            {/* Popular Conversions */}
            <div className="footer-links">
              <h3 className="footer-heading">Popular Searches</h3>
              <ul>
                <li><span>2082 BS to AD</span></li>
                <li><span>2083 BS to AD</span></li>
                <li><span>2026 AD to BS</span></li>
                <li><span>Nepali New Year</span></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              © {currentYear} AD2BS · <a href="https://prasiddha.top" target="_blank" rel="noopener noreferrer">prasiddha.top</a>
              &nbsp;· All rights reserved
            </p>
            <p className="footer-copy text-muted">
              Accurate Nepali date conversion: BS 1970–2100 · AD 1913–2043
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
