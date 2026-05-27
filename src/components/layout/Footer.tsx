import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-rz-ink py-10 px-6 md:px-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/">
          <div className="w-10 opacity-50 hover:opacity-80 transition-opacity duration-300">
            <Image
              src="/images/logo.jpg"
              alt="RUZANOVIC"
              width={80}
              height={100}
              className="w-full h-auto invert"
            />
          </div>
        </Link>

        {/* Copyright */}
        <p className="font-mono text-rz-white/25 text-[0.55rem] tracking-[0.25em] uppercase text-center">
          © {new Date().getFullYear()} Ruzanovic. Tous droits réservés.
        </p>

        {/* Links */}
        <div className="flex gap-6">
          <a href="#" className="font-mono text-rz-white/30 hover:text-rz-white/60 text-[0.55rem] tracking-[0.2em] uppercase transition-colors duration-300">
            Mentions légales
          </a>
          <a href="#" className="font-mono text-rz-white/30 hover:text-rz-white/60 text-[0.55rem] tracking-[0.2em] uppercase transition-colors duration-300">
            Confidentialité
          </a>
        </div>
      </div>
    </footer>
  )
}
