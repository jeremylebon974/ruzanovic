'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Abonne = {
  id: string
  email: string
  actif: boolean
  created_at: string
}

export default function NewsletterPage() {
  const [abonnes, setAbonnes] = useState<Abonne[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)

  async function load() {
    const { data } = await supabase.from('newsletter').select('*').order('created_at', { ascending: false })
    setAbonnes(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    setSaving(true)
    await supabase.from('newsletter').insert({ email, actif: true })
    setModal(false)
    setEmail('')
    setSaving(false)
    load()
  }

  async function toggleActif(id: string, actif: boolean) {
    await supabase.from('newsletter').update({ actif: !actif }).eq('id', id)
    load()
  }

  async function supprimer(id: string) {
    if (!confirm('Supprimer cet abonné ?')) return
    await supabase.from('newsletter').delete().eq('id', id)
    load()
  }

  const actifs = abonnes.filter(a => a.actif).length

  return (
    <div className="p-8">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="font-mono text-[0.6rem] text-[#8a8580] tracking-[0.35em] uppercase mb-2">Dashboard</p>
          <h1 className="font-display text-4xl font-light italic text-[#0a0a0a]">Newsletter</h1>
        </div>
        <button onClick={() => setModal(true)} className="font-mono text-[0.6rem] tracking-[0.25em] uppercase bg-[#0a0a0a] text-white px-5 py-3 hover:bg-[#e84c1e] transition-colors duration-300">
          + Ajouter un abonné
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded p-5 border border-[#0a0a0a]/5">
          <div className="w-2 h-2 rounded-full bg-[#e84c1e] mb-4" />
          <p className="font-mono text-[0.55rem] text-[#8a8580] tracking-[0.25em] uppercase mb-2">Total abonnés</p>
          <p className="font-display text-3xl font-light text-[#0a0a0a]">{abonnes.length}</p>
        </div>
        <div className="bg-white rounded p-5 border border-[#0a0a0a]/5">
          <div className="w-2 h-2 rounded-full bg-[#d4f000] mb-4" />
          <p className="font-mono text-[0.55rem] text-[#8a8580] tracking-[0.25em] uppercase mb-2">Actifs</p>
          <p className="font-display text-3xl font-light text-[#0a0a0a]">{actifs}</p>
        </div>
      </div>

      <div className="bg-white rounded border border-[#0a0a0a]/5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#0a0a0a]/5">
              {['Email', 'Statut', 'Date', 'Actions'].map(h => (
                <th key={h} className="px-6 py-4 text-left font-mono text-[0.55rem] tracking-widest uppercase text-[#8a8580]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-10 text-center font-mono text-[0.6rem] text-[#8a8580] tracking-widest">Chargement...</td></tr>
            ) : abonnes.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-10 text-center font-mono text-[0.6rem] text-[#8a8580] tracking-widest">Aucun abonné</td></tr>
            ) : abonnes.map(a => (
              <tr key={a.id} className="border-b border-[#0a0a0a]/5 hover:bg-[#f5f2ee] transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-[#0a0a0a]">{a.email}</td>
                <td className="px-6 py-4">
                  <button onClick={() => toggleActif(a.id, a.actif)} className={`font-mono text-[0.55rem] tracking-widest uppercase px-2 py-1 rounded ${a.actif ? 'bg-green-50 text-green-700' : 'bg-[#f5f2ee] text-[#8a8580]'}`}>
                    {a.actif ? 'Actif' : 'Inactif'}
                  </button>
                </td>
                <td className="px-6 py-4 font-mono text-[0.65rem] text-[#8a8580]">{new Date(a.created_at).toLocaleDateString('fr-FR')}</td>
                <td className="px-6 py-4">
                  <button onClick={() => supprimer(a.id)} className="font-mono text-[0.55rem] tracking-widest uppercase text-red-400 hover:text-red-600 transition-colors">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded p-8">
            <h2 className="font-display text-2xl font-light italic text-[#0a0a0a] mb-6">Ajouter un abonné</h2>
            <div>
              <label className="font-mono text-[0.55rem] tracking-widest uppercase text-[#8a8580] block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-[#0a0a0a]/10 px-3 py-2 text-sm text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a]"
              />
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