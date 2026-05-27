'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 md:py-48 px-6 md:px-16 bg-rz-ink"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Étiquette */}
        <div className="overflow-clip mb-12">
          <motion.p
            className="font-mono text-rz-white/30 text-[0.6rem] tracking-[0.45em] uppercase"
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          >
            Prise de contact
          </motion.p>
        </div>

        {/* Headline */}
        <div className="overflow-clip mb-3">
          <motion.h2
            className="font-display text-rz-white text-5xl md:text-6xl lg:text-7xl font-light italic leading-[0.95]"
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
          >
            Travaillons
          </motion.h2>
        </div>
        <div className="overflow-clip mb-14">
          <motion.h2
            className="font-display text-rz-white text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95]"
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
          >
            ensemble.
          </motion.h2>
        </div>

        {/* CTA email */}
        <motion.a
          href="mailto:contact@ruzanovic.com"
          className="group inline-flex items-center gap-4 font-mono text-rz-white/60 hover:text-rz-white text-sm tracking-[0.2em] uppercase transition-colors duration-500"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <span className="h-px bg-current w-8 transition-all duration-500 group-hover:w-14" />
          contact@ruzanovic.com
          <span className="h-px bg-current w-8 transition-all duration-500 group-hover:w-14" />
        </motion.a>

        {/* Séparateur */}
        <motion.div
          className="h-px bg-rz-white/10 my-16"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Socials */}
        <motion.div
          className="flex justify-center gap-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.1 }}
        >
          {['Instagram', 'Mailing list'].map(link => (
            <a
              key={link}
              href="#"
              className="nav-link text-rz-white/40 hover:text-rz-white/80 transition-colors duration-500"
            >
              {link}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
