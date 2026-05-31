'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

type Media = {
  name: string
  url: string
  created_at: string
  size: number
}

export default function MediasPage() {
  const [medias, setMedias] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function load() {
    const { data } = await supabase.storage.from('medias').list('', { sortBy: { column: 'created_at', order: 'desc' } })
    if (data) {
      const items = data.map(f => ({
        name: f.name,
        url: supabase.storage.from('medias').getPublicUrl(f.name).data.publicUrl,
        created_at: f.created_at || '',
        size: f.metadata?.size || 0,
      }))
      setMedias(items)
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const name = `${Date.now()}-${file.name}`
      await supabase.storage.from('medias').upload(name, file)
    }
    setUploading(false)
    load()
  }

  async function supprimer(name: string) {
    if (!confirm('Supprimer ce fichier ?')) return
    await supabase.storage.from('medias').remove([name])
    load()
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  const isImage = (name: string) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(name)

  return (
    <div className="p-8">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="font-mono text-[0.6rem] text-[#8a8580] tracking-[0.35em] uppercase mb-2">Dashboard</p>
          <h1 className="font-display text-4xl font-light italic text-[#0a0a0a]">Médias</h1>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="font-mono text-[0.6rem] tracking-[0.25em] uppercase bg-[#0a0a0a] text-white px-5 py-3 hover:bg-[#e84c1e] transition-colors duration-300 disabled:opacity-50"
        >
          {uploading ? 'Upload en cours...' : '+ Uploader des fichiers'}
        </button>
        <input ref={inputRef} type="file" multiple accept="image/*,video/*" onChange={upload} className="hidden" />
      </div>

      {loading ? (
        <div className="text-center font-mono text-[0.6rem] text-[#8a8580] tracking-widest py-20">Chargement...</div>
      ) : medias.length === 0 ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-[#0a0a0a]/10 rounded p-20 text-center cursor-pointer hover:border-[#0a0a0a]/30 transition-colors"
        >
          <p className="font-mono text-[0.6rem] text-[#8a8580] tracking-widest uppercase mb-2">Aucun média</p>
          <p className="font-mono text-[0.55rem] text-[#8a8580]/60 tracking-widest uppercase">Cliquez pour uploader</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {medias.map(m => (
            <div key={m.name} className="group relative bg-white rounded border border-[#0a0a0a]/5 overflow-hidden">
              <div className="aspect-square relative bg-[#f5f2ee]">
                {isImage(m.name) ? (
                  <Image src={m.url} alt={m.name} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="font-mono text-[0.6rem] text-[#8a8580] uppercase">{m.name.split('.').pop()}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => supprimer(m.name)}
                    className="font-mono text-[0.55rem] tracking-widest uppercase text-white bg-red-500 px-3 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="font-mono text-[0.55rem] text-[#0a0a0a] truncate">{m.name.split('-').slice(1).join('-')}</p>
                <p className="font-mono text-[0.5rem] text-[#8a8580]">{formatSize(m.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}