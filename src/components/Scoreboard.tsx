import { useNavigate } from 'react-router-dom'
import type { GameData, PlayerData } from '../types'
import RottenEgg from './RottenEgg'

interface Props {
  game: GameData
  players: PlayerData[]
  isHost: boolean
  isFinal?: boolean
}

export default function Scoreboard({ game, players, isHost: _isHost, isFinal }: Props) {
  const navigate = useNavigate()
  const sorted = [...players].sort((a, b) => b.eggs - a.eggs)
  const topScore = sorted[0]?.eggs ?? 0
  const winner = isFinal && topScore > 0 ? sorted[0] : null
  const isTie = isFinal && topScore > 0 && sorted.filter((p) => p.eggs === topScore).length > 1

  return (
    <div className="min-h-screen bg-surface linen-texture px-4 py-8">
      <div className="max-w-sm mx-auto space-y-6">
        {isFinal && !winner && (
          <div className="text-center space-y-2">
            <p className="font-headline text-3xl font-bold text-on-surface">GAME OVER!</p>
            <p className="text-5xl">🐔💨</p>
            <p className="font-headline text-xl font-bold text-on-surface">
              No one scored a single egg!
            </p>
            <p className="text-on-surface-variant font-body">The whole flock went rogue.</p>
          </div>
        )}

        {isFinal && winner && isTie && (
          <div className="text-center space-y-2">
            <p className="font-headline text-3xl font-bold text-on-surface">GAME OVER!</p>
            <p className="text-5xl">🏆🐔🏆</p>
            <p className="font-headline text-xl font-bold text-on-surface">
              It's a tie at {topScore} eggs!
            </p>
            <p className="text-on-surface-variant font-body">The flock couldn't pick a leader.</p>
          </div>
        )}

        {isFinal && winner && !isTie && (
          <div className="text-center space-y-2">
            <p className="font-headline text-3xl font-bold text-on-surface">GAME OVER!</p>
            <p className="text-5xl">🏆🐔</p>
            <p className="font-headline text-2xl font-bold text-on-surface">
              {winner.name} RULES THE ROOST!
            </p>
            <p className="text-on-surface-variant font-body">with {winner.eggs} eggs</p>
          </div>
        )}

        {!isFinal && (
          <div className="text-center">
            <h2 className="font-headline text-2xl font-bold text-on-surface">THE PECKING ORDER</h2>
            <p className="text-on-surface-variant mt-1 font-body">Round {game.currentRound} of {game.settings.totalRounds}</p>
          </div>
        )}

        <ul className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 divide-y divide-outline-variant/20">
          {sorted.map((player, i) => (
            <li key={player.id} className="px-4 py-3 flex items-center justify-between">
              <span className="font-medium text-on-surface font-body">
                {i + 1}. {player.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg">{'🥚'.repeat(Math.min(player.eggs, 10))}</span>
                {player.eggs > 10 && <span className="text-sm text-on-surface-variant font-body">x{player.eggs}</span>}
                {game.rottenEggHolder === player.id && <RottenEgg size={24} />}
              </div>
            </li>
          ))}
        </ul>

        {game.rottenEggHolder && (
          <div className="flex items-center justify-center gap-2 text-sm font-medium font-body">
            <RottenEgg size={20} />
            <span className="text-tertiary">
              {players.find((p) => p.id === game.rottenEggHolder)?.name} has the Rotten Egg!
            </span>
          </div>
        )}

        {isFinal && (
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-primary text-on-primary h-14 rounded-xl font-body font-semibold tracking-wide shadow-[0_12px_32px_rgba(56,78,59,0.15)] hover:opacity-90 active:scale-95 transition-all"
            >
              PLAY AGAIN
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-surface-container-lowest border-2 border-primary text-primary h-14 rounded-xl font-body font-semibold tracking-wide hover:bg-primary-fixed/20 active:scale-95 transition-all"
            >
              BACK TO HOME
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
