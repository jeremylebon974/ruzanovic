'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function EditorialIntro() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  const lines = [
    'Chaque pièce est une tension.',
    'Entre la rigueur de la structure',
    'et la liberté du mouvement.',
  ]

  return (
    <section
      ref={ref}
      className="py-28 md:py-44 px-6 md:px-20 lg:px-32 xl:px-48 bg-rz-white"
    >
      <div className="max-w-4xl">
        {/* Label */}
        <div className="overflow-clip mb-12">
          <motion.p
            className="font-mono text-rz-stone text-[0.6rem] tracking-[0.4em] uppercase"
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          >
            Ruzanovic — Maison de mode
          </motion.p>
        </div>

        {/* Main statement */}
        <div className="mb-16 space-y-1">
          {lines.map((line, i) => (
            <div key={i} className="overflow-clip">
              <motion.h2
                className="font-display text-rz-ink text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1]"
                style={{ fontStyle: i === 0 ? 'italic' : 'normal' }}
                initial={{ y: '110%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{
                  duration: 1.2,
                  delay: 0.1 + i * 0.12,
                  ease: [0.77, 0, 0.175, 1],
                }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-rz-ink/15 origin-left mb-12"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Corps de texte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.p
            className="font-body text-rz-stone text-sm leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            RUZANOVIC est une maison fondée sur la conviction que la mode peut
            simultanément porter une émotion brute et une précision artisanale.
            Chaque collection est pensée comme une installation — des silhouettes
            qui existent dans l&apos;espace, qui le redéfinissent.
          </motion.p>
          <motion.p
            className="font-body text-rz-stone text-sm leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            La collection Printemps–Été 2025 explore la perforation, la
            superposition et le contraste chromatique. Des matières architecturales
            rencontrent des accents de couleur signature. Un langage visuel
            immédiatement reconnaissable.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
