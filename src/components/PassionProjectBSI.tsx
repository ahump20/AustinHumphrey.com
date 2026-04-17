import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import SectionBar from './primitives/SectionBar';
import SectionStamp from './primitives/SectionStamp';
import StatCallout from './primitives/StatCallout';

export default function PassionProjectBSI() {
  return (
    <section
      id="bsi"
      aria-labelledby="bsi-heading"
      className="ink-ground"
    >
      <SectionBar
        numeral="Chapter III"
        title={<>Passion Project · <em>Blaze Sports Intel</em></>}
        kicker="Solo Build · 2023 – Present"
      />

      <div className="ed-section ed-container">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <SectionStamp variant="solid" withDot>Passion Project</SectionStamp>
          <SectionStamp variant="outline">Active Build</SectionStamp>
          <SectionStamp variant="outline">Not a Company</SectionStamp>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          id="bsi-heading"
          className="mb-5"
          style={{
            fontFamily: 'Fraunces, Georgia, serif',
            fontVariationSettings: '"opsz" 72, "SOFT" 30',
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
            color: 'var(--bone)',
            maxWidth: '24ch',
          }}
        >
          Sports intelligence for the markets the coverage gap leaves behind.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="ed-body mb-8"
          style={{ color: 'var(--bone-mute)', maxWidth: '62ch' }}
        >
          Blaze Sports Intel is a passion project — a sports intelligence
          platform built and maintained solo on Cloudflare since 2023. Live
          scores, park-adjusted sabermetrics, and original editorial across
          MLB, NFL, NCAA football, NBA, and Division I college baseball. It
          covers the athletes, programs, and markets that mainstream media
          reliably skips. Not a founded company. Not a startup. A working
          demonstration of what the three disciplines above produce when they
          meet real data and real deadlines.
        </motion.p>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 mb-10"
          style={{
            borderTop: '1px solid var(--ink-ground-margin)',
            borderBottom: '1px solid var(--ink-ground-margin)',
          }}
        >
          <StatCallout value="5" label="Leagues Covered" variant="burnt" />
          <StatCallout value="2023" label="Year Started" variant="burnt" />
          <StatCallout value="Solo" label="Team Size" variant="emerald" />
          <StatCallout value="CF" label="Stack · Cloudflare" variant="burnt" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://blazesportsintel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial-solid ed-focus"
            onClick={() => window.posthog?.capture('bsi_cta_clicked', { cta: 'visit_platform' })}
          >
            Visit the Platform
            <span aria-hidden style={{ marginLeft: 2 }}>↗</span>
          </a>
          <a
            href="https://github.com/Blaze-sports-Intel/bsi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial ed-focus"
            style={{ color: 'var(--bone)' }}
            onClick={() => window.posthog?.capture('bsi_cta_clicked', { cta: 'github' })}
          >
            Source on GitHub
            <span aria-hidden style={{ marginLeft: 2 }}>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
