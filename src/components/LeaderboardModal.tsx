import type { GameData, PlayerData } from '../types'

interface Props {
  game: GameData
  players: PlayerData[]
  currentPlayerId: string | null
  onClose: () => void
}

export default function LeaderboardModal({ game, players, currentPlayerId, onClose }: Props) {
  const sorted = [...players].sort((a, b) => b.cows - a.cows)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative w-full max-w-sm bg-white rounded-t-2xl p-6 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-900">THE RANCH LEDGER</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <ul className="space-y-3">
          {sorted.map((player, i) => (
            <li
              key={player.id}
              className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                player.id === currentPlayerId ? 'bg-yellow-50 border border-yellow-300' : ''
              }`}
            >
              <span className="font-medium text-green-900">
                {i + 1}. {player.name}
                {player.id === currentPlayerId && ' ←'}
              </span>
              <div className="flex items-center gap-2">
                <span>{'🐄'.repeat(player.cows)}</span>
                {game.pinkCowHolder === player.id && <span className="text-pink-500">🩷🐄</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
