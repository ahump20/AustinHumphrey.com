import { resume } from '../content/resume'
import './Resume.css'

export default function Resume() {
  return (
    <article className="section resume-page">
      {/* Header */}
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.25rem' }}>{resume.name}</h1>
        <p className="utility-text" style={{ opacity: 0.7, marginBottom: '1rem' }}>
          {resume.tagline}
        </p>
        <div className="utility-text resume-contact-row">
          <span>{resume.contact.location}</span>
          <span>{resume.contact.phone}</span>
          {resume.contact.emails.map((emailAddress) => (
            <a key={emailAddress} href={`mailto:${emailAddress}`}>{emailAddress}</a>
          ))}
          <a href={`https://${resume.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
            {resume.contact.linkedin}
          </a>
        </div>
      </header>

      {/* Download */}
      <div className="no-print resume-actions">
        <a
          href="/assets/Austin_Humphrey_Resume.pdf"
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download PDF
        </a>
        <button className="btn" onClick={() => window.print()}>
          Print
        </button>
      </div>

      {/* Summary */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Summary</h2>
        <p>{resume.summary}</p>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Experience</h2>
        {resume.experience.map((role) => (
          <div key={`${role.company}-${role.dates}`} style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '0.15rem' }}>{role.title}</h3>
            <p className="utility-text" style={{ marginBottom: '0.5rem', opacity: 0.7 }}>
              {role.company} · {role.location} · {role.dates}
            </p>
            <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
              {role.bullets.map((bulletPoint, index) => (
                <li key={index} style={{ marginBottom: '0.4rem', fontSize: '1.05rem' }}>{bulletPoint}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Education</h2>
        {resume.education.map((educationEntry) => (
          <div key={educationEntry.institution} style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ marginBottom: '0.15rem', fontSize: '1.1rem' }}>{educationEntry.degree}</h3>
            <p className="utility-text" style={{ opacity: 0.7 }}>
              {educationEntry.institution}{educationEntry.details ? ` · ${educationEntry.details}` : ''}
            </p>
          </div>
        ))}
      </section>

      {/* Honors & Leadership */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Honors &amp; Leadership</h2>
        <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
          {resume.honorsAndLeadership.map((item, index) => (
            <li key={index} style={{ marginBottom: '0.4rem', fontSize: '1.05rem' }}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section>
        <h2 className="section-title">Skills</h2>
        <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
          {resume.skills.map((skill, index) => (
            <li key={index} style={{ marginBottom: '0.4rem', fontSize: '1.05rem' }}>{skill}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}
