export interface GameSettings {
  totalRounds: number
  secondsPerRound: number
}

export interface GameData {
  id: string
  code: string
  hostId: string
  status: 'lobby' | 'playing' | 'finished'
  currentRound: number
  rottenEggHolder: string | null
  categories: string[]
  playerIds: string[]
  settings: GameSettings
}

export interface PlayerData {
  id: string
  name: string
  eggs: number
  connected: boolean
}

export type RoundResult = 'flock' | 'outlier' | 'rotten' | 'no-answer'

export interface RoundData {
  id: string
  question: string
  source: 'preset' | 'custom' | 'ai-generated'
  status: 'answering' | 'revealing' | 'scored' | 'skipped'
  deadline: { seconds: number; nanoseconds: number }
  answerCount: number
  answerGroups: string[]
  flockAnswer: string[]
  results: Record<string, RoundResult>
  playerAnswers: Record<string, string>
  commentary?: string
}

export interface QuestionPoolItem {
  id: string
  text: string
  source: 'preset' | 'custom' | 'ai-generated'
  used: boolean
  submittedBy: string | null
  category: string | null
}
