import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../../utils/animations';

type Props = {
  numeral: string;
  title: ReactNode;
  kicker?: string;
};

export default function SectionBar({ numeral, title, kicker }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      className="section-bar"
    >
      <span className="section-bar__numeral">{numeral}</span>
      <h2 className="section-bar__title">{title}</h2>
      {kicker ? <span className="section-bar__kicker">{kicker}</span> : null}
    </motion.div>
  );
}
