type RoundResult = 'flock' | 'outlier' | 'rotten' | 'no-answer'

interface ScoringResult {
  results: Record<string, RoundResult>
  rottenEggHolder: string | null
}

export function scoreRoundAnswers(
  answers: Record<string, string>,
  groups: string[][],
  currentRottenEggHolder: string | null,
  allPlayerIds: string[],
): ScoringResult {
  const results: Record<string, RoundResult> = {}

  for (const playerId of allPlayerIds) {
    if (!(playerId in answers)) {
      results[playerId] = 'no-answer'
    }
  }

  const sortedGroups = [...groups].sort((a, b) => b.length - a.length)

  if (sortedGroups.length === 0) {
    return { results, rottenEggHolder: currentRottenEggHolder }
  }

  const answerToPlayer = new Map<string, string>()
  for (const [playerId, answer] of Object.entries(answers)) {
    answerToPlayer.set(answer, playerId)
  }

  const largestSize = sortedGroups[0].length
  const tiedForLargest = sortedGroups.filter((g) => g.length === largestSize)

  if (tiedForLargest.length > 1) {
    for (const playerId of Object.keys(answers)) {
      if (!(playerId in results)) {
        results[playerId] = 'outlier'
      }
    }
    return { results, rottenEggHolder: currentRottenEggHolder }
  }

  const flockGroup = sortedGroups[0]
  const flockSet = new Set(flockGroup)

  for (const [playerId, answer] of Object.entries(answers)) {
    if (playerId in results) continue

    if (flockSet.has(answer)) {
      results[playerId] = 'flock'
    } else {
      results[playerId] = 'outlier'
    }
  }

  let newRottenEggHolder = currentRottenEggHolder
  const soloGroups = sortedGroups.filter((g) => g.length === 1)

  if (soloGroups.length === 1) {
    const soloAnswer = soloGroups[0][0]
    const soloPlayerId = answerToPlayer.get(soloAnswer)
    if (soloPlayerId) {
      results[soloPlayerId] = 'rotten'
      newRottenEggHolder = soloPlayerId
    }
  }

  return { results, rottenEggHolder: newRottenEggHolder }
}
