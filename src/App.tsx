import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ScrollProgress from './components/ScrollProgress'
import Ticker from './components/Ticker'
import './App.css'

const ParticleField = lazy(() => import('./components/ParticleField'))

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/origin', label: 'Origin' },
  { to: '/resume', label: 'Resume' },
  { to: '/work', label: 'Work' },
  { to: '/contact', label: 'Contact' },
]

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('Theme persistence failed:', error)
      }
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}

function App() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="app">
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
      <ScrollProgress />

      <header className="site-header">
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/" className="nav-brand" onClick={() => setMobileOpen(false)}>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              AH
            </motion.span>
          </NavLink>

          <button
            type="button"
            className={`hamburger ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="main-menu"
          >
            <span />
            <span />
            <span />
          </button>

          <ul id="main-menu" className={`nav-links ${mobileOpen ? 'nav-open' : ''}`}>
            {navLinks.map((link, i) => (
              <motion.li
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.4 }}
              >
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
              </motion.li>
            ))}
          </ul>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </nav>
      </header>

      <main className="site-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">AH</span>
            <span className="footer-tagline">Sports Intelligence &middot; Product Strategy &middot; AI-Assisted Analytics</span>
          </div>
          <div className="footer-links">
            <a href="https://linkedin.com/in/ahump20" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://BlazeSportsIntel.com" target="_blank" rel="noopener noreferrer">Blaze Sports Intel</a>
            <a href="mailto:Austin@BlazeSportsIntel.com">Email</a>
          </div>
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Austin Humphrey. All rights reserved.
          </div>
        </div>
      </footer>
      <Ticker />
    </div>
  )
}

export default App
