type RoundResult = 'herd' | 'outlier' | 'pink' | 'no-answer'

interface ScoringResult {
  results: Record<string, RoundResult>
  pinkCowHolder: string | null
}

export function scoreRoundAnswers(
  answers: Record<string, string>,
  groups: string[][],
  currentPinkCowHolder: string | null,
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
    return { results, pinkCowHolder: currentPinkCowHolder }
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
    return { results, pinkCowHolder: currentPinkCowHolder }
  }

  const herdGroup = sortedGroups[0]
  const herdSet = new Set(herdGroup)

  for (const [playerId, answer] of Object.entries(answers)) {
    if (playerId in results) continue

    if (herdSet.has(answer)) {
      results[playerId] = 'herd'
    } else {
      results[playerId] = 'outlier'
    }
  }

  let newPinkCowHolder = currentPinkCowHolder
  const soloGroups = sortedGroups.filter((g) => g.length === 1)

  if (soloGroups.length === 1) {
    const soloAnswer = soloGroups[0][0]
    const soloPlayerId = answerToPlayer.get(soloAnswer)
    if (soloPlayerId) {
      results[soloPlayerId] = 'pink'
      newPinkCowHolder = soloPlayerId
    }
  }

  return { results, pinkCowHolder: newPinkCowHolder }
}
