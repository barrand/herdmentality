import { useState, useEffect, useRef } from 'react'
import type { GameData, RoundData, PlayerData } from '../types'
import { submitAnswer, skipQuestion, forceEndRound } from '../lib/gameService'

interface Props {
  game: GameData
  round: RoundData
  isHost: boolean
  players: PlayerData[]
}

export default function QuestionDisplay({ game, round, isHost, players }: Props) {
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [expired, setExpired] = useState(false)
  const endRoundTriggered = useRef(false)

  useEffect(() => {
    if (!round.deadline) return

    const deadlineMs = round.deadline.seconds * 1000
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((deadlineMs - Date.now()) / 1000))
      setTimeLeft(remaining)
      if (remaining <= 0) {
        setExpired(true)
      }
    }
    tick()
    const interval = setInterval(tick, 250)
    return () => clearInterval(interval)
  }, [round.deadline])

  useEffect(() => {
    if (expired && isHost && !endRoundTriggered.current) {
      endRoundTriggered.current = true
      forceEndRound(game.id).catch((err) =>
        console.error('Failed to force end round:', err)
      )
    }
  }, [expired, isHost, game.id])

  const handleSubmit = async () => {
    if (!answer.trim() || submitted || expired) return
    setSubmitting(true)
    try {
      await submitAnswer(game.id, game.currentRound, answer.trim())
      setSubmitted(true)
    } catch (err) {
      console.error('Failed to submit answer:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSkip = async () => {
    try {
      await skipQuestion(game.id)
    } catch (err) {
      console.error('Failed to skip:', err)
    }
  }

  const timerPercent = round.deadline
    ? Math.max(0, (timeLeft / game.settings.secondsPerRound) * 100)
    : 100

  return (
    <div className="flex-1 flex flex-col px-4 py-6">
      <div className="text-center mb-4">
        <p className={`text-3xl font-bold tabular-nums ${expired ? 'text-red-600' : 'text-green-900'}`}>
          {expired ? "TIME'S UP!" : `0:${String(timeLeft).padStart(2, '0')}`}
        </p>
        <div className="mt-2 h-2 bg-green-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-250 ${expired ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${timerPercent}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-green-200 p-6 text-center shadow-sm">
        <p className="text-xl font-bold text-green-900 leading-relaxed">
          {round.question}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {expired && !submitted ? (
          <div className="text-center py-4">
            <p className="text-red-600 font-bold text-lg">Too slow!</p>
            <p className="text-green-500 mt-1">You didn't answer in time.</p>
          </div>
        ) : !submitted ? (
          <>
            <input
              type="text"
              placeholder="Your answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full px-4 py-3 text-lg rounded-xl border-2 border-green-200 bg-white focus:border-green-500 focus:outline-none"
              maxLength={100}
              autoFocus
            />
            <button
              onClick={handleSubmit}
              disabled={!answer.trim() || submitting}
              className="w-full py-4 text-lg font-bold text-white bg-green-600 rounded-xl hover:bg-green-700 active:bg-green-800 disabled:opacity-50 transition-colors"
            >
              {submitting ? 'Locking in...' : 'LOCK IN'}
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-green-700 font-medium">You answered:</p>
            <p className="text-2xl font-bold text-green-900 mt-1">"{answer}"</p>
            <p className="text-green-500 mt-2">Locked in</p>
          </div>
        )}
      </div>

      <div className="mt-auto pt-6 text-center">
        <p className="text-sm text-green-500">
          {round.answerCount} of {players.length} players answered
        </p>
        {isHost && !expired && (
          <button
            onClick={handleSkip}
            className="mt-3 text-sm text-green-400 underline hover:text-green-600"
          >
            Skip question
          </button>
        )}
      </div>
    </div>
  )
}
