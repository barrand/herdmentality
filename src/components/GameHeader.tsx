import { useState } from 'react'
import type { GameData, PlayerData, RoundData } from '../types'
import LeaderboardModal from './LeaderboardModal'

interface Props {
  game: GameData
  currentPlayer: PlayerData | null
  round: RoundData | null
}

export default function GameHeader({ game, currentPlayer, round }: Props) {
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  return (
    <>
      <div className="sticky top-0 z-10 bg-green-800 text-white px-4 py-2">
        <div className="flex justify-between items-center text-sm">
          <span>Round {game.currentRound} of {game.settings.totalRounds}</span>
          <span className="font-bold">{game.code}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-2">
            <span>🥚 x {currentPlayer?.eggs ?? 0}</span>
            {game.rottenEggHolder === currentPlayer?.id && (
              <span className="bg-lime-700 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                ROTTEN EGG
              </span>
            )}
          </div>
          <button
            onClick={() => setShowLeaderboard(true)}
            className="text-sm underline opacity-80 hover:opacity-100"
          >
            Pecking Order
          </button>
        </div>
      </div>

      {showLeaderboard && (
        <LeaderboardModal
          game={game}
          players={[]}
          currentPlayerId={currentPlayer?.id ?? null}
          onClose={() => setShowLeaderboard(false)}
        />
      )}
    </>
  )
}
