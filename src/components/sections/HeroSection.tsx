'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] overflow-hidden bg-rz-black"
    >
      {/* Image principale avec parallax */}
      <motion.div
        className="absolute inset-0 scale-105"
        style={{ y: imageY }}
      >
        <Image
          src="/images/tenu-3.png"
          alt="RUZANOVIC SS25"
          fill
          className="object-cover object-[center_20%]"
          priority
          quality={95}
        />
        {/* Overlay éditorial */}
        <div className="absolute inset-0 bg-gradient-to-b from-rz-black/30 via-transparent to-rz-black/60" />
        <div className="absolute inset-0 bg-rz-black/15" />
      </motion.div>

      {/* Contenu hero */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end pb-14 md:pb-20 px-6 md:px-16"
        style={{ y: textY, opacity }}
      >
        {/* Saison */}
        <motion.div
          className="overflow-clip mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.p
            className="font-mono text-rz-white/50 text-[0.6rem] tracking-[0.45em] uppercase"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
          >
            Printemps — Été 2025
          </motion.p>
        </motion.div>

        {/* Titre principal */}
        <div className="overflow-clip mb-2">
          <motion.h1
            className="font-display text-rz-white text-[13vw] md:text-[8vw] lg:text-[7vw] font-light leading-[0.9] italic"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.77, 0, 0.175, 1] }}
          >
            Architecture
          </motion.h1>
        </div>

        <div className="overflow-clip mb-10 md:mb-14">
          <motion.h1
            className="font-display text-rz-white text-[13vw] md:text-[8vw] lg:text-[7vw] font-light leading-[0.9]"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, delay: 0.62, ease: [0.77, 0, 0.175, 1] }}
          >
            Textile
          </motion.h1>
        </div>

        {/* CTA + ligne */}
        <div className="flex items-center gap-8">
          <motion.div
            className="h-px bg-rz-white/40 flex-1 max-w-[60px] md:max-w-[80px] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.a
            href="#collection"
            className="font-mono text-rz-white/70 hover:text-rz-white text-[0.65rem] tracking-[0.3em] uppercase transition-colors duration-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Découvrir la collection
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 right-8 md:right-16 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{ opacity }}
      >
        <span className="font-mono text-rz-white/40 text-[0.55rem] tracking-[0.3em] uppercase [writing-mode:vertical-lr]">
          Scroll
        </span>
        <motion.div
          className="w-px bg-rz-white/40 origin-top"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ height: 40 }}
        />
      </motion.div>
    </section>
  )
}
