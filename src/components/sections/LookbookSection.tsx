'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

export default function LookbookSection() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const inView1 = useInView(ref1, { once: true, margin: '-10%' })
  const inView2 = useInView(ref2, { once: true, margin: '-10%' })

  return (
    <section id="lookbook" className="bg-rz-white py-24 md:py-40 px-6 md:px-12">
      {/* Layout asymétrique - large + small */}
      <div ref={ref1} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-6 items-end">
          {/* Grande image */}
          <motion.div
            className="img-hover relative bg-rz-cream"
            initial={{ opacity: 0, y: 40 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/tenu-4.png"
                alt="Look 04"
                fill
                className="image-editorial transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 60vw"
                quality={90}
              />
            </div>
            {/* Caption superposée */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-rz-black/60 to-transparent">
              <p className="font-mono text-rz-white/60 text-[0.55rem] tracking-[0.3em] uppercase mb-1">Look 04</p>
              <p className="font-display text-rz-white text-xl font-light italic">
                Perforated Crop
              </p>
            </div>
          </motion.div>

          {/* Petite image + texte */}
          <div className="flex flex-col justify-end gap-6">
            <motion.div
              className="img-hover relative bg-rz-cream"
              initial={{ opacity: 0, y: 60 }}
              animate={inView1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <Image
                  src="/images/tenu-2.png"
                  alt="Look 02"
                  fill
                  className="image-editorial transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  quality={90}
                />
              </div>
            </motion.div>

            <motion.div
              className="pl-2"
              initial={{ opacity: 0 }}
              animate={inView1 ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p className="font-mono text-rz-stone text-[0.6rem] tracking-[0.3em] uppercase mb-3">Lookbook SS25</p>
              <p className="font-display text-rz-ink text-2xl md:text-3xl font-light italic leading-snug">
                Chaque look est une proposition. Un dialogue entre volume et vide.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2ème rangée - 3 colonnes */}
      <div
        ref={ref2}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
      >
        {[
          { src: '/images/tenu-1.png', label: 'Look 01' },
          { src: '/images/tenu-6.png', label: 'Look 06' },
          { src: '/images/tenu-5.png', label: 'Look 05' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="img-hover relative bg-rz-cream group"
            initial={{ opacity: 0, y: 40 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1.1,
              delay: i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: i === 1 ? '3/4' : '4/5' }}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="image-editorial transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={85}
              />
            </div>
            <div className="pt-3 px-1">
              <span className="font-mono text-rz-stone text-[0.55rem] tracking-[0.25em] uppercase">
                {item.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
