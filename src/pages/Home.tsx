import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/usePlayer'
import { createGame, joinGame } from '../lib/gameService'

export default function Home() {
  const { loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(() => localStorage.getItem('playerName') ?? '')
  const [roomCode, setRoomCode] = useState('')
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)
  const [joining, setJoining] = useState(false)

  const saveName = (n: string) => {
    setName(n)
    localStorage.setItem('playerName', n)
  }

  const handleCreate = async () => {
    if (!name.trim()) return setError('Enter your name first')
    setError('')
    setCreating(true)
    try {
      const { code } = await createGame(name.trim())
      navigate(`/game/${code}`)
    } catch (err: any) {
      setError(err.message ?? 'Failed to create game')
    } finally {
      setCreating(false)
    }
  }

  const handleJoin = async () => {
    if (!name.trim()) return setError('Enter your name first')
    if (!roomCode.trim()) return setError('Enter a room code')
    setError('')
    setJoining(true)
    try {
      await joinGame(roomCode.trim(), name.trim())
      navigate(`/game/${roomCode.trim().toUpperCase()}`)
    } catch (err: any) {
      setError(err.message ?? 'Failed to join game')
    } finally {
      setJoining(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface linen-texture">
        <p className="text-lg text-on-surface-variant font-body">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 py-12 bg-surface linen-texture relative overflow-hidden">
      {/* Decorative botanical backgrounds */}
      <div className="absolute -top-10 -left-10 opacity-10 pointer-events-none -rotate-12">
        <img src="/images/botanical-fern.png" alt="" className="w-48 h-48 object-contain" />
      </div>
      <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none rotate-45">
        <img src="/images/botanical-wheat.png" alt="" className="w-64 h-64 object-contain" />
      </div>

      <div className="w-full max-w-sm space-y-6 relative">
        <div className="text-center mb-12">
          <h1 className="font-headline text-5xl font-bold tracking-tighter text-on-surface leading-none mb-6">
            FLOCK<br />TOGETHER
          </h1>
          {/* Seed-packet style rooster badge */}
          <div className="relative w-48 h-56 mx-auto bg-tertiary-fixed rounded-t-xl overflow-hidden shadow-sm border-b-4 border-secondary-fixed-dim flex flex-col items-center justify-center p-4">
            <img src="/images/rooster-hero.png" alt="Rooster" className="w-40 h-40 object-contain mb-2" />
            <span className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-secondary opacity-70">Quality Entertainment</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-label text-xs font-bold uppercase tracking-widest text-secondary ml-1" htmlFor="player-name">
            Your Name
          </label>
          <input
            id="player-name"
            type="text"
            placeholder="Enter name..."
            value={name}
            onChange={(e) => saveName(e.target.value)}
            className="w-full bg-surface-container-lowest border-2 border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface placeholder:text-outline/50 font-body focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            maxLength={20}
          />
        </div>

        <button
          onClick={handleCreate}
          disabled={creating}
          className="w-full bg-primary text-on-primary h-14 rounded-xl font-body font-semibold tracking-wide shadow-[0_12px_32px_rgba(56,78,59,0.15)] hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all"
        >
          {creating ? 'Creating...' : 'CREATE GAME'}
        </button>

        <div className="flex items-center gap-4 py-2">
          <div className="h-px flex-1 bg-outline-variant/40" />
          <span className="font-headline italic text-secondary text-sm">or</span>
          <div className="h-px flex-1 bg-outline-variant/40" />
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Room code (e.g. MANGO)"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            className="w-full bg-surface-container-lowest border-2 border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface placeholder:text-outline/50 font-body text-center uppercase tracking-widest font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            maxLength={10}
          />

          <button
            onClick={handleJoin}
            disabled={joining}
            className="w-full bg-surface-container-lowest border-2 border-primary text-primary h-14 rounded-xl font-body font-semibold tracking-wide hover:bg-primary-fixed/20 active:scale-95 disabled:opacity-50 transition-all"
          >
            {joining ? 'Joining...' : 'JOIN GAME'}
          </button>
        </div>

        {error && (
          <p className="text-center text-error text-sm font-body">{error}</p>
        )}

        <div className="mt-12 opacity-30 flex items-center justify-center gap-4">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'opsz' 20" }}>local_florist</span>
          <div className="w-12 h-px bg-secondary" />
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'opsz' 20" }}>psychiatry</span>
          <div className="w-12 h-px bg-secondary" />
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'opsz' 20" }}>local_florist</span>
        </div>
      </div>
    </div>
  )
}
