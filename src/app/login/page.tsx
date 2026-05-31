'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function login() {
    if (!email || !password) { setError('Remplis tous les champs'); return }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('Erreur : ' + error.message); setLoading(false); return }
    setSuccess(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-12">
          <div className="w-16">
            <Image src="/images/logo-white.png" alt="RUZANOVIC" width={120} height={160} className="w-full h-auto" />
          </div>
        </div>
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl font-light italic text-white mb-2">Acces dashboard</h1>
          <p className="font-mono text-[0.6rem] text-white/30 tracking-[0.3em] uppercase">Ruzanovic - Espace prive</p>
        </div>
        {success ? (
          <div className="text-center space-y-6">
            <p className="font-mono text-[0.6rem] text-green-400 tracking-widest uppercase">Connexion reussie</p>
            <a href="/dashboard" className="block w-full bg-white text-[#0a0a0a] font-mono text-[0.6rem] tracking-[0.3em] uppercase py-4 hover:bg-[#e84c1e] hover:text-white transition-colors duration-300 text-center">
              Acceder au dashboard
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[0.55rem] tracking-widest uppercase text-white/40 block mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30" placeholder="votre@email.com" />
            </div>
            <div>
              <label className="font-mono text-[0.55rem] tracking-widest uppercase text-white/40 block mb-2">Mot de passe</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30" placeholder="••••••••" />
            </div>
            {error && <p className="font-mono text-[0.6rem] text-[#e84c1e] tracking-widest">{error}</p>}
            <button onClick={login} disabled={loading} className="w-full bg-white text-[#0a0a0a] font-mono text-[0.6rem] tracking-[0.3em] uppercase py-4 hover:bg-[#e84c1e] hover:text-white transition-colors duration-300 disabled:opacity-50 mt-2">
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}