import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypewriterProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
}

export default function Typewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  className,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1))
          if (text.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration)
          }
        } else {
          setText(currentWord.slice(0, text.length - 1))
          if (text.length === 0) {
            setIsDeleting(false)
            setWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={className}>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        style={{ color: 'var(--burnt-orange)' }}
      >
        |
      </motion.span>
    </span>
  )
}
