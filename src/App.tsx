import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useKonamiCode } from './hooks/useKonamiCode';
import { useScrollDepth } from './hooks/useScrollDepth';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import HeroMasthead from './components/HeroMasthead';
import DisciplineAxes from './components/DisciplineAxes';
import ProfessionalExperience from './components/ProfessionalExperience';
import PassionProjectBSI from './components/PassionProjectBSI';
import AppliedAI from './components/AppliedAI';
import Proof from './components/Proof';
import AthleticArc from './components/AthleticArc';
import About from './components/About';
import Education from './components/Education';
import Philosophy from './components/Philosophy';
import Contact from './components/Contact';
import Footer from './components/Footer';
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
      site_version: 'v2.0',
    });
  }, []);
  useKonamiCode(useCallback(() => {
    setEasterEgg(true);
    window.posthog?.capture('konami_code_activated');
    setTimeout(() => setEasterEgg(false), 3000);
  }, []));

  useEffect(() => {
    const routeToSection: Record<string, string> = {
      '/': 'hero',
      '/about': 'origin',
      '/contact': 'contact',
    };

    const targetSectionId = routeToSection[window.location.pathname];
    if (!targetSectionId) return;

    const scrollToTarget = () => {
      const target = document.getElementById(targetSectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    };

    requestAnimationFrame(scrollToTarget);
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--ink-ground)', color: 'var(--bone)' }}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        <main id="main" className="main-content" tabIndex={-1}>
          {/* V2 — book-jacket newspaper-masthead hero on paper ground */}
          <HeroMasthead />

          {/* Page turn — paper → ink */}
          <div className="paper-to-ink-seam" aria-hidden="true" />

          {/* Chapter I — The Three Axes (disciplines) */}
          <DisciplineAxes />

          {/* Chapter II — Professional Experience (listed FIRST to firewall
              from passion project — Spectrum Reach + Northwestern Mutual) */}
          <ProfessionalExperience />

          {/* Chapter III — Passion Project: Blaze Sports Intel */}
          <PassionProjectBSI />

          {/* Chapter IV — Applied AI Practice */}
          <AppliedAI />

          <div className="section-divider" />

          {/* Published writing + speaking reel */}
          <Proof />

          <div className="section-divider" />

          {/* Photo plates — Athletic Arc */}
          <AthleticArc />

          {/* Origin narrative — Texas soil ritual, 127-year tradition, Blaze the dog */}
          <div className="origin-bridge-shell">
            <div className="section-seam" />
            <About />
          </div>

          {/* Academic foundation */}
          <Education />

          <div className="section-divider" />

          {/* Texas covenant — personal philosophy */}
          <Philosophy />

          {/* Closing cinematic break — last game silhouette */}
          <div className="relative h-48 md:h-64 overflow-hidden">
            <img
              src="/assets/optimized/last-game-silhouette-1024w.webp"
              srcSet="/assets/optimized/last-game-silhouette-640w.webp 640w, /assets/optimized/last-game-silhouette-1024w.webp 1024w"
              sizes="100vw"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-transparent to-midnight/80" />
          </div>

          {/* Contact channels + form */}
          <Contact />
        </main>
        <Footer />

        {/* Konami code Easter egg flash */}
        {easterEgg && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none animate-pulse">
            <div className="text-center">
              <p
                className="text-6xl md:text-8xl"
                style={{
                  fontFamily: 'Fraunces, Georgia, serif',
                  fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  color: 'var(--accent-burnt)',
                  textShadow: '0 0 40px rgba(191,87,0,0.5)',
                  letterSpacing: '-0.015em',
                }}
              >
                BSI
              </p>
              <p className="font-mono text-sm mt-2" style={{ color: 'var(--bone-mute)', letterSpacing: '0.22em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
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
