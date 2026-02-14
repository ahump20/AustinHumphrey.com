import { resume } from '../content/resume'

const { contact } = resume

export default function Contact() {
  return (
    <section className="section page-enter">
      <h1 className="anim-fade-in-up delay-1" style={{ marginBottom: '0.5rem' }}>Contact</h1>
      <p className="utility-text anim-fade-in delay-2" style={{ opacity: 0.5, marginBottom: '3rem' }}>
        Get in touch
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {/* Email */}
        <div className="card anim-fade-in-up delay-2">
          <h3 style={{ marginBottom: '0.75rem', color: 'var(--burnt-orange)', fontSize: '1.1rem' }}>Email</h3>
          {contact.emails.map((email) => (
            <p key={email} style={{ marginBottom: '0.5rem' }}>
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          ))}
        </div>

        {/* Phone */}
        <div className="card anim-fade-in-up delay-3">
          <h3 style={{ marginBottom: '0.75rem', color: 'var(--burnt-orange)', fontSize: '1.1rem' }}>Phone</h3>
          <p>
            <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          </p>
        </div>

        {/* Location */}
        <div className="card anim-fade-in-up delay-4">
          <h3 style={{ marginBottom: '0.75rem', color: 'var(--burnt-orange)', fontSize: '1.1rem' }}>Location</h3>
          <p style={{ marginBottom: 0 }}>{contact.location}</p>
        </div>

        {/* Websites */}
        <div className="card anim-fade-in-up delay-5">
          <h3 style={{ marginBottom: '0.75rem', color: 'var(--burnt-orange)', fontSize: '1.1rem' }}>Websites</h3>
          {contact.websites.map((site) => (
            <p key={site} style={{ marginBottom: '0.5rem' }}>
              <a href={`https://${site}`} target="_blank" rel="noopener noreferrer">{site}</a>
            </p>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="anim-fade-in-up delay-5">
        <h2 className="section-title">Connect</h2>
        <div className="social-links" style={{ gap: '1.25rem' }}>
          <a href={contact.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn" style={{ width: 'auto', padding: '0 1rem', gap: '0.5rem' }}>
            <span className="utility-text" style={{ fontSize: '0.65rem' }}>LinkedIn</span>
          </a>
          <a href={contact.socials.github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub" style={{ width: 'auto', padding: '0 1rem', gap: '0.5rem' }}>
            <span className="utility-text" style={{ fontSize: '0.65rem' }}>GitHub</span>
          </a>
          <a href={contact.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-link" title="X / Twitter" style={{ width: 'auto', padding: '0 1rem', gap: '0.5rem' }}>
            <span className="utility-text" style={{ fontSize: '0.65rem' }}>X / Twitter</span>
          </a>
        </div>
      </div>
    </section>
  )
}
