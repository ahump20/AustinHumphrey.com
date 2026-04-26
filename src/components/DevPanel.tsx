import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DevPanel() {
  const [open, setOpen] = useState(false);
  const loadTime = useRef('');
  if (!loadTime.current && typeof performance !== 'undefined') {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (nav) loadTime.current = `${Math.round(nav.domContentLoadedEventEnd)}ms`;
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '`' && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        setOpen((prev) => {
          if (!prev) window.posthog?.capture('dev_panel_opened');
          return !prev;
        });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 right-5 z-[9999] p-5 shadow-2xl max-w-xs"
          style={{
            background: 'rgba(11, 9, 8, 0.96)',
            border: '1px solid rgba(191, 87, 0, 0.4)',
            color: 'var(--bone)',
          }}
        >
          <p
            className="font-mono mb-3"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--accent-ember)',
            }}
          >
            // Issue Architecture
          </p>
          <div
            className="font-mono space-y-1.5"
            style={{ fontSize: '0.7rem', color: 'var(--bone-mute)', lineHeight: 1.55 }}
          >
            <p>8 chapters · editorial system</p>
            <p>Fraunces · JetBrains Mono · self-hosted</p>
            <p>React 18 · TypeScript · Vite 5</p>
            <p>Framer Motion · Tailwind 3</p>
            <p>Cloudflare Pages</p>
            {loadTime.current && <p>DOM ready: {loadTime.current}</p>}
            <p style={{ color: 'var(--accent-ember)', paddingTop: '0.4rem' }}>Press ` to close.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
