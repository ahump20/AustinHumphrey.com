import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => {
    window.posthog?.capture('scroll_to_top_clicked');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          onClick={scrollUp}
          className="group fixed bottom-5 left-5 z-40 flex items-center justify-center w-10 h-10 ed-focus"
          style={{
            background: 'rgba(236, 227, 210, 0.92)',
            backdropFilter: 'saturate(1.1) blur(6px)',
            WebkitBackdropFilter: 'saturate(1.1) blur(6px)',
            border: '1px solid rgba(27, 23, 20, 0.35)',
            color: 'var(--ink-strong)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-burnt)';
            e.currentTarget.style.color = 'var(--accent-burnt)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(27, 23, 20, 0.35)';
            e.currentTarget.style.color = 'var(--ink-strong)';
          }}
          aria-label="Scroll to top"
        >
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 15V5m0 0l-4 4m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
