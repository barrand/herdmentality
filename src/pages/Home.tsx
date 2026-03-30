import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/usePlayer'
import { createGame, joinGame } from '../lib/gameService'

export default function Home() {
  const { uid, loading: authLoading } = useAuth()
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
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <p className="text-lg text-green-800">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-green-50">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-900 tracking-tight">
            HERD MENTALITY
          </h1>
          <p className="mt-2 text-6xl">🐄</p>
        </div>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => saveName(e.target.value)}
          className="w-full px-4 py-3 text-lg rounded-xl border-2 border-green-200 bg-white focus:border-green-500 focus:outline-none"
          maxLength={20}
        />

        <button
          onClick={handleCreate}
          disabled={creating}
          className="w-full py-4 text-lg font-bold text-white bg-green-600 rounded-xl hover:bg-green-700 active:bg-green-800 disabled:opacity-50 transition-colors"
        >
          {creating ? 'Creating...' : 'CREATE GAME'}
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-green-200" />
          <span className="text-green-400 text-sm font-medium">or</span>
          <div className="flex-1 h-px bg-green-200" />
        </div>

        <input
          type="text"
          placeholder="Room code (e.g. MANGO)"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          className="w-full px-4 py-3 text-lg rounded-xl border-2 border-green-200 bg-white focus:border-green-500 focus:outline-none uppercase"
          maxLength={10}
        />

        <button
          onClick={handleJoin}
          disabled={joining}
          className="w-full py-4 text-lg font-bold text-green-700 bg-white border-2 border-green-300 rounded-xl hover:bg-green-50 active:bg-green-100 disabled:opacity-50 transition-colors"
        >
          {joining ? 'Joining...' : 'JOIN GAME'}
        </button>

        {error && (
          <p className="text-center text-red-600 text-sm">{error}</p>
        )}
      </div>
    </div>
  )
}
