import { FOOTER_LINK_GROUPS, PRIMARY_EMAIL, RESUME_PATH, SITE_LOCATION, SITE_TAGLINE } from '../content/site';

export default function Footer() {
  return (
    <footer className="relative border-t border-bone/5">
      {/* Angular accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px footer-accent-line"
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-bone font-medium mb-4">
                {group.title}
              </p>
              <ul className="space-y-2">
                {group.links.map((link) => {
                  const isExternal = 'external' in link && Boolean(link.external);

                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="text-sm text-bone/65 hover:text-ember transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Legal / Info */}
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-bone font-medium mb-4">
              Info
            </p>
            <ul className="space-y-2">
              <li className="text-sm text-warm-gray">{SITE_LOCATION}</li>
              <li>
                <a href={RESUME_PATH} download className="text-sm text-warm-gray hover:text-burnt-orange transition-colors duration-300">
                  Download Resume
                </a>
              </li>
              <li className="text-sm text-warm-gray break-all">{PRIMARY_EMAIL}</li>
            </ul>

            {/* Built on Cloudflare badge */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-bone/5 border border-bone/5">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-warm-gray">
                  <path d="M16.5 9.4l-3.7 8.2c-.1.3-.4.4-.7.4H6.8c-.3 0-.5-.2-.6-.5l-1-2.8c-.4-1.2.1-2.5 1.2-3.1l4.5-2.5c.2-.1.2-.3 0-.4l-1.3-.6c-.2-.1-.2-.4.1-.4l7.1.5c.2 0 .3.2.2.4l-.5 1zm2.3-1.2l-1.4-.1c-.1 0-.2-.1-.2-.2l-.3-1.3c-.2-.7-.8-1.1-1.5-1.1h-1.8c-.1 0-.2.1-.2.2l-.4 1.8c0 .1-.1.2-.2.2l-8.4.6c-1 .1-1.8.8-2 1.8l-.3 1.5c0 .1 0 .2.1.2h1.5c.1 0 .2-.1.2-.2l.2-.8c.1-.4.5-.7.9-.7h12.8c.5 0 1 .4 1.1.9l.1.6c0 .1.1.2.2.2h1.3c.1 0 .2-.1.2-.2l-.1-1.4c-.1-.9-.8-1.7-1.7-1.8z" fill="currentColor" />
                </svg>
                <span className="font-mono text-[0.6rem] text-warm-gray/80 uppercase tracking-wider">
                  Built on Cloudflare
                </span>
              </div>
              <a
                href="https://github.com/ahump20/AustinHumphrey.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-bone/5 border border-bone/5 hover:border-burnt-orange/30 transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-warm-gray">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="font-mono text-[0.6rem] text-warm-gray/80 uppercase tracking-wider">
                  View Source
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* This site's own tech stack */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite', 'Cloudflare Pages'].map((tech) => (
            <span
              key={tech}
              className="text-[0.5rem] font-mono uppercase tracking-widest text-warm-gray/30 border border-bone/5 rounded-sm px-2 py-0.5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-bone/5 text-center">
          <p className="text-sm font-mono text-warm-gray/80">
            &copy; {new Date().getFullYear()} Austin Humphrey. All rights reserved.
          </p>
          <p className="text-xs font-mono text-warm-gray/40 mt-3 italic">
            {SITE_TAGLINE}
          </p>
          <p className="text-[0.55rem] font-mono text-warm-gray/25 mt-2">
            Last updated April 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
