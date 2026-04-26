import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useKonamiCode } from './hooks/useKonamiCode';
import { useScrollDepth } from './hooks/useScrollDepth';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import HeroMasthead from './components/HeroMasthead';
import IssueIndex from './components/IssueIndex';
import DisciplineAxes from './components/DisciplineAxes';
import Curriculum from './components/Curriculum';
import SelectedWork from './components/SelectedWork';
import ReadingRoom from './components/ReadingRoom';
import Origin from './components/Origin';
import Colophon from './components/Colophon';
import ScrollToTop from './components/ScrollToTop';
import DevPanel from './components/DevPanel';

const AIChatWidget = lazy(() => import('./components/AIChatWidget'));

function App() {
  const [easterEgg, setEasterEgg] = useState(false);
  useScrollDepth();

  // Set page-level properties for PostHog segmentation
  useEffect(() => {
    window.posthog?.capture('page_context', {
      viewport_width: window.innerWidth,
      sections_count: document.querySelectorAll('section[id]').length,
      site_version: 'v3.0',
    });
  }, []);

  useKonamiCode(useCallback(() => {
    setEasterEgg(true);
    window.posthog?.capture('konami_code_activated');
    setTimeout(() => setEasterEgg(false), 3000);
  }, []));

  // Deep-linking via /about and /contact paths
  useEffect(() => {
    const routeToSection: Record<string, string> = {
      '/': 'hero',
      '/about': 'origin',
      '/contact': 'colophon',
    };
    const targetSectionId = routeToSection[window.location.pathname];
    if (!targetSectionId) return;
    const scrollToTarget = () => {
      const target = document.getElementById(targetSectionId);
      if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
    };
    requestAnimationFrame(scrollToTarget);
  }, []);

  return (
    <ErrorBoundary>
      <div
        className="min-h-screen"
        style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)' }}
      >
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        <main id="main" className="main-content" tabIndex={-1}>

          {/* Cover — masthead + nameplate + portrait */}
          <HeroMasthead />

          {/* Quiet seam between cover and contents */}
          <div className="paper-chapter-rule" aria-hidden="true" />

          {/* Issue Contents — magazine TOC, the signature moment */}
          <IssueIndex />

          {/* Page turn — paper to ink */}
          <div className="paper-to-ink-seam" aria-hidden="true" />

          {/* Chapter I — Three Axes (the only ink interlude) */}
          <DisciplineAxes />

          {/* Page turn — ink back to paper */}
          <div className="ink-to-paper-seam" aria-hidden="true" />

          {/* Chapter II — Curriculum Vitae */}
          <Curriculum />

          <div className="paper-chapter-rule" aria-hidden="true" />

          {/* Chapter III — Selected Work */}
          <SelectedWork />

          <div className="paper-chapter-rule" aria-hidden="true" />

          {/* Chapter IV — Reading Room */}
          <ReadingRoom />

          <div className="paper-chapter-rule" aria-hidden="true" />

          {/* Chapter V — Origin */}
          <Origin />

          {/* Chapter VI — Colophon (replaces footer + contact) */}
          <Colophon />
        </main>

        {/* Konami code Easter egg — Austin's monogram */}
        {easterEgg && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none animate-pulse">
            <div className="text-center">
              <p
                className="text-7xl md:text-9xl"
                style={{
                  fontFamily: 'Fraunces, Georgia, serif',
                  fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  color: 'var(--accent-burnt)',
                  textShadow: '0 0 50px rgba(110,31,38,0.45)',
                  letterSpacing: '-0.025em',
                }}
              >
                AH
              </p>
              <p
                className="font-mono text-sm mt-2"
                style={{
                  color: 'var(--ink-mute)',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  fontSize: '0.7rem',
                }}
              >
                Born to Blaze the Path Beaten Less
              </p>
            </div>
          </div>
        )}

        <ScrollToTop />
        <DevPanel />
        <Suspense fallback={null}>
          <AIChatWidget />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
