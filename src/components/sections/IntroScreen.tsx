'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface IntroScreenProps {
  onComplete: () => void
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState<'enter' | 'logo' | 'exit'>('enter')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('logo'), 300)
    const t2 = setTimeout(() => setPhase('exit'), 3400)
    const t3 = setTimeout(() => onComplete(), 4400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#080808] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Image background très sombre */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.18 }}
            transition={{ duration: 3.5, ease: 'easeOut' }}
          >
            <Image src="/images/tenu-1.png" alt="" fill
              className="object-cover object-top" priority />
          </motion.div>
          <div className="absolute inset-0 bg-[#080808]/70" />

          {/* Contenu centré */}
          <div className="relative z-10 flex flex-col items-center">

            {/* Monogramme — PNG blanc sans fond */}
            <motion.div
              className="w-20 md:w-24 mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={phase === 'logo' ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/logo-white.png"
                alt="RUZANOVIC"
                width={160}
                height={210}
                className="w-full h-auto"
                priority
              />
            </motion.div>

            {/* Ligne fine */}
            <motion.div
              className="bg-white/20 mb-8"
              initial={{ height: 0, opacity: 0 }}
              animate={phase === 'logo' ? { height: 40, opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              style={{ width: 1 }}
            />

            {/* RUZANOVIC en grand */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                className="font-display font-light text-white tracking-[0.3em] uppercase"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                initial={{ y: '110%' }}
                animate={phase === 'logo' ? { y: 0 } : { y: '-110%' }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.77, 0, 0.175, 1] }}
              >
                Ruzanovic
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              className="font-mono text-white/35 text-[0.58rem] tracking-[0.45em] uppercase"
              initial={{ opacity: 0 }}
              animate={phase === 'logo' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Collection Printemps — Été 2025
            </motion.p>
          </div>

          {/* Coins */}
          <motion.span
            className="absolute bottom-8 left-10 font-mono text-white/20 text-[0.52rem] tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={phase === 'logo' ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >Paris, France</motion.span>
          <motion.span
            className="absolute bottom-8 right-10 font-mono text-white/20 text-[0.52rem] tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={phase === 'logo' ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
          >SS 25</motion.span>
        </motion.div>
      ) : (
        <motion.div
          key="exit"
          className="fixed inset-0 z-[9998] bg-[#080808] origin-top"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
        />
      )}
    </AnimatePresence>
  )
}