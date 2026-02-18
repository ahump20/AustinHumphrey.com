import { motion } from 'framer-motion'
import { resume } from '../content/resume'
import ScrollReveal from '../components/ScrollReveal'
import { StaggerContainer, StaggerItem } from '../components/ScrollReveal'
import GlassCard from '../components/GlassCard'
import type { ReactNode } from 'react'

interface ContactItem {
  text: string
  href?: string
}

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const WebsiteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const contactMethods: { label: string; icon: ReactNode; items: ContactItem[] }[] = [
  {
    label: 'Email',
    icon: <EmailIcon />,
    items: resume.contact.emails.map((e) => ({ text: e, href: `mailto:${e}` })),
  },
  {
    label: 'LinkedIn',
    icon: <LinkedInIcon />,
    items: [{ text: resume.contact.linkedin, href: `https://${resume.contact.linkedin}` }],
  },
  {
    label: 'Location',
    icon: <LocationIcon />,
    items: [{ text: resume.contact.location }],
  },
  {
    label: 'Websites',
    icon: <WebsiteIcon />,
    items: resume.contact.websites.map((s) => ({ text: s, href: `https://${s}` })),
  },
]

export default function Contact() {
  return (
    <>
      {/* ── Header ── */}
      <section className="section contact-header">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h1>
        <motion.p
          className="page-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          I&apos;m always open to discussing sports intelligence, product strategy,
          new opportunities, or just connecting.
        </motion.p>
      </section>

      {/* ── Contact Cards ── */}
      <section className="section contact-grid-section">
        <StaggerContainer className="contact-grid" staggerDelay={0.12}>
          {contactMethods.map((method) => (
            <StaggerItem key={method.label}>
              <GlassCard className="contact-card">
                <div className="contact-icon">
                  {method.icon}
                </div>
                <h3 className="contact-label">{method.label}</h3>
                <div className="contact-items">
                  {method.items.map((item) =>
                    item.href ? (
                      <a
                        key={item.text}
                        href={item.href}
                        target={item.href.startsWith('mailto') ? undefined : '_blank'}
                        rel={item.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                        className="contact-link"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span key={item.text} className="contact-text">{item.text}</span>
                    ),
                  )}
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── CTA ── */}
      <section className="section contact-cta">
        <ScrollReveal>
          <GlassCard hover={false} style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2 className="cta-heading">Ready to Connect?</h2>
            <p className="cta-text">
              Whether it&apos;s a project idea, partnership, or just a conversation about the
              intersection of sports and technology.
            </p>
            <div className="cta-buttons">
              <a
                href={`mailto:${resume.contact.emails[0]}`}
                className="btn btn-primary btn-glow"
              >
                Send Email
              </a>
              <a
                href={`https://${resume.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                LinkedIn Profile
              </a>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>
    </>
  )
}
