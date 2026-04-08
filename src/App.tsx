import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useKonamiCode } from './hooks/useKonamiCode';
import { useScrollDepth } from './hooks/useScrollDepth';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Proof from './components/Proof';
import BSIShowcase from './components/BSIShowcase';
import InfraProof from './components/InfraProof';
import AthleticArc from './components/AthleticArc';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Currently from './components/Currently';
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
      <div className="min-h-screen bg-midnight text-bone">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        <main id="main" className="main-content" tabIndex={-1}>
          {/* Identity anchor — name, thesis, CTA */}
          <Hero />

          <div className="section-divider" />

          {/* What Austin builds — project cards with live badges */}
          <Projects />

          <div className="section-divider" />

          {/* Published writing + speaking reel — proof in public */}
          <Proof />

          <div className="section-divider" />

          {/* BSI platform deep-dive — stats, architecture, coverage */}
          <BSIShowcase />

          <div className="section-divider" />

          {/* Infrastructure proof — hard numbers, animated counters */}
          <InfraProof />

          <div className="section-divider" />

          {/* Photo break — athletic arc from Friday Night Lights to the Forty Acres */}
          <AthleticArc />

          {/* Origin narrative — warm seam from authority into biography */}
          <div className="origin-bridge-shell">
            <div className="section-seam" />
            <About />
          </div>

          {/* Career timeline */}
          <Experience />

          {/* Technical competencies */}
          <Skills />

          {/* Academic foundation */}
          <Education />

          <div className="section-divider" />

          {/* What Austin is building right now */}
          <Currently />

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
              <p className="font-sans font-bold text-6xl md:text-8xl text-burnt-orange uppercase tracking-wider" style={{ textShadow: '0 0 40px rgba(191,87,0,0.5)' }}>
                BSI
              </p>
              <p className="font-mono text-sm text-warm-gray mt-2">Born to Blaze the Path Beaten Less</p>
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
