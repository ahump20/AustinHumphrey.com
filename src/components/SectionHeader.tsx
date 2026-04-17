import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { EASE_OUT_EXPO } from '../utils/animations';

type Tone = 'paper' | 'ink';

type Props = {
  /** Roman numeral or word — e.g. "Chapter I", "Appendix", "Colophon" */
  numeral: string;
  /** Main section title — rendered in Fraunces display */
  title: ReactNode;
  /** Optional kicker deck above the title */
  kicker?: string;
  /** Optional dek below title — short editorial line */
  dek?: string;
  /** Paper or ink ground — affects text + rule tone */
  tone?: Tone;
  /** Extra classes for outer wrapper */
  className?: string;
};

export default function SectionHeader({
  numeral,
  title,
  kicker,
  dek,
  tone = 'ink',
  className = '',
}: Props) {
  const titleColor = tone === 'paper' ? 'var(--ink-strong)' : 'var(--bone)';
  const dekColor = tone === 'paper' ? 'var(--ink-mute)' : 'var(--bone-mute)';

  return (
    <header className={`mb-12 md:mb-16 ${className}`}>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="chapter-numeral"
      >
        {numeral}
      </motion.p>

      {kicker ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="ed-mono mb-3"
          style={{ color: dekColor }}
        >
          {kicker}
        </motion.p>
      ) : null}

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.18, ease: EASE_OUT_EXPO }}
        className="ed-h1 mb-3"
        style={{
          color: titleColor,
          letterSpacing: '-0.02em',
          fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
        }}
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, delay: 0.3, ease: EASE_OUT_EXPO }}
        className="chapter-rule"
        style={{ transformOrigin: 'left' }}
      />

      {dek ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT_EXPO }}
          className="ed-lede"
          style={{ color: dekColor, maxWidth: '48ch' }}
        >
          {dek}
        </motion.p>
      ) : null}
    </header>
  );
}
