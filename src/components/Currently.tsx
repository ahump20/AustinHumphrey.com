import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animations';

const CURRENT_WORK = [
  {
    label: 'Studying',
    detail: 'AI & Machine Learning — UT Austin McCombs, Apr 2026 cohort',
  },
  {
    label: 'Building',
    detail: 'Real-time WebSocket scores with Durable Objects across six leagues',
  },
  {
    label: 'Publishing',
    detail: 'Weekly podcast + conference editorial on college baseball',
  },
  {
    label: 'Shipping',
    detail: 'Park-adjusted sabermetrics recomputed every 6 hours for 330 programs',
  },
];

export default function Currently() {
  return (
    <section
      id="currently"
      aria-label="What Austin is working on now"
      className="section-padding section-border"
    >
      <div className="container-custom max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem}>
            <p className="section-label">// Right Now</p>
            <h2 className="section-title">Currently</h2>
          </motion.div>

          <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
            {CURRENT_WORK.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 py-3 px-2 -mx-2 rounded-sm border-b border-bone/5 last:border-0 hover:bg-bone/[0.02] transition-colors duration-300"
              >
                <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-burnt-orange mt-1 w-20 flex items-center gap-1.5">
                  {item.label}
                  <span className="w-1 h-1 rounded-full bg-burnt-orange/50 animate-pulse" />
                </span>
                <p className="text-sm text-bone/80 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
