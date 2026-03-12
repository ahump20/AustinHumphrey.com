import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  function handleNavClick(to: string) {
    setMobileMenuOpen(false)
    navigate(to)
  }

  return (
    <div className="app">
      <header className="site-header">
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/" className="nav-brand">AH</NavLink>
          <ul className="nav-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/resume">Resume</NavLink></li>
            <li><NavLink to="/work">Work</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <button
            className="hamburger-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className="mobile-menu" role="navigation" aria-label="Mobile navigation">
            <ul>
              <li><button onClick={() => handleNavClick('/')}>Home</button></li>
              <li><button onClick={() => handleNavClick('/resume')}>Resume</button></li>
              <li><button onClick={() => handleNavClick('/work')}>Work</button></li>
              <li><button onClick={() => handleNavClick('/contact')}>Contact</button></li>
            </ul>
          </div>
        )}
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Austin Humphrey</p>
      </footer>
    </div>
  )
}

export default App
