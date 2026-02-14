import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import ScrollProgress from './components/ScrollProgress'
import Ticker from './components/Ticker'
import './App.css'

function useTheme() {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    if (theme === 'light' || theme === 'dark') {
      try {
        localStorage.setItem('theme', theme)
      } catch {
        // Ignore persistence errors (e.g., blocked storage / privacy mode)
      }
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}

function App() {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const [prevPath, setPrevPath] = useState(location.pathname)

  // Close mobile menu and scroll to top on navigation
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname)
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }

  return (
    <div className="app">
      <ScrollProgress />
      <header className="site-header">
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/" className="nav-brand">AH</NavLink>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          </button>

          <ul className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/origin">Origin</NavLink></li>
            <li><NavLink to="/resume">Resume</NavLink></li>
            <li><NavLink to="/work">Work</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>

          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '\u2600' : '\u263E'}
          </button>
        </nav>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Austin Humphrey</p>
      </footer>
      <Ticker />
    </div>
  )
}

export default App
