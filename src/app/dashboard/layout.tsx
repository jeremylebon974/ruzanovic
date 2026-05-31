'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const nav = [
  { label: "Vue d'ensemble", href: '/dashboard', icon: '▦' },
  { label: 'Produits', href: '/dashboard/produits', icon: '◈' },
  { label: 'Commandes', href: '/dashboard/commandes', icon: '◎' },
  { label: 'Clients', href: '/dashboard/clients', icon: '◉' },
  { label: 'Médias', href: '/dashboard/medias', icon: '◫' },
  { label: 'Newsletter', href: '/dashboard/newsletter', icon: '◻' },
  { label: 'Équipe', href: '/dashboard/equipe', icon: '◈' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-[#f5f2ee] overflow-hidden">
      <aside className={`${collapsed ? 'w-16' : 'w-56'} bg-[#0a0a0a] flex flex-col transition-all duration-300 flex-shrink-0`}>
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/5">
          {!collapsed && (
            <div className="w-10" style={{ mixBlendMode: 'screen' }}>
              <Image src="/images/logo-white.png" alt="RUZANOVIC" width={80} height={100} className="w-full h-auto" />
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="text-white/30 hover:text-white text-xs ml-auto">
            {collapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1">
          {nav.map(item => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-xs tracking-wider uppercase transition-all duration-200 ${
                  active ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}>
                <span className="text-base flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="font-light tracking-[0.12em]">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/5">
          <Link href="/" className={`text-white/25 hover:text-white/50 text-[0.6rem] tracking-widest uppercase transition-colors ${collapsed ? 'hidden' : 'block'}`}>
            ← Retour au site
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}