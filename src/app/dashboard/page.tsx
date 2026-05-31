'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const [stats, setStats] = useState({ commandes: 0, revenus: 0, clients: 0, produits: 0, newsletter: 0 })
  const [loading, setLoading] = useState(true)
  const [recents, setRecents] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      try {
        const [cmd, clients, produits, news] = await Promise.all([
          supabase.from('commandes').select('total'),
          supabase.from('clients').select('id', { count: 'exact' }),
          supabase.from('produits').select('id', { count: 'exact' }).eq('actif', true),
          supabase.from('newsletter').select('id', { count: 'exact' }).eq('actif', true),
        ])
        const revenus = (cmd.data || []).reduce((s: number, c: any) => s + (c.total || 0), 0)
        setStats({ commandes: cmd.data?.length || 0, revenus, clients: clients.count || 0, produits: produits.count || 0, newsletter: news.count || 0 })
        const r = await supabase.from('commandes').select('*').order('created_at', { ascending: false }).limit(5)
        setRecents(r.data || [])
      } finally { setLoading(false) }
    }
    load()
  }, [])

  const cards = [
    { label: 'Commandes', value: stats.commandes, suffix: '', color: '#e84c1e' },
    { label: 'Revenus', value: stats.revenus, suffix: '€', color: '#d4f000' },
    { label: 'Clients', value: stats.clients, suffix: '', color: '#e8006a' },
    { label: 'Produits actifs', value: stats.produits, suffix: '', color: '#0a0a0a' },
    { label: 'Abonnés', value: stats.newsletter, suffix: '', color: '#8a8580' },
  ]

  return (
    <div className="p-8">
      <div className="mb-10">
        <p className="font-mono text-[0.6rem] text-[#8a8580] tracking-[0.35em] uppercase mb-2">Dashboard</p>
        <h1 className="font-display text-4xl font-light italic text-[#0a0a0a]">Vue d'ensemble</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {cards.map(c => (
          <div key={c.label} className="bg-white rounded p-5 border border-[#0a0a0a]/5">
            <div className="w-2 h-2 rounded-full mb-4" style={{ background: c.color }} />
            <p className="font-mono text-[0.55rem] text-[#8a8580] tracking-[0.25em] uppercase mb-2">{c.label}</p>
            <p className="font-display text-3xl font-light text-[#0a0a0a]">
              {loading ? '—' : `${c.value}${c.suffix}`}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded border border-[#0a0a0a]/5">
        <div className="px-6 py-4 border-b border-[#0a0a0a]/5 flex items-center justify-between">
          <p className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-[#0a0a0a]">Commandes récentes</p>
          <a href="/dashboard/commandes" className="font-mono text-[0.55rem] tracking-widest uppercase text-[#8a8580] hover:text-[#0a0a0a]">Voir tout →</a>
        </div>
        {loading ? (
          <div className="px-6 py-8 text-center font-mono text-[0.6rem] text-[#8a8580] tracking-widest">Chargement...</div>
        ) : recents.length === 0 ? (
          <div className="px-6 py-8 text-center font-mono text-[0.6rem] text-[#8a8580] tracking-widest">Aucune commande pour l'instant</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#0a0a0a]/5">
                {['Client', 'Email', 'Total', 'Statut', 'Date'].map(h => (
                  <th key={h} className="px-6 py-3 text-left font-mono text-[0.55rem] tracking-widest uppercase text-[#8a8580]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recents.map((c: any) => (
                <tr key={c.id} className="border-b border-[#0a0a0a]/5 hover:bg-[#f5f2ee] transition-colors">
                  <td className="px-6 py-4 text-sm text-[#0a0a0a]">{c.client_nom}</td>
                  <td className="px-6 py-4 font-mono text-[0.65rem] text-[#8a8580]">{c.client_email}</td>
                  <td className="px-6 py-4 font-mono text-sm text-[#0a0a0a]">{c.total}€</td>
                  <td className="px-6 py-4">
                    <span className={`font-mono text-[0.55rem] tracking-widest uppercase px-2 py-1 rounded ${
                      c.statut === 'livree' ? 'bg-green-50 text-green-700' :
                      c.statut === 'expediee' ? 'bg-blue-50 text-blue-700' :
                      c.statut === 'annulee' ? 'bg-red-50 text-red-700' :
                      'bg-[#f5f2ee] text-[#8a8580]'
                    }`}>{c.statut}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-[0.65rem] text-[#8a8580]">{new Date(c.created_at).toLocaleDateString('fr-FR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}