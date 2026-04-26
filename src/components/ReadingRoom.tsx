import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import { READING_ROOM } from '../content/site';
import SectionBar from './primitives/SectionBar';

export default function ReadingRoom() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lead = READING_ROOM.find((p) => p.featured) ?? READING_ROOM[0];
  const rest = READING_ROOM.filter((p) => p !== lead);

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
    window.posthog?.capture('speaking_reel_played');
  };

  return (
    <section
      id="reading-room"
      aria-labelledby="reading-heading"
      className="paper-ground"
    >
      <SectionBar
        numeral="Chapter IV"
        title={<>The Reading <em>Room</em></>}
        kicker="Writing · Speaking · The Podcast"
      />

      <div className="ed-section ed-container">
        <motion.p
          id="reading-heading"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="ed-lede mb-12"
          style={{ color: 'var(--ink-mute)', maxWidth: '60ch' }}
        >
          The work argued in public — published, spoken, and shipped. Not a
          pitch deck. Not a prototype. Real editorial with real positions,
          available for anyone willing to read the tape.
        </motion.p>

        {/* Featured piece */}
        <motion.a
          href={lead.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => window.posthog?.capture('editorial_clicked', { title: lead.title, position: 'feature' })}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="reading-feature ed-focus"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div>
            <span className="reading-feature__tag">{lead.tag}</span>
            <p
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.66rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--ink-mute)',
                marginTop: '0.5rem',
              }}
            >
              Read the feature · {lead.readTime}
            </p>
          </div>
          <div>
            <h3 className="reading-feature__title">{lead.title}</h3>
            <p className="reading-feature__excerpt">{lead.excerpt}</p>
            <p className="reading-feature__meta">
              <span style={{ color: 'var(--accent-burnt)' }}>Open the piece</span>
              <span aria-hidden>→</span>
            </p>
          </div>
        </motion.a>

        {/* Rest of the issue */}
        <div className="mt-12 mb-16">
          <p className="cv-column__heading mb-3">More from this issue</p>
          {rest.map((piece, i) => (
            <motion.a
              key={piece.title}
              href={piece.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.posthog?.capture('editorial_clicked', { title: piece.title, position: 'list' })}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.05 * i, ease: EASE_OUT_EXPO }}
              className="reading-row ed-focus"
            >
              <span className="reading-row__numeral">
                {String(i + 2).padStart(2, '0')}
              </span>
              <span>
                <span className="reading-row__title">{piece.title}</span>
                <span className="reading-row__excerpt block">{piece.excerpt}</span>
              </span>
              <span className="reading-row__meta">
                {piece.tag}
                <br />
                {piece.readTime}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Speaking reel + podcast — two-up */}
        <div className="grid gap-8 lg:grid-cols-2 mt-16 pt-12" style={{ borderTop: '1px solid var(--margin-rule)' }}>

          {/* Speaking */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            <p className="cv-column__heading">On Camera</p>
            <h3
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontVariationSettings: '"opsz" 48, "SOFT" 30',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 500,
                color: 'var(--ink-strong)',
                lineHeight: 1.1,
                marginBottom: '1rem',
                letterSpacing: '-0.012em',
              }}
            >
              Talking Sports — <em style={{ color: 'var(--accent-burnt)' }}>The Analytical Lens</em>
            </h3>
            <p
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontVariationSettings: '"opsz" 14',
                fontSize: '0.95rem',
                lineHeight: 1.55,
                color: 'var(--ink-mute)',
                marginBottom: '1.25rem',
                maxWidth: '48ch',
              }}
            >
              The same argument, spoken instead of typed — credibility is how the thinking sounds when the notes are gone.
            </p>

            <div className="reel-frame">
              <video
                ref={videoRef}
                controls={playing}
                preload="metadata"
                playsInline
                poster="/assets/optimized/speaking-poster-640w.webp"
                aria-label="Talking Sports — The Analytical Lens"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onPlay={() => setPlaying(true)}
              >
                <source src="/assets/austin-speaking-sports.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {!playing && (
                <button onClick={handlePlay} className="reel-play ed-focus" aria-label="Play speaking reel">
                  <span className="reel-play__pip">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              )}

              <div className="reel-frame__caption">
                <span>Speaking Reel</span>
                <span>Proof in motion</span>
              </div>
            </div>
          </motion.div>

          {/* Podcast */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="flex flex-col"
          >
            <p className="cv-column__heading">Weekly Audio</p>
            <h3
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontVariationSettings: '"opsz" 48, "SOFT" 30',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 500,
                color: 'var(--ink-strong)',
                lineHeight: 1.1,
                marginBottom: '1rem',
                letterSpacing: '-0.012em',
              }}
            >
              The BSI <em style={{ color: 'var(--accent-burnt)' }}>Weekly Podcast</em>
            </h3>
            <p
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontVariationSettings: '"opsz" 14',
                fontSize: '0.95rem',
                lineHeight: 1.55,
                color: 'var(--ink-mute)',
                marginBottom: '1.25rem',
                maxWidth: '48ch',
              }}
            >
              AI-generated deep dives on college baseball, every week. Built with NotebookLM. The argument compresses into a conversation between two voices reading the same evidence.
            </p>

            <a
              href="https://blazesportsintel.com/podcast/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.posthog?.capture('podcast_cta_clicked')}
              className="btn-editorial ed-focus mt-auto"
              style={{ color: 'var(--ink)', alignSelf: 'flex-start' }}
            >
              Listen to the latest
              <span aria-hidden style={{ marginLeft: 2 }}>↗</span>
            </a>
          </motion.div>
        </div>

        {/* Master archive link */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="mt-12 pt-8"
          style={{ borderTop: '1px solid var(--margin-rule)' }}
        >
          <a
            href="https://blazesportsintel.com/blog-post-feed"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => window.posthog?.capture('view_all_writing_clicked')}
            className="btn-editorial ed-focus"
            style={{ color: 'var(--ink)' }}
          >
            View the full archive
            <span aria-hidden style={{ marginLeft: 2 }}>↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
