import { useNavigate } from 'react-router-dom'
import type { GameData, PlayerData } from '../types'

interface Props {
  game: GameData
  players: PlayerData[]
  isHost: boolean
  isFinal?: boolean
}

export default function Scoreboard({ game, players, isHost, isFinal }: Props) {
  const navigate = useNavigate()
  const sorted = [...players].sort((a, b) => b.cows - a.cows)
  const winner = isFinal ? sorted[0] : null

  return (
    <div className="min-h-screen bg-green-50 px-4 py-8">
      <div className="max-w-sm mx-auto space-y-6">
        {isFinal && winner && (
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold text-green-900">GAME OVER!</p>
            <p className="text-5xl">🏆🐄</p>
            <p className="text-2xl font-bold text-green-800">
              {winner.name} WINS THE RANCH!
            </p>
            <p className="text-green-600">with {winner.cows} cows</p>
          </div>
        )}

        {!isFinal && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-900">THE RANCH LEDGER</h2>
            <p className="text-green-600 mt-1">Round {game.currentRound} of {game.settings.totalRounds}</p>
          </div>
        )}

        <ul className="bg-white rounded-2xl border border-green-200 divide-y divide-green-100">
          {sorted.map((player, i) => (
            <li key={player.id} className="px-4 py-3 flex items-center justify-between">
              <span className="font-medium text-green-900">
                {i + 1}. {player.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg">{'🐄'.repeat(Math.min(player.cows, 10))}</span>
                {player.cows > 10 && <span className="text-sm text-green-600">x{player.cows}</span>}
                {game.pinkCowHolder === player.id && (
                  <span className="text-pink-500 font-bold text-sm">🩷🐄</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        {game.pinkCowHolder && (
          <p className="text-center text-pink-600 text-sm font-medium">
            {players.find((p) => p.id === game.pinkCowHolder)?.name} has the Pink Cow!
          </p>
        )}

        {isFinal && (
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full py-4 text-lg font-bold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors"
            >
              ROUND 'EM UP AGAIN
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 text-lg font-medium text-green-700 bg-white border-2 border-green-300 rounded-xl hover:bg-green-50 transition-colors"
            >
              BACK TO THE FARM
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
