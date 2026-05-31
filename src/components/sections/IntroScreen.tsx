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
    // Phase 1: Show logo
    const t1 = setTimeout(() => setPhase('logo'), 600)
    // Phase 2: Begin exit
    const t2 = setTimeout(() => setPhase('exit'), 3000)
    // Phase 3: Complete
    const t3 = setTimeout(() => onComplete(), 4200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          className="fixed inset-0 z-[9999] bg-rz-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background editorial images - slow Ken Burns */}
          <motion.div
            className="absolute inset-0 opacity-20"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 4, ease: 'easeOut' }}
          >
            <Image
              src="/images/tenu-6.png"
              alt=""
              fill
              className="object-cover object-top"
              priority
            />
          </motion.div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-rz-black/80" />

          {/* Logo centré */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={phase === 'logo' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Logo mark - monogramme blanc */}
            <div className="w-28 md:w-36 relative">
              <Image
                src="/images/logo.jpg"
                alt="RUZANOVIC"
                width={200}
                height={260}
                className="w-full h-auto invert"
                priority
              />
            </div>

            {/* Ligne fine */}
            <motion.div
              className="w-px bg-rz-warm/40"
              initial={{ height: 0 }}
              animate={phase === 'logo' ? { height: 32 } : { height: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Tagline */}
            <motion.p
              className="text-rz-warm/50 font-mono text-[0.6rem] tracking-[0.4em] uppercase"
              initial={{ opacity: 0 }}
              animate={phase === 'logo' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Collection 2025
            </motion.p>
          </motion.div>

          {/* Coin bas gauche */}
          <motion.div
            className="absolute bottom-8 left-8 text-rz-warm/30 font-mono text-[0.55rem] tracking-[0.25em] uppercase"
            initial={{ opacity: 0 }}
            animate={phase === 'logo' ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Paris, France
          </motion.div>

          {/* Coin bas droit */}
          <motion.div
            className="absolute bottom-8 right-8 text-rz-warm/30 font-mono text-[0.55rem] tracking-[0.25em] uppercase"
            initial={{ opacity: 0 }}
            animate={phase === 'logo' ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            SS 25
          </motion.div>
        </motion.div>
      ) : (
        /* Panneau de sortie - sweep */
        <motion.div
          key="exit-panel"
          className="fixed inset-0 z-[9998] bg-rz-black origin-top"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
        />
      )}
    </AnimatePresence>
  )
}
