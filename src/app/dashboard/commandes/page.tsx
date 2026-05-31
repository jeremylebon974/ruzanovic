'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Commande = {
  id: string
  client_nom: string
  client_email: string
  total: number
  statut: string
  created_at: string
}

const statuts = ['en_attente', 'confirmee', 'expediee', 'livree', 'annulee']

export default function CommandesPage() {
  const [commandes, setCommandes] = useState<Commande[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ client_nom: '', client_email: '', total: '' })
  const [saving, setSaving] = useState(false)

  async function load() {
    const { data } = await supabase.from('commandes').select('*').order('created_at', { ascending: false })
    setCommandes(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    setSaving(true)
    await supabase.from('commandes').insert({
      client_nom: form.client_nom,
      client_email: form.client_email,
      total: parseFloat(form.total),
      statut: 'en_attente',
    })
    setModal(false)
    setForm({ client_nom: '', client_email: '', total: '' })
    setSaving(false)
    load()
  }

  async function updateStatut(id: string, statut: string) {
    await supabase.from('commandes').update({ statut }).eq('id', id)
    load()
  }

  const statutColor: Record<string, string> = {
    en_attente: 'bg-[#f5f2ee] text-[#8a8580]',
    confirmee: 'bg-blue-50 text-blue-700',
    expediee: 'bg-yellow-50 text-yellow-700',
    livree: 'bg-green-50 text-green-700',
    annulee: 'bg-red-50 text-red-700',
  }

  return (
    <div className="p-8">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="font-mono text-[0.6rem] text-[#8a8580] tracking-[0.35em] uppercase mb-2">Dashboard</p>
          <h1 className="font-display text-4xl font-light italic text-[#0a0a0a]">Commandes</h1>
        </div>
        <button onClick={() => setModal(true)} className="font-mono text-[0.6rem] tracking-[0.25em] uppercase bg-[#0a0a0a] text-white px-5 py-3 hover:bg-[#e84c1e] transition-colors duration-300">
          + Nouvelle commande
        </button>
      </div>

      <div className="bg-white rounded border border-[#0a0a0a]/5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#0a0a0a]/5">
              {['Client', 'Email', 'Total', 'Statut', 'Date'].map(h => (
                <th key={h} className="px-6 py-4 text-left font-mono text-[0.55rem] tracking-widest uppercase text-[#8a8580]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center font-mono text-[0.6rem] text-[#8a8580] tracking-widest">Chargement...</td></tr>
            ) : commandes.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center font-mono text-[0.6rem] text-[#8a8580] tracking-widest">Aucune commande</td></tr>
            ) : commandes.map(c => (
              <tr key={c.id} className="border-b border-[#0a0a0a]/5 hover:bg-[#f5f2ee] transition-colors">
                <td className="px-6 py-4 text-sm text-[#0a0a0a]">{c.client_nom}</td>
                <td className="px-6 py-4 font-mono text-[0.65rem] text-[#8a8580]">{c.client_email}</td>
                <td className="px-6 py-4 font-mono text-sm text-[#0a0a0a]">{c.total}€</td>
                <td className="px-6 py-4">
                  <select
                    value={c.statut}
                    onChange={e => updateStatut(c.id, e.target.value)}
                    className={`font-mono text-[0.55rem] tracking-widest uppercase px-2 py-1 rounded border-0 cursor-pointer ${statutColor[c.statut]}`}
                  >
                    {statuts.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-6 py-4 font-mono text-[0.65rem] text-[#8a8580]">{new Date(c.created_at).toLocaleDateString('fr-FR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded p-8">
            <h2 className="font-display text-2xl font-light italic text-[#0a0a0a] mb-6">Nouvelle commande</h2>
            <div className="space-y-4">
              {[
                { key: 'client_nom', label: 'Nom client', type: 'text' },
                { key: 'client_email', label: 'Email client', type: 'email' },
                { key: 'total', label: 'Total (€)', type: 'number' },
              ].map(f => (
                <div key={f.key}>
                  <label className="font-mono text-[0.55rem] tracking-widest uppercase text-[#8a8580] block mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full border border-[#0a0a0a]/10 px-3 py-2 text-sm text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a]"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} disabled={saving} className="flex-1 bg-[#0a0a0a] text-white font-mono text-[0.6rem] tracking-widest uppercase py-3 hover:bg-[#e84c1e] transition-colors">
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <button onClick={() => setModal(false)} className="flex-1 border border-[#0a0a0a]/10 font-mono text-[0.6rem] tracking-widest uppercase py-3 text-[#8a8580] hover:text-[#0a0a0a] transition-colors">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}