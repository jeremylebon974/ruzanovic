'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Membre = {
  id: string
  nom: string
  email: string
  role: string
  actif: boolean
  created_at: string
}

const roles = ['admin', 'editor', 'viewer']

export default function EquipePage() {
  const [membres, setMembres] = useState<Membre[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ nom: '', email: '', role: 'viewer' })
  const [saving, setSaving] = useState(false)

  async function load() {
    const { data } = await supabase.from('equipe').select('*').order('created_at', { ascending: false })
    setMembres(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    setSaving(true)
    await supabase.from('equipe').insert({ ...form, actif: true })
    setModal(false)
    setForm({ nom: '', email: '', role: 'viewer' })
    setSaving(false)
    load()
  }

  async function toggleActif(id: string, actif: boolean) {
    await supabase.from('equipe').update({ actif: !actif }).eq('id', id)
    load()
  }

  async function supprimer(id: string) {
    if (!confirm('Supprimer ce membre ?')) return
    await supabase.from('equipe').delete().eq('id', id)
    load()
  }

  const roleColor: Record<string, string> = {
    admin: 'bg-[#e84c1e]/10 text-[#e84c1e]',
    editor: 'bg-blue-50 text-blue-700',
    viewer: 'bg-[#f5f2ee] text-[#8a8580]',
  }

  return (
    <div className="p-8">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="font-mono text-[0.6rem] text-[#8a8580] tracking-[0.35em] uppercase mb-2">Dashboard</p>
          <h1 className="font-display text-4xl font-light italic text-[#0a0a0a]">Équipe</h1>
        </div>
        <button onClick={() => setModal(true)} className="font-mono text-[0.6rem] tracking-[0.25em] uppercase bg-[#0a0a0a] text-white px-5 py-3 hover:bg-[#e84c1e] transition-colors duration-300">
          + Ajouter un membre
        </button>
      </div>

      <div className="bg-white rounded border border-[#0a0a0a]/5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#0a0a0a]/5">
              {['Nom', 'Email', 'Rôle', 'Statut', 'Date', 'Actions'].map(h => (
                <th key={h} className="px-6 py-4 text-left font-mono text-[0.55rem] tracking-widest uppercase text-[#8a8580]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-6 py-10 text-center font-mono text-[0.6rem] text-[#8a8580] tracking-widest">Chargement...</td></tr>
            ) : membres.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-10 text-center font-mono text-[0.6rem] text-[#8a8580] tracking-widest">Aucun membre</td></tr>
            ) : membres.map(m => (
              <tr key={m.id} className="border-b border-[#0a0a0a]/5 hover:bg-[#f5f2ee] transition-colors">
                <td className="px-6 py-4 text-sm text-[#0a0a0a] font-medium">{m.nom}</td>
                <td className="px-6 py-4 font-mono text-[0.65rem] text-[#8a8580]">{m.email}</td>
                <td className="px-6 py-4">
                  <span className={`font-mono text-[0.55rem] tracking-widest uppercase px-2 py-1 rounded ${roleColor[m.role]}`}>
                    {m.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => toggleActif(m.id, m.actif)} className={`font-mono text-[0.55rem] tracking-widest uppercase px-2 py-1 rounded ${m.actif ? 'bg-green-50 text-green-700' : 'bg-[#f5f2ee] text-[#8a8580]'}`}>
                    {m.actif ? 'Actif' : 'Inactif'}
                  </button>
                </td>
                <td className="px-6 py-4 font-mono text-[0.65rem] text-[#8a8580]">{new Date(m.created_at).toLocaleDateString('fr-FR')}</td>
                <td className="px-6 py-4">
                  <button onClick={() => supprimer(m.id)} className="font-mono text-[0.55rem] tracking-widest uppercase text-red-400 hover:text-red-600 transition-colors">
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
            <h2 className="font-display text-2xl font-light italic text-[#0a0a0a] mb-6">Ajouter un membre</h2>
            <div className="space-y-4">
              {[
                { key: 'nom', label: 'Nom', type: 'text' },
                { key: 'email', label: 'Email', type: 'email' },
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
              <div>
                <label className="font-mono text-[0.55rem] tracking-widest uppercase text-[#8a8580] block mb-1">Rôle</label>
                <select
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                  className="w-full border border-[#0a0a0a]/10 px-3 py-2 text-sm text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a]"
                >
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
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