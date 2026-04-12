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
  const [confirmEndRound, setConfirmEndRound] = useState(false)
  const endRoundTriggered = useRef(false)

  const answeredIds = new Set(round.answeredPlayerIds ?? [])

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

  const handleEndRound = async () => {
    if (!confirmEndRound) {
      setConfirmEndRound(true)
      return
    }
    try {
      await forceEndRound(game.id)
    } catch (err) {
      console.error('Failed to end round:', err)
    }
  }

  const timerPercent = round.deadline
    ? Math.max(0, (timeLeft / game.settings.secondsPerRound) * 100)
    : 100

  return (
    <div className="flex-1 flex flex-col px-4 py-6">
      <div className="text-center mb-4">
        <p className={`font-headline text-3xl font-bold tabular-nums ${expired ? 'text-error' : 'text-on-surface'}`}>
          {expired ? "TIME'S UP!" : `0:${String(timeLeft).padStart(2, '0')}`}
        </p>
        <div className="mt-2 h-2 bg-surface-container-high rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-250 ${expired ? 'bg-error' : 'bg-primary'}`}
            style={{ width: `${timerPercent}%` }}
          />
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border-2 border-outline-variant/30 p-6 text-center shadow-sm">
        <p className="font-headline text-xl font-bold text-on-surface leading-relaxed">
          {round.question}
        </p>
      </div>

      {isHost && !expired && (
        <button
          onClick={handleSkip}
          className="mt-2 text-sm text-outline underline hover:text-on-surface-variant self-center font-body"
        >
          Skip question
        </button>
      )}

      <div className="mt-6 space-y-3">
        {expired && !submitted ? (
          <div className="text-center py-4">
            <p className="text-error font-bold text-lg font-body">Too slow!</p>
            <p className="text-outline mt-1 font-body">You didn't answer in time.</p>
          </div>
        ) : !submitted ? (
          <>
            <input
              type="text"
              placeholder="Your answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full bg-surface-container-lowest border-2 border-outline-variant/30 rounded-xl px-4 py-3 text-lg text-on-surface placeholder:text-outline/50 font-body focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              maxLength={100}
              autoFocus
            />
            <button
              onClick={handleSubmit}
              disabled={!answer.trim() || submitting}
              className="w-full bg-primary text-on-primary h-14 rounded-xl font-body font-semibold tracking-wide shadow-[0_12px_32px_rgba(56,78,59,0.15)] hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all"
            >
              {submitting ? 'Clucking in...' : 'CLUCK IN'}
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-on-surface-variant font-medium font-body">You answered:</p>
            <p className="font-headline text-2xl font-bold text-on-surface mt-1">"{answer}"</p>
            <p className="text-outline mt-2 font-body">Clucked in</p>
          </div>
        )}
      </div>

      {/* Player answer status list */}
      <div className="mt-6 bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3 font-label">
          {answeredIds.size} of {players.length} answered
        </p>
        <ul className="space-y-2">
          {players.map((p) => {
            const hasAnswered = answeredIds.has(p.id)
            return (
              <li key={p.id} className="flex items-center justify-between">
                <span className={`text-sm font-body ${hasAnswered ? 'text-on-surface' : 'text-outline'}`}>
                  {p.name}
                </span>
                {hasAnswered ? (
                  <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                ) : (
                  <span className="text-xs text-outline italic font-body">waiting...</span>
                )}
              </li>
            )
          })}
        </ul>

        {isHost && !expired && answeredIds.size > 0 && (
          <button
            onClick={handleEndRound}
            className="mt-4 w-full border-2 border-secondary text-secondary h-12 rounded-xl font-body font-semibold tracking-wide hover:bg-secondary-fixed/20 active:scale-95 transition-all"
          >
            {confirmEndRound ? 'Are you sure? Tap again to end round' : 'End Round'}
          </button>
        )}
      </div>
    </div>
  )
}
