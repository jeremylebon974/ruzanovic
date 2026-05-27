'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function EditorialFeature() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const textInView = useInView(textRef, { once: true, margin: '-15%' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      id="maison"
      ref={sectionRef}
      className="relative overflow-hidden bg-rz-black"
      style={{ minHeight: '90vh' }}
    >
      {/* Background image avec parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="/images/tenu-5.png"
          alt="RUZANOVIC Editorial"
          fill
          className="object-cover object-[center_30%]"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rz-black/80 via-rz-black/40 to-transparent" />
        <div className="absolute inset-0 bg-rz-black/25" />
      </motion.div>

      {/* Contenu texte */}
      <div
        ref={textRef}
        className="relative z-10 flex items-end min-h-[90vh] pb-16 md:pb-24 px-6 md:px-16"
      >
        <div className="max-w-2xl">
          {/* Accent line */}
          <motion.div
            className="h-px bg-rz-orange mb-8 origin-left"
            initial={{ scaleX: 0 }}
            animate={textInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: 60 }}
          />

          <div className="overflow-clip mb-2">
            <motion.p
              className="font-mono text-rz-white/50 text-[0.6rem] tracking-[0.4em] uppercase"
              initial={{ y: '110%' }}
              animate={textInView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
            >
              La Maison
            </motion.p>
          </div>

          <div className="overflow-clip mb-1">
            <motion.h2
              className="font-display text-rz-white text-5xl md:text-6xl lg:text-7xl font-light italic leading-[0.95]"
              initial={{ y: '110%' }}
              animate={textInView ? { y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
            >
              Couleur comme
            </motion.h2>
          </div>
          <div className="overflow-clip mb-10">
            <motion.h2
              className="font-display text-rz-white text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95]"
              initial={{ y: '110%' }}
              animate={textInView ? { y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
            >
              manifeste.
            </motion.h2>
          </div>

          <motion.p
            className="font-body text-rz-white/60 text-sm leading-relaxed font-light max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            L&apos;orange, le fluo, le fuchsia — trois accents chromatiques
            qui signent chaque silhouette. Ils ne décorent pas la pièce.
            Ils en sont la raison d&apos;être.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
