import { useState } from 'react'
import type { GameData, PlayerData } from '../types'
import { startGame } from '../lib/gameService'

interface Props {
  game: GameData
  players: PlayerData[]
  isHost: boolean
  currentPlayer: PlayerData | null
}

export default function Lobby({ game, players, isHost, currentPlayer }: Props) {
  const [starting, setStarting] = useState(false)
  const [error, setError] = useState('')

  const handleStart = async () => {
    if (players.length < 3) return setError('Need at least 3 players')
    setError('')
    setStarting(true)
    try {
      await startGame(game.id)
    } catch (err: any) {
      setError(err.message ?? 'Failed to start game')
      setStarting(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-50 px-4 py-6">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-900">FLOCK TOGETHER</h1>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-sm text-green-600">Room:</span>
            <span className="text-3xl font-bold text-green-800 tracking-wider">{game.code}</span>
            <button
              onClick={() => navigator.clipboard.writeText(game.code)}
              className="text-green-500 hover:text-green-700"
              title="Copy room code"
            >
              📋
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-2">
            The Henhouse ({players.length})
          </h2>
          <ul className="bg-white rounded-xl border border-green-200 divide-y divide-green-100">
            {players.map((p) => (
              <li key={p.id} className="px-4 py-3 flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${p.connected ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-green-900 font-medium">
                  {p.name}
                  {p.id === game.hostId && ' (host)'}
                  {p.id === currentPlayer?.id && ' ← you'}
                </span>
              </li>
            ))}
            <li className="px-4 py-3 text-green-400 italic text-sm">
              Waiting for others...
            </li>
          </ul>
        </div>

        {isHost && (
          <>
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-green-700 uppercase tracking-wide">Settings</h2>
              <div className="flex items-center justify-between bg-white rounded-xl border border-green-200 px-4 py-3">
                <span className="text-green-800">Rounds</span>
                <span className="font-bold text-green-900">{game.settings.totalRounds}</span>
              </div>
              <div className="flex items-center justify-between bg-white rounded-xl border border-green-200 px-4 py-3">
                <span className="text-green-800">Timer</span>
                <span className="font-bold text-green-900">{game.settings.secondsPerRound}s</span>
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={starting || players.length < 3}
              className="w-full py-4 text-lg font-bold text-white bg-green-600 rounded-xl hover:bg-green-700 active:bg-green-800 disabled:opacity-50 transition-colors"
            >
              {starting ? 'Starting...' : players.length < 3 ? `Need ${3 - players.length} more players` : 'START GAME'}
            </button>
            {error && <p className="text-center text-red-600 text-sm">{error}</p>}
          </>
        )}

        {!isHost && (
          <div className="text-center py-8">
            <p className="text-green-600 animate-pulse">Waiting for host to start...</p>
          </div>
        )}
      </div>
    </div>
  )
}
