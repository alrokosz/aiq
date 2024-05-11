'use client'
import { motion } from 'framer-motion'

const HERO = ['Welcome', 'To', 'AIQ']

export default function HomePageHero() {
  return (
    <div className="bg-bg-main flex h-72 items-center justify-center">
      <h1 className="text-text-main inline-block text-5xl">
        {HERO.map((word, i) => {
          return (
            <motion.span
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 2, delay: i * 0.4 },
              }}
              key={word}
              className=""
            >
              {word}{' '}
            </motion.span>
          )
        })}
      </h1>
    </div>
  )
}
