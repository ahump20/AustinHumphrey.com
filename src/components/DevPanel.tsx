import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DevPanel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '`' && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        setOpen((prev) => !prev);
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
          className="fixed top-16 right-5 z-[9999] bg-midnight/95 backdrop-blur-sm border border-burnt-orange/20 rounded-sm p-5 shadow-2xl max-w-xs"
        >
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-burnt-orange mb-3">
            // Site Architecture
          </p>
          <div className="space-y-1.5 text-[0.7rem] font-mono text-bone/70">
            <p>12 sections · 28 source files</p>
            <p>4,200+ lines · 0 templates</p>
            <p>React 18 · TypeScript · Tailwind 3</p>
            <p>Framer Motion · Vite 5</p>
            <p>Cloudflare Pages · 65KB gzipped</p>
            <p className="text-burnt-orange/50 pt-1">Built solo. Press ` to close.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
