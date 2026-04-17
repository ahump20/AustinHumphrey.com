import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import SectionBar from './primitives/SectionBar';
import SectionStamp from './primitives/SectionStamp';
import StatCallout from './primitives/StatCallout';

const AI_PATTERNS = [
  {
    label: 'Agentic Workflows',
    desc: 'Claude Code sub-agents, skill systems, slash commands, MCP integration for sports intelligence data pipelines.',
  },
  {
    label: 'Editorial Pipelines',
    desc: 'Draft → audit → polish loops. Voice-profile prompts that enforce cadence, vocabulary, and scoring rubrics.',
  },
  {
    label: 'Forecasting Modules',
    desc: 'LLM-in-the-loop sports projections grounded in real-time data. Scoped output, source transparency.',
  },
  {
    label: 'Prompt Systems',
    desc: 'Reusable voice profiles, scoring rubrics, instruction hierarchies — codified so the work is repeatable.',
  },
];

export default function AppliedAI() {
  return (
    <section
      id="ai-practice"
      aria-labelledby="ai-heading"
      className="ink-ground"
    >
      <SectionBar
        numeral="Chapter IV"
        title={<>Applied <em>AI Practice</em></>}
        kicker="Two Years Hands-On · Not Demos"
      />

      <div className="ed-section ed-container">
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <SectionStamp variant="solid" withDot>Claude</SectionStamp>
          <SectionStamp variant="outline">Gemini</SectionStamp>
          <SectionStamp variant="outline">ChatGPT</SectionStamp>
          <SectionStamp variant="outline">McCombs AI/ML (In Progress)</SectionStamp>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          id="ai-heading"
          className="mb-5"
          style={{
            fontFamily: 'Fraunces, Georgia, serif',
            fontVariationSettings: '"opsz" 72, "SOFT" 30',
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
            color: 'var(--bone)',
            maxWidth: '22ch',
          }}
        >
          Deployed systems, not demos.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="ed-body mb-10"
          style={{ color: 'var(--bone-mute)', maxWidth: '62ch' }}
        >
          Two years of hands-on work with Claude, Gemini, and ChatGPT —
          building sports data ingestion pipelines, editorial workflows, and
          agentic prompting patterns that actually run in production. Formal
          grounding via UT Austin McCombs AI/ML postgraduate coursework (in
          progress). The work matters more than the stack; the stack matters
          because it ships results.
        </motion.p>

        <div
          className="grid grid-cols-3 gap-6 mb-12 py-8"
          style={{
            borderTop: '1px solid var(--ink-ground-margin)',
            borderBottom: '1px solid var(--ink-ground-margin)',
          }}
        >
          <StatCallout value="2" label="Years Hands-On" variant="burnt" />
          <StatCallout value="3" label="Primary Stacks" variant="burnt" />
          <StatCallout value="MCP" label="Agent Protocol" variant="emerald" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {AI_PATTERNS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.05 * i, ease: EASE_OUT_EXPO }}
              className="axis-card"
              style={{ padding: '1.5rem 1.5rem 1.75rem' }}
            >
              <p className="axis-card__numeral">Pattern {String(i + 1).padStart(2, '0')}</p>
              <h4 className="axis-card__title" style={{ fontSize: '1.25rem' }}>
                {p.label}
              </h4>
              <p className="axis-card__desc" style={{ fontSize: '0.95rem' }}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
