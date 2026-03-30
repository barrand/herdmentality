import type { GameData, RoundData, PlayerData } from '../types'
import { advanceRound } from '../lib/gameService'

interface Props {
  game: GameData
  round: RoundData
  players: PlayerData[]
  isHost: boolean
}

export default function RevealBoard({ game, round, players, isHost }: Props) {
  const playerNameById = (id: string) => players.find((p) => p.id === id)?.name ?? id

  if (round.status === 'revealing') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="animate-pulse text-center space-y-3">
          <p className="text-4xl">🐔</p>
          <p className="text-xl font-bold text-green-900">Checking all answers...</p>
          <p className="text-green-500 text-sm">The flock is being counted</p>
        </div>
      </div>
    )
  }

  const playerAnswers = round.playerAnswers ?? {}
  const results = round.results ?? {}
  const hasFlock = Object.values(results).some((r) => r === 'flock')

  const sortedPlayers = Object.entries(results).sort(([, a], [, b]) => {
    const order: Record<string, number> = { flock: 0, outlier: 1, rotten: 2, 'no-answer': 3 }
    return (order[a] ?? 4) - (order[b] ?? 4)
  })

  const isLastRound = game.currentRound >= game.settings.totalRounds

  const handleAdvance = async () => {
    try {
      await advanceRound(game.id)
    } catch (err) {
      console.error('Failed to advance:', err)
    }
  }

  const resultBadge = (result: string) => {
    switch (result) {
      case 'flock':
        return <span className="text-xs font-bold bg-green-200 text-green-800 px-2 py-0.5 rounded-full">FLOCK</span>
      case 'rotten':
        return <span className="text-xs font-bold bg-lime-200 text-lime-800 px-2 py-0.5 rounded-full">ROTTEN EGG</span>
      case 'outlier':
        return <span className="text-xs font-bold bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">FLOWN THE COOP</span>
      case 'no-answer':
        return <span className="text-xs font-bold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">NO ANSWER</span>
      default:
        return null
    }
  }

  return (
    <div className="flex-1 px-4 py-6 space-y-4">
      <div className="text-center">
        <p className="text-lg font-bold text-green-900">{round.question}</p>
      </div>

      {hasFlock ? (
        <div className="bg-green-100 border-2 border-green-300 rounded-2xl p-4 text-center">
          <p className="text-sm font-bold text-green-700 uppercase tracking-wide">The Flock Said</p>
          <p className="text-2xl font-bold text-green-900 mt-1">"{round.flockAnswer?.[0]}"</p>
        </div>
      ) : (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 text-center">
          <p className="text-lg font-bold text-yellow-800">No Flock!</p>
          <p className="text-yellow-700 text-sm">No eggs awarded this round.</p>
        </div>
      )}

      {round.commentary && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
          <p className="text-amber-900 text-sm italic">"{round.commentary}"</p>
        </div>
      )}

      <div className="space-y-2">
        {sortedPlayers.map(([playerId, result]) => (
          <div
            key={playerId}
            className={`rounded-xl p-3 border flex items-center justify-between ${
              result === 'flock'
                ? 'bg-green-50 border-green-300'
                : result === 'rotten'
                ? 'bg-lime-50 border-lime-300'
                : 'bg-white border-green-200'
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-green-900 font-medium">{playerNameById(playerId)}</span>
              <span className="text-green-500 text-sm">
                {playerAnswers[playerId] ? `"${playerAnswers[playerId]}"` : '—'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {resultBadge(result)}
              {result === 'flock' && <span className="text-sm font-bold text-green-700">+1</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4 space-y-2">
        {isHost ? (
          <button
            onClick={handleAdvance}
            className="w-full py-3 text-lg font-bold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors"
          >
            {isLastRound ? 'SEE FINAL PECKING ORDER' : 'NEXT ROUND'}
          </button>
        ) : (
          <p className="text-sm text-green-500">Waiting for host to continue...</p>
        )}
      </div>
    </div>
  )
}
