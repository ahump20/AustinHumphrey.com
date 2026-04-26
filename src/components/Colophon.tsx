import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import {
  COLOPHON_CHANNELS,
  COLOPHON_SPECS,
  PRIMARY_EMAIL,
  SITE_TAGLINE,
  RESUME_PATH,
  type ContactChannelIcon,
} from '../content/site';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

function ChannelIcon({ kind }: { kind: ContactChannelIcon }) {
  switch (kind) {
    case 'email':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8l9 6 9-6M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8M3 8l9-4 9 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'resume':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 3v5h5M14 3H5v18h14V8M14 3l5 5M9 13h6M9 17h4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Colophon() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [emailTouched, setEmailTouched] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef<HTMLDivElement>(null);
  const emailValid = !emailTouched || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const renderTurnstile = useCallback(() => {
    const w = window as unknown as { turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => void } };
    if (!w.turnstile || !turnstileRef.current) return;
    while (turnstileRef.current.firstChild) {
      turnstileRef.current.removeChild(turnstileRef.current.firstChild);
    }
    w.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: 'light',
      callback: (token: string) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
    });
  }, []);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current) return;
    const existingScript = document.querySelector('script[src*="turnstile"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = () => renderTurnstile();
    } else {
      renderTurnstile();
    }
  }, [renderTurnstile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) return;

    window.posthog?.capture('contact_form_submitted');
    setFormState('sending');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const payload: Record<string, string> = { name, email, message, site: 'austinhumphrey.com' };
      if (turnstileToken) payload.turnstileToken = turnstileToken;
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) throw new Error(data?.error || 'Could not deliver the message.');
      setFormState('sent');
      setName(''); setEmail(''); setMessage(''); setTurnstileToken('');
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setFormState('error');
        return;
      }
      setFormState('error');
    } finally {
      clearTimeout(timeoutId);
    }
  };

  return (
    <section
      id="colophon"
      aria-labelledby="colophon-heading"
      className="colophon"
    >
      <div className="colophon__inner">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="colophon__head"
        >
          <div>
            <p className="ed-kicker mb-3" style={{ color: 'var(--accent-burnt)' }}>
              Chapter VI · Colophon
            </p>
            <h2 id="colophon-heading" className="colophon__title">
              The direct <em>line.</em>
            </h2>
          </div>
          <p className="colophon__lede">
            No gatekeepers, no form letters. Reach Austin directly through any of these channels — every message lands in his inbox personally.
          </p>
        </motion.div>

        {/* Two-column: contact form (left) + channels + specs (right) */}
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 mt-12 items-start">

          {/* ── Contact form ── */}
          <motion.form
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            onSubmit={handleSubmit}
          >
            <p className="cv-column__heading">Send a note</p>
            <p
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontVariationSettings: '"opsz" 14',
                fontSize: '0.95rem',
                lineHeight: 1.55,
                color: 'var(--ink-mute)',
                marginBottom: '1.5rem',
                maxWidth: '40ch',
              }}
            >
              Introduce the project, opportunity, or idea. Keep it direct.
            </p>

            {/* honeypot */}
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', opacity: 0, height: 0, width: 0, overflow: 'hidden', pointerEvents: 'none' }}
            />

            <div className="field-stack">
              <label className="field-label" htmlFor="colophon-name">Name</label>
              <input
                id="colophon-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="field-input"
              />
            </div>

            <div className="field-stack">
              <label className="field-label" htmlFor="colophon-email">Email</label>
              <input
                id="colophon-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                aria-invalid={!emailValid}
                aria-describedby={!emailValid ? 'colophon-email-error' : undefined}
                placeholder="your@email.com"
                className="field-input"
              />
              {!emailValid && (
                <span id="colophon-email-error" className="field-error" role="alert">
                  Enter a valid email
                </span>
              )}
            </div>

            <div className="field-stack">
              <label className="field-label" htmlFor="colophon-message">
                Message
              </label>
              <textarea
                id="colophon-message"
                required
                rows={4}
                maxLength={500}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What's on your mind?"
                className="field-textarea"
              />
              <span className="field-counter tabular-figs">
                {message.length} / 500
              </span>
            </div>

            {TURNSTILE_SITE_KEY && (
              <div ref={turnstileRef} className="mt-4 flex" />
            )}

            <button
              type="submit"
              disabled={formState === 'sending'}
              className="btn-editorial-solid ed-focus mt-6"
              style={{
                width: '100%',
                justifyContent: 'center',
                opacity: formState === 'sending' ? 0.6 : 1,
              }}
            >
              {formState === 'sending'
                ? 'Sending…'
                : formState === 'sent'
                  ? 'Sent ✓'
                  : 'Deliver the note'}
              {formState === 'idle' && <span aria-hidden style={{ marginLeft: 2 }}>→</span>}
            </button>

            {formState === 'sent' && (
              <p className="field-success mt-3" aria-live="polite">
                Message received. Austin will get back to you.
              </p>
            )}
            {formState === 'error' && (
              <p className="field-error mt-3" aria-live="polite">
                Could not deliver. Try emailing {PRIMARY_EMAIL} directly.
              </p>
            )}
          </motion.form>

          {/* ── Channels ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
          >
            <p className="cv-column__heading">All five channels</p>
            <div className="colophon__channels" style={{ marginTop: 0 }}>
              {COLOPHON_CHANNELS.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.external ? '_blank' : undefined}
                  rel={ch.external ? 'noopener noreferrer' : undefined}
                  download={ch.icon === 'resume' ? '' : undefined}
                  onClick={() =>
                    window.posthog?.capture('contact_link_clicked', {
                      channel: ch.label.toLowerCase(),
                    })
                  }
                  className="colophon__channel ed-focus"
                >
                  <span className="colophon__channel-label">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ChannelIcon kind={ch.icon} />
                      {ch.label}
                    </span>
                  </span>
                  <span className="colophon__channel-value">{ch.value}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Specs / Credits ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="colophon__specs"
        >
          {COLOPHON_SPECS.map((spec) => (
            <div className="colophon__spec" key={spec.label}>
              <span className="colophon__spec-label">{spec.label}</span>
              <span className="colophon__spec-value">
                {spec.valueLink ? (
                  <a href={spec.valueLink} target="_blank" rel="noopener noreferrer">
                    {spec.value}
                  </a>
                ) : (
                  spec.value
                )}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Closing line ── */}
        <div className="colophon__close">
          <p className="colophon__close-line">{SITE_TAGLINE}</p>
          <p className="colophon__close-meta">
            © {new Date().getFullYear()} Austin Humphrey · Set in Fraunces &amp; JetBrains Mono · Hosted on Cloudflare
          </p>
        </div>

        {/* Resume failsafe link for screen readers / no-JS */}
        <p className="sr-only">
          <a href={RESUME_PATH}>Download Curriculum Vitae</a>
        </p>
      </div>
    </section>
  );
}
