'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const pieces = [
  {
    id: 1,
    src: '/images/tenu-1.png',
    title: 'Look 01',
    subtitle: 'Perforated Jacket / Skirt / Fuchsia Gaiter',
    tag: 'SS25',
  },
  {
    id: 2,
    src: '/images/tenu-2.png',
    title: 'Look 02',
    subtitle: 'Perforated Vest / Wide Trousers / Orange Collar',
    tag: 'SS25',
  },
  {
    id: 3,
    src: '/images/tenu-3.png',
    title: 'Look 03',
    subtitle: 'Perforated Dress / Orange Drape / Neon Collar',
    tag: 'SS25',
  },
  {
    id: 4,
    src: '/images/tenu-4.png',
    title: 'Look 04',
    subtitle: 'Perforated Crop / Neon Cargo / Knit Hat',
    tag: 'SS25',
  },
  {
    id: 5,
    src: '/images/tenu-5.png',
    title: 'Look 05',
    subtitle: 'Orange Jacket / Ink-Printed Skirt',
    tag: 'SS25',
  },
  {
    id: 6,
    src: '/images/tenu-6.png',
    title: 'Look 06',
    subtitle: 'Neon Vest / Ivory Trousers / Perforated Gloves',
    tag: 'SS25',
  },
]

function CollectionCard({
  piece,
  index,
}: {
  piece: (typeof pieces)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.1,
        delay: (index % 3) * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Image wrapper */}
      <div className="img-hover relative bg-rz-cream mb-5">
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: '3/4' }}
        >
          <Image
            src={piece.src}
            alt={piece.title}
            fill
            className="image-editorial transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={90}
          />
        </div>

        {/* Tag numéro */}
        <div className="absolute top-4 left-4">
          <span className="font-mono text-rz-white/60 text-[0.55rem] tracking-[0.3em] uppercase">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="px-0">
        <p className="font-mono text-rz-stone text-[0.6rem] tracking-[0.25em] uppercase mb-1">
          {piece.tag}
        </p>
        <h3 className="font-display text-rz-ink text-xl font-light mb-1 italic">
          {piece.title}
        </h3>
        <p className="font-body text-rz-stone text-xs font-light leading-relaxed">
          {piece.subtitle}
        </p>
      </div>
    </motion.div>
  )
}

export default function CollectionSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' })

  return (
    <section id="collection" className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-rz-white">
      {/* Header */}
      <div ref={headerRef} className="mb-16 md:mb-24 max-w-xl">
        <div className="overflow-clip mb-4">
          <motion.p
            className="font-mono text-rz-stone text-[0.6rem] tracking-[0.4em] uppercase"
            initial={{ y: '110%' }}
            animate={headerInView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          >
            Collection complète
          </motion.p>
        </div>
        <div className="overflow-clip">
          <motion.h2
            className="font-display text-rz-ink text-5xl md:text-6xl font-light italic leading-[0.95]"
            initial={{ y: '110%' }}
            animate={headerInView ? { y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
          >
            Printemps—Été
          </motion.h2>
        </div>
        <div className="overflow-clip">
          <motion.h2
            className="font-display text-rz-ink text-5xl md:text-6xl font-light leading-[0.95]"
            initial={{ y: '110%' }}
            animate={headerInView ? { y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.18, ease: [0.77, 0, 0.175, 1] }}
          >
            2025
          </motion.h2>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 md:gap-y-24">
        {pieces.map((piece, i) => (
          <CollectionCard key={piece.id} piece={piece} index={i} />
        ))}
      </div>
    </section>
  )
}
