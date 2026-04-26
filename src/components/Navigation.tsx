import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS, RESUME_PATH } from '../content/site';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 48);
  });

  useEffect(() => {
    const observed = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' }
    );

    const attach = () => {
      document.querySelectorAll('section[id]').forEach((s) => {
        if (!observed.has(s)) {
          observed.add(s);
          io.observe(s);
        }
      });
    };

    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('mobile-nav', { detail: { open: true } }));
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }
      if (e.key === 'Tab' && mobileMenuRef.current) {
        const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>('a, button');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    requestAnimationFrame(() => {
      const firstLink = mobileMenuRef.current?.querySelector('a');
      firstLink?.focus();
    });
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  const scrollToSection = (sectionId: string) => {
    window.posthog?.capture('nav_section_clicked', { section: sectionId });
    const target = document.getElementById(sectionId);
    if (!target) return;

    const nextPath =
      sectionId === 'hero'
        ? '/'
        : sectionId === 'origin'
          ? '/about'
          : sectionId === 'colophon'
            ? '/contact'
            : `/#${sectionId}`;

    window.history.replaceState(null, '', nextPath);
    const scrollTarget = Math.max(window.scrollY + target.getBoundingClientRect().top - 80, 0);
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top: scrollTarget, left: 0, behavior: 'auto' });
    root.style.scrollBehavior = previousScrollBehavior;
    target.classList.add('section-flash');
    setTimeout(() => target.classList.remove('section-flash'), 1000);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Scroll progress — thin burnt-orange rule */}
      <motion.div
        aria-hidden="true"
        className="scroll-progress"
        style={{ scaleX }}
      />

      <motion.nav
        aria-label="Main navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          /* Always paper-backed so ink text works over paper hero AND over ink sections below.
             At the absolute top we go slightly translucent so the hero's top rule reads through. */
          backgroundColor: scrolled
            ? 'rgba(236, 227, 210, 0.96)'
            : 'rgba(236, 227, 210, 0.75)',
          borderBottom: scrolled ? '1px solid var(--margin-rule)' : '1px solid transparent',
          backdropFilter: 'saturate(1.1) blur(8px)',
          WebkitBackdropFilter: 'saturate(1.1) blur(8px)',
          boxShadow: scrolled ? '0 1px 30px rgba(27, 23, 20, 0.08)' : 'none',
        }}
      >
        <div className="max-w-[86rem] mx-auto px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between gap-6">

          {/* Masthead nameplate */}
          <a
            href="/"
            className="flex items-center gap-3 group ed-focus"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('hero');
            }}
            aria-label="Austin Humphrey — home"
          >
            <span
              className="text-xl md:text-2xl leading-none transition-colors duration-300"
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontVariationSettings: '"opsz" 72, "SOFT" 40',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                /* Over hero paper ground (unscrolled) use ink; over ink-ground (scrolled, but paper bg kicks in) still use ink.
                   Both states land ink text on cream backing, which reads cleanly on either section below. */
                color: 'var(--ink-strong)',
              }}
            >
              Austin{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontVariationSettings: '"opsz" 72, "SOFT" 80, "WONK" 1',
                  color: 'var(--accent-burnt)',
                }}
              >
                Humphrey
              </em>
            </span>
          </a>

          {/* Chapter nav — mono small-caps */}
          <ul className="hidden md:flex items-center gap-5 lg:gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item.id);
                    }}
                    aria-current={isActive ? 'location' : undefined}
                    className="relative block transition-colors duration-300 ed-focus"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.68rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      padding: '0.5rem 0',
                      color: isActive ? 'var(--accent-burnt)' : 'var(--ink-mute)',
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          bottom: -4,
                          height: 2,
                          background: 'var(--accent-burnt)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Correspondence CTA */}
          <a
            href="#colophon"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('colophon');
            }}
            className="hidden md:inline-flex items-center gap-2 ed-focus"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              padding: '0.65rem 1.1rem',
              border: '1px solid var(--ink-mute)',
              color: 'var(--ink)',
              transition: 'all 0.3s ease',
            }}
          >
            Correspondence
            <span aria-hidden>→</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => {
              if (!mobileOpen) window.posthog?.capture('mobile_menu_opened');
              setMobileOpen(!mobileOpen);
            }}
            className="md:hidden p-2 ed-focus"
            style={{
              border: '1px solid var(--ink-mute)',
              color: 'var(--ink)',
              background: 'transparent',
            }}
            aria-label="Navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              {mobileOpen ? (
                <path d="M1 1L19 13M19 1L1 13" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <>
                  <path d="M0 1H20" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M0 7H20" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M0 13H20" stroke="currentColor" strokeWidth="1.5" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile drawer — paper ground */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 top-[64px] md:hidden"
                style={{ background: 'var(--paper)' }}
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
              />
              <motion.div
                id="mobile-nav-menu"
                ref={mobileMenuRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                className="relative overflow-hidden md:hidden"
                style={{
                  background: 'var(--paper)',
                  borderTop: '1px solid var(--margin-rule)',
                }}
              >
                <ul className="px-6 py-5 space-y-1">
                  {NAV_ITEMS.map((item, i) => {
                    const isActive = activeSection === item.id;
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(event) => {
                            event.preventDefault();
                            scrollToSection(item.id);
                          }}
                          aria-current={isActive ? 'location' : undefined}
                          className="flex items-baseline gap-4 py-3 ed-focus"
                          style={{
                            borderBottom:
                              i < NAV_ITEMS.length - 1
                                ? '1px solid var(--margin-rule)'
                                : 'none',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'JetBrains Mono, monospace',
                              fontSize: '0.65rem',
                              letterSpacing: '0.22em',
                              color: 'var(--ink-mute)',
                              minWidth: '2.5rem',
                            }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span
                            style={{
                              fontFamily: 'Fraunces, Georgia, serif',
                              fontVariationSettings: '"opsz" 24, "SOFT" 20',
                              fontSize: '1.25rem',
                              fontWeight: 500,
                              color: isActive ? 'var(--accent-burnt)' : 'var(--ink)',
                            }}
                          >
                            {item.label}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                  <li className="pt-4">
                    <a
                      href={RESUME_PATH}
                      download
                      onClick={() => window.posthog?.capture('resume_downloaded', { source: 'mobile_nav' })}
                      className="btn-editorial ed-focus w-full justify-center"
                      style={{ color: 'var(--ink)' }}
                    >
                      Curriculum Vitae
                      <span aria-hidden>↗</span>
                    </a>
                  </li>
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
