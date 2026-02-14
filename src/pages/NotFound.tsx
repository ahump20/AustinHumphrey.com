import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section">
      <h1 style={{ marginBottom: '0.5rem' }}>404</h1>
      <p className="utility-text" style={{ opacity: 0.5, marginBottom: '2rem' }}>
        Page not found
      </p>
      <p style={{ maxWidth: '480px', marginBottom: '2.5rem' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </section>
  )
}
