'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Produit = {
  id: string
  nom: string
  description: string
  prix: number
  categorie: string
  stock: number
  actif: boolean
  created_at: string
}

export default function ProduitsPage() {
  const [produits, setProduits] = useState<Produit[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ nom: '', description: '', prix: '', categorie: '', stock: '' })
  const [saving, setSaving] = useState(false)

  async function load() {
    const { data } = await supabase.from('produits').select('*').order('created_at', { ascending: false })
    setProduits(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    setSaving(true)
    await supabase.from('produits').insert({
      nom: form.nom,
      description: form.description,
      prix: parseFloat(form.prix),
      categorie: form.categorie,
      stock: parseInt(form.stock),
      actif: true,
    })
    setModal(false)
    setForm({ nom: '', description: '', prix: '', categorie: '', stock: '' })
    setSaving(false)
    load()
  }

  async function toggleActif(id: string, actif: boolean) {
    await supabase.from('produits').update({ actif: !actif }).eq('id', id)
    load()
  }

  async function supprimer(id: string) {
    if (!confirm('Supprimer ce produit ?')) return
    await supabase.from('produits').delete().eq('id', id)
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="font-mono text-[0.6rem] text-[#8a8580] tracking-[0.35em] uppercase mb-2">Dashboard</p>
          <h1 className="font-display text-4xl font-light italic text-[#0a0a0a]">Produits</h1>
        </div>
        <button onClick={() => setModal(true)} className="font-mono text-[0.6rem] tracking-[0.25em] uppercase bg-[#0a0a0a] text-white px-5 py-3 hover:bg-[#e84c1e] transition-colors duration-300">
          + Nouveau produit
        </button>
      </div>

      <div className="bg-white rounded border border-[#0a0a0a]/5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#0a0a0a]/5">
              {['Nom', 'Catégorie', 'Prix', 'Stock', 'Statut', 'Actions'].map(h => (
                <th key={h} className="px-6 py-4 text-left font-mono text-[0.55rem] tracking-widest uppercase text-[#8a8580]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-6 py-10 text-center font-mono text-[0.6rem] text-[#8a8580] tracking-widest">Chargement...</td></tr>
            ) : produits.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-10 text-center font-mono text-[0.6rem] text-[#8a8580] tracking-widest">Aucun produit</td></tr>
            ) : produits.map(p => (
              <tr key={p.id} className="border-b border-[#0a0a0a]/5 hover:bg-[#f5f2ee] transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm text-[#0a0a0a] font-medium">{p.nom}</p>
                  <p className="font-mono text-[0.6rem] text-[#8a8580] mt-1">{p.description?.slice(0, 40)}...</p>
                </td>
                <td className="px-6 py-4 font-mono text-[0.65rem] text-[#8a8580] uppercase tracking-widest">{p.categorie}</td>
                <td className="px-6 py-4 font-mono text-sm text-[#0a0a0a]">{p.prix}€</td>
                <td className="px-6 py-4 font-mono text-sm text-[#0a0a0a]">{p.stock}</td>
                <td className="px-6 py-4">
                  <button onClick={() => toggleActif(p.id, p.actif)} className={`font-mono text-[0.55rem] tracking-widest uppercase px-2 py-1 rounded transition-colors ${p.actif ? 'bg-green-50 text-green-700' : 'bg-[#f5f2ee] text-[#8a8580]'}`}>
                    {p.actif ? 'Actif' : 'Inactif'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => supprimer(p.id)} className="font-mono text-[0.55rem] tracking-widest uppercase text-red-400 hover:text-red-600 transition-colors">
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
            <h2 className="font-display text-2xl font-light italic text-[#0a0a0a] mb-6">Nouveau produit</h2>
            <div className="space-y-4">
              {[
                { key: 'nom', label: 'Nom', type: 'text' },
                { key: 'categorie', label: 'Catégorie', type: 'text' },
                { key: 'prix', label: 'Prix (€)', type: 'number' },
                { key: 'stock', label: 'Stock', type: 'number' },
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
                <label className="font-mono text-[0.55rem] tracking-widest uppercase text-[#8a8580] block mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full border border-[#0a0a0a]/10 px-3 py-2 text-sm text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a]"
                />
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