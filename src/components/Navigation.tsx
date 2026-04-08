import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS, RESUME_PATH } from '../content/site';

const ALL_SECTION_IDS = ['hero', 'projects', 'proof', 'bsi', 'infrastructure', 'athletic-arc', 'origin', 'experience', 'skills', 'education', 'currently', 'covenant', 'contact'];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
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

    // Attach to existing sections
    attach();

    // Watch for lazy-loaded sections appearing in the DOM
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
      // Focus trap — Tab wraps within mobile menu
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
          : sectionId === 'contact'
            ? '/contact'
            : `/#${sectionId}`;

    window.history.replaceState(null, '', nextPath);
    const scrollTarget = Math.max(window.scrollY + target.getBoundingClientRect().top - 88, 0);
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top: scrollTarget, left: 0, behavior: 'auto' });
    root.style.scrollBehavior = previousScrollBehavior;
    // Brief flash to draw the eye to the target section
    target.classList.add('section-flash');
    setTimeout(() => target.classList.remove('section-flash'), 1000);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="scroll-progress"
        style={{ scaleX }}
      />

      <motion.nav
        aria-label="Main navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-midnight/96 backdrop-blur-sm border-b border-burnt-orange/15 shadow-[0_10px_32px_rgba(0,0,0,0.35)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 group"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('hero');
            }}
          >
            <img
              src="/assets/austin-headshot.webp"
              alt="Austin Humphrey"
              className="w-9 h-9 rounded-full object-cover object-[center_35%] border border-burnt-orange/40 group-hover:scale-110 group-hover:border-burnt-orange/80 group-hover:-translate-y-px transition-all duration-300"
            />
            <span className="font-mono text-sm text-bone/60 hidden sm:block group-hover:text-burnt-orange transition-colors duration-300">
              Austin Humphrey
            </span>
          </a>

          {/* Section counter + Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            {(() => {
              const idx = ALL_SECTION_IDS.indexOf(activeSection);
              const progress = idx / (ALL_SECTION_IDS.length - 1);
              // Interpolate from warm-gray/40 to burnt-orange based on scroll depth
              const opacity = 0.4 + progress * 0.6;
              return (
                <span
                  className="font-mono text-[0.6rem] tracking-wider tabular-nums transition-colors duration-500"
                  style={{ color: progress > 0.5 ? `rgba(191,87,0,${opacity})` : `rgba(168,159,149,${opacity})` }}
                >
                  {String((idx + 1) || 1).padStart(2, '0')}
                  <span className="opacity-30 mx-0.5">/</span>
                  {ALL_SECTION_IDS.length}
                </span>
              );
            })()}
          </div>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(item.id);
                  }}
                  aria-current={activeSection === item.id ? 'location' : undefined}
                  className={`relative px-3 py-2 font-sans text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-burnt-orange'
                      : 'text-bone/50 hover:text-bone'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-burnt-orange rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Resume download — desktop only */}
          <a
            href={RESUME_PATH}
            download
            onClick={() => window.posthog?.capture('resume_downloaded', { source: 'nav' })}
            className="hidden md:inline-flex items-center gap-1.5 ml-4 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-warm-gray/70 border border-bone/10 rounded-sm hover:border-burnt-orange/40 hover:text-burnt-orange transition-all duration-300"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 3v10m0 0l-3-3m3 3l3-3M4 15h12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Resume
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => {
              if (!mobileOpen) window.posthog?.capture('mobile_menu_opened');
              setMobileOpen(!mobileOpen);
            }}
            className="md:hidden border border-burnt-orange/30 bg-charcoal/90 px-2.5 py-2 text-bone/70 hover:border-burnt-orange hover:text-burnt-orange transition-colors"
            aria-label="Navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop — blocks interaction with content behind */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 top-[60px] bg-midnight md:hidden"
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
                className="relative overflow-hidden md:hidden bg-midnight border-t border-burnt-orange/10"
              >
                <ul className="px-6 py-4 space-y-1">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          scrollToSection(item.id);
                        }}
                        aria-current={activeSection === item.id ? 'location' : undefined}
                        className={`block px-4 py-3 font-sans text-xs uppercase tracking-[0.2em] rounded-sm transition-colors duration-300 ${
                          activeSection === item.id
                            ? 'text-burnt-orange bg-burnt-orange/10'
                            : 'text-bone/50 hover:text-bone hover:bg-white/5'
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={RESUME_PATH}
                      download
                      onClick={() => window.posthog?.capture('resume_downloaded', { source: 'mobile_nav' })}
                      className="flex items-center gap-2 px-4 py-3 font-sans text-xs uppercase tracking-[0.2em] text-burnt-orange/70 hover:text-burnt-orange rounded-sm transition-colors duration-300"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M10 3v10m0 0l-3-3m3 3l3-3M4 15h12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Resume
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
