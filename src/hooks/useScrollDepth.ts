import { useEffect, useRef } from 'react';

const MILESTONES = [25, 50, 75, 100];

export function useScrollDepth() {
  const fired = useRef(new Set<number>());

  useEffect(() => {
    const handler = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const milestone of MILESTONES) {
        if (percent >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          window.posthog?.capture('scroll_depth', { percent: milestone });
        }
      }
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
}
