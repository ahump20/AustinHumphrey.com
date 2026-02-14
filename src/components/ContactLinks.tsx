import { resume } from '../content/resume'

interface ContactLinksProps {
  variant: 'resume' | 'home' | 'contact'
}

export default function ContactLinks({ variant }: ContactLinksProps) {
  const { contact } = resume

  switch (variant) {
    case 'resume':
      return (
        <div className="utility-text" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.7rem' }}>
          <span>{contact.location}</span>
          <span>{contact.phone}</span>
          {contact.emails.map((emailAddress) => (
            <a key={emailAddress} href={`mailto:${emailAddress}`}>{emailAddress}</a>
          ))}
          <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
            {contact.linkedin}
          </a>
        </div>
      )

    case 'home':
      return (
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <a
            href={`https://${contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="utility-text"
          >
            LinkedIn →
          </a>
          <a
            href="https://BlazeSportsIntel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="utility-text"
          >
            BlazeSportsIntel.com →
          </a>
        </div>
      )

    case 'contact':
      return (
        <div style={{ display: 'grid', gap: '2rem', maxWidth: '480px' }}>
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
      )
  }
}
