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
    if (words.length === 0) return

    const currentWord = words[wordIndex]
    const isWordFullyTyped = text === currentWord

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        if (isWordFullyTyped) {
          setIsDeleting(true)
          return
        }

        setText(currentWord.slice(0, text.length + 1))
        return
      }

      setText(currentWord.slice(0, text.length - 1))
      if (text.length === 0) {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    }, isDeleting ? deletingSpeed : isWordFullyTyped ? pauseDuration : typingSpeed)

    return () => {
      clearTimeout(timeout)
    }
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
