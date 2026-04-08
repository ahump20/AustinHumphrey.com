import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animations';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

const INFRA_STATS = [
  { value: 18, label: 'Edge Workers', suffix: '' },
  { value: 12, label: 'Databases', suffix: '' },
  { value: 45, label: 'KV Stores', suffix: '' },
  { value: 40, label: 'API Routes', suffix: '+' },
  { value: 662, label: 'Tests Passing', suffix: '' },
  { value: 15, label: 'Second Updates', suffix: 's' },
] as const;

function InfraStat({ value, label, suffix }: { value: number; label: string; suffix: string }) {
  const [ref, displayValue] = useAnimatedCounter(value, 1400);

  return (
    <div className="text-center" ref={ref as React.RefObject<HTMLDivElement>}>
      <p className="font-sans font-bold text-bone leading-none infra-stat-value">
        {displayValue}
        <span className="text-burnt-orange">{suffix}</span>
      </p>
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-warm-gray mt-3">
        {label}
      </p>
    </div>
  );
}

export default function InfraProof() {
  return (
    <section
      id="infrastructure"
      aria-label="Platform infrastructure"
      className="section-padding relative"
      style={{ background: 'var(--surface-deep)' }}
    >
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem} className="text-center mb-12">
            <p className="section-label">// Under the Hood</p>
            <h2 className="section-title">What One Person Built</h2>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6"
          >
            {INFRA_STATS.map((stat) => (
              <InfraStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
              />
            ))}
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="text-center text-warm-gray/60 text-sm font-mono mt-10 max-w-2xl mx-auto"
          >
            All infrastructure on Cloudflare. No AWS. No Vercel. No external databases.
            One constraint that forces simplicity.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
