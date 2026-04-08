import { lazy, Suspense, useEffect } from 'react';
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
import Education from './components/Education';
import Currently from './components/Currently';
import Philosophy from './components/Philosophy';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const AIChatWidget = lazy(() => import('./components/AIChatWidget'));

function App() {
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

          {/* Photo break — athletic arc from Friday Night Lights to the Forty Acres */}
          <AthleticArc />

          {/* Origin narrative — warm seam from authority into biography */}
          <div className="origin-bridge-shell">
            <div className="section-seam" />
            <About />
          </div>

          {/* Career timeline */}
          <Experience />

          {/* Academic foundation */}
          <Education />

          <div className="section-divider" />

          {/* What Austin is building right now */}
          <Currently />

          {/* Texas covenant — personal philosophy */}
          <Philosophy />

          {/* Contact channels + form */}
          <Contact />
        </main>
        <Footer />

        <ScrollToTop />
        <Suspense fallback={null}>
          <AIChatWidget />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
