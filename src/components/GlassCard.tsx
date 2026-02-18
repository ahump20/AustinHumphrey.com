import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  hover?: boolean
  glowColor?: string
}

export default function GlassCard({
  children,
  className,
  style,
  hover = true,
  glowColor = 'rgba(191, 87, 0, 0.15)',
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass-card ${className || ''}`}
      style={{
        background: 'rgba(26, 26, 26, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(191, 87, 0, 0.12)',
        borderRadius: '12px',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      whileHover={
        hover
          ? {
              border: '1px solid rgba(191, 87, 0, 0.35)',
              boxShadow: `0 8px 32px ${glowColor}`,
              y: -4,
            }
          : undefined
      }
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
