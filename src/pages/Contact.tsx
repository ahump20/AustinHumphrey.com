import { resume } from '../content/resume'
import './Contact.css'

export default function Contact() {
  const { contact } = resume

  return (
    <section className="section">
      <h1 style={{ marginBottom: '0.5rem' }}>Contact</h1>
      <p className="utility-text" style={{ opacity: 0.5, marginBottom: '3rem' }}>
        Get in touch
      </p>

      <div className="contact-grid">
        {/* Email */}
        <div>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>Email</h3>
          {contact.emails.map((email) => (
            <p key={email}>
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          ))}
        </div>

        {/* LinkedIn */}
        <div>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>LinkedIn</h3>
          <p>
            <a
              href={`https://${contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.linkedin}
            </a>
          </p>
        </div>

        {/* Location */}
        <div>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>Location</h3>
          <p>{contact.location}</p>
        </div>

        {/* Websites */}
        <div>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--burnt-orange)' }}>Websites</h3>
          {contact.websites.map((site) => (
            <p key={site}>
              <a href={`https://${site}`} target="_blank" rel="noopener noreferrer">
                {site}
              </a>
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
