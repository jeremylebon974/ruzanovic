'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  { label: 'Collection', href: '#collection' },
  { label: 'Maison', href: '#maison' },
  { label: 'Lookbook', href: '#lookbook' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  const navBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10,10,10,0)', 'rgba(10,10,10,0.88)']
  )

  useEffect(() => {
    const unsub = scrollY.on('change', v => setScrolled(v > 50))
    return unsub
  }, [scrollY])

  return (
    <>
      {/* Desktop Nav */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] hidden md:flex items-center justify-between px-10 py-5"
        style={{ backgroundColor: navBg }}
      >
        <Link href="/">
          <div className="w-14 hover:opacity-70 transition-opacity duration-300">
            <Image
              src="/images/logo-white.png"
              alt="RUZANOVIC"
              width={120}
              height={160}
              className="w-full h-auto"
              priority
            />
          </div>
        </Link>

        <nav className="flex items-center gap-10">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="nav-link text-white/60 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </motion.header>

      <header className="fixed top-0 left-0 right-0 z-[100] md:hidden">
        <div
          className="flex items-center justify-between px-6 py-4 transition-all duration-500"
          style={{ background: scrolled ? 'rgba(10,10,10,0.88)' : 'transparent' }}
        >
          <Link href="/">
            <div className="w-10">
              <Image
                src="/images/logo-white.png"
                alt="RUZANOVIC"
                width={80}
                height={100}
                className="w-full h-auto"
              />
            </div>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] p-2"
            aria-label="Menu"
          >
            <motion.span className="block w-6 h-px bg-white"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }} />
            <motion.span className="block w-6 h-px bg-white"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }} />
            <motion.span className="block w-6 h-px bg-white"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }} />
          </button>
        </div>
      </header>

      <motion.div
        className="fixed inset-0 z-[99] bg-rz-black md:hidden flex flex-col"
        initial={false}
        animate={menuOpen ? { opacity: 1, pointerEvents: 'all' } : { opacity: 0, pointerEvents: 'none' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {navLinks.map((link, i) => (
            <motion.div key={link.label} initial={false}
              animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: menuOpen ? i * 0.08 : 0 }}>
              <Link href={link.href} onClick={() => setMenuOpen(false)}
                className="font-display text-white text-4xl font-light italic">
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="pb-12 px-10 flex justify-between">
          <span className="font-mono text-white/30 text-[0.6rem] tracking-widest uppercase">Paris, FR</span>
          <span className="font-mono text-white/30 text-[0.6rem] tracking-widest uppercase">SS 2025</span>
        </div>
      </motion.div>
    </>
  )
}