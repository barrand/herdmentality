import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { onValueWritten } from 'firebase-functions/v2/database'
import * as admin from 'firebase-admin'
import { FieldValue, Timestamp } from 'firebase-admin/firestore'
import { scoreRoundAnswers } from './scoring'
import { groupAnswersWithGemini, generateQuestionsFromCategories, GeminiGroupResult } from './gemini'
import { drawQuestion, seedQuestionPool } from './questions'

admin.initializeApp()

const db = admin.firestore()
const rtdb = admin.database()

// -- CREATE GAME --
export const createGame = onCall(async (request) => {
  const uid = request.auth?.uid
  if (!uid) throw new HttpsError('unauthenticated', 'Must be signed in')

  const { playerName } = request.data as { playerName: string }
  if (!playerName?.trim()) throw new HttpsError('invalid-argument', 'Name required')

  const roomWords = (await import('./data/roomWords.json')).default as string[]

  const gameRef = db.collection('games').doc()
  const gameId = gameRef.id

  let code = ''
  let attempts = 0
  while (attempts < 50) {
    const candidate = roomWords[Math.floor(Math.random() * roomWords.length)].toUpperCase()
    const roomRef = db.collection('rooms').doc(candidate)
    try {
      await db.runTransaction(async (tx) => {
        const roomSnap = await tx.get(roomRef)
        if (roomSnap.exists && roomSnap.data()?.active) {
          throw new Error('taken')
        }
        tx.set(roomRef, {
          gameId,
          createdAt: FieldValue.serverTimestamp(),
          active: true,
        })
      })
      code = candidate
      break
    } catch (err: any) {
      if (err?.message === 'taken') {
        attempts++
      } else {
        console.error('Room claim error:', err)
        attempts++
      }
    }
  }

  if (!code) throw new HttpsError('internal', 'Could not generate room code')

  await gameRef.set({
    code,
    hostId: uid,
    status: 'lobby',
    currentRound: 0,
    pinkCowHolder: null,
    categories: [],
    playerIds: [uid],
    settings: { totalRounds: 15, secondsPerRound: 45, autoAdvanceSeconds: 10 },
  })

  await gameRef.collection('players').doc(uid).set({
    name: playerName.trim(),
    cows: 0,
    connected: true,
  })

  await seedQuestionPool(gameId)

  return { gameId, code }
})

// -- JOIN GAME --
export const joinGame = onCall(async (request) => {
  const uid = request.auth?.uid
  if (!uid) throw new HttpsError('unauthenticated', 'Must be signed in')

  const { code, playerName } = request.data as { code: string; playerName: string }
  if (!code?.trim()) throw new HttpsError('invalid-argument', 'Room code required')
  if (!playerName?.trim()) throw new HttpsError('invalid-argument', 'Name required')

  const upperCode = code.toUpperCase()
  const roomSnap = await db.collection('rooms').doc(upperCode).get()
  if (!roomSnap.exists || !roomSnap.data()?.active) {
    throw new HttpsError('not-found', 'Room not found')
  }

  const gameId = roomSnap.data()!.gameId
  const gameRef = db.collection('games').doc(gameId)
  const gameSnap = await gameRef.get()

  if (!gameSnap.exists) throw new HttpsError('not-found', 'Game not found')
  if (gameSnap.data()!.status !== 'lobby') throw new HttpsError('failed-precondition', 'Game already started')

  await gameRef.update({
    playerIds: FieldValue.arrayUnion(uid),
  })

  await gameRef.collection('players').doc(uid).set({
    name: playerName.trim(),
    cows: 0,
    connected: true,
  })

  return { gameId }
})

// -- START GAME --
export const startGame = onCall(async (request) => {
  const uid = request.auth?.uid
  if (!uid) throw new HttpsError('unauthenticated', 'Must be signed in')

  const { gameId } = request.data as { gameId: string }
  const gameRef = db.collection('games').doc(gameId)
  const gameSnap = await gameRef.get()

  if (!gameSnap.exists) throw new HttpsError('not-found', 'Game not found')
  const game = gameSnap.data()!
  if (game.hostId !== uid) throw new HttpsError('permission-denied', 'Only host can start')
  if (game.status !== 'lobby') throw new HttpsError('failed-precondition', 'Game already started')

  if (game.categories?.length > 0) {
    try {
      const aiQuestions = await generateQuestionsFromCategories(game.categories)
      for (const q of aiQuestions) {
        await gameRef.collection('questionPool').add({
          text: q.text,
          source: 'ai-generated',
          used: false,
          submittedBy: null,
          category: q.category,
        })
      }
    } catch (err) {
      console.error('AI question generation failed, continuing with preset bank:', err)
    }
  }

  const question = await drawQuestion(gameId)
  if (!question) throw new HttpsError('internal', 'No questions available')

  const deadline = new Date(Date.now() + game.settings.secondsPerRound * 1000)

  await gameRef.collection('rounds').doc('1').set({
    question: question.text,
    source: question.source,
    status: 'answering',
    deadline: Timestamp.fromDate(deadline),
    answerCount: 0,
    answerGroups: [],
    herdAnswer: [],
    results: {},
  })

  await gameRef.update({ status: 'playing', currentRound: 1 })
})

// -- SUBMIT ANSWER --
export const submitAnswer = onCall(async (request) => {
  const uid = request.auth?.uid
  if (!uid) throw new HttpsError('unauthenticated', 'Must be signed in')

  const { gameId, roundNum, answer } = request.data as { gameId: string; roundNum: number; answer: string }
  if (!answer?.trim()) throw new HttpsError('invalid-argument', 'Answer required')

  const roundRef = db.collection('games').doc(gameId).collection('rounds').doc(String(roundNum))
  const roundSnap = await roundRef.get()
  if (!roundSnap.exists) throw new HttpsError('not-found', 'Round not found')
  if (roundSnap.data()!.status !== 'answering') throw new HttpsError('failed-precondition', 'Round not accepting answers')

  const deadline = roundSnap.data()!.deadline?.toDate()
  if (deadline && Date.now() > deadline.getTime()) {
    throw new HttpsError('deadline-exceeded', 'Time is up')
  }

  const answerRef = roundRef.collection('answers').doc(uid)
  const existingAnswer = await answerRef.get()
  if (existingAnswer.exists) throw new HttpsError('already-exists', 'Already answered')

  await answerRef.set({
    text: answer.trim(),
    submittedAt: FieldValue.serverTimestamp(),
  })

  const gameSnap = await db.collection('games').doc(gameId).get()
  const playerCount = gameSnap.data()!.playerIds.length

  const newCount = await db.runTransaction(async (tx) => {
    const rSnap = await tx.get(roundRef)
    const current = rSnap.data()!.answerCount || 0
    const updated = current + 1
    tx.update(roundRef, { answerCount: updated })
    return updated
  })

  if (newCount >= playerCount) {
    await triggerScoring(gameId, roundNum)
  }
})

// -- SKIP QUESTION --
export const skipQuestion = onCall(async (request) => {
  const uid = request.auth?.uid
  if (!uid) throw new HttpsError('unauthenticated', 'Must be signed in')

  const { gameId } = request.data as { gameId: string }
  const gameRef = db.collection('games').doc(gameId)
  const gameSnap = await gameRef.get()

  if (gameSnap.data()!.hostId !== uid) throw new HttpsError('permission-denied', 'Only host can skip')

  const roundNum = gameSnap.data()!.currentRound
  await gameRef.collection('rounds').doc(String(roundNum)).update({ status: 'skipped' })

  await doAdvanceRound(gameId)
})

// -- ADVANCE ROUND (callable by host) --
export const advanceRound = onCall(async (request) => {
  const uid = request.auth?.uid
  if (!uid) throw new HttpsError('unauthenticated', 'Must be signed in')

  const { gameId } = request.data as { gameId: string }
  const gameSnap = await db.collection('games').doc(gameId).get()
  if (gameSnap.data()!.hostId !== uid) throw new HttpsError('permission-denied', 'Only host can advance')

  await doAdvanceRound(gameId)
})

// -- FORCE END ROUND (when timer expires) --
export const forceEndRound = onCall(async (request) => {
  const uid = request.auth?.uid
  if (!uid) throw new HttpsError('unauthenticated', 'Must be signed in')

  const { gameId } = request.data as { gameId: string }
  const gameSnap = await db.collection('games').doc(gameId).get()
  if (gameSnap.data()!.hostId !== uid) throw new HttpsError('permission-denied', 'Only host can end round')

  const roundNum = gameSnap.data()!.currentRound
  const roundRef = db.collection('games').doc(gameId).collection('rounds').doc(String(roundNum))
  const roundSnap = await roundRef.get()

  if (roundSnap.data()!.status !== 'answering') return

  await triggerScoring(gameId, roundNum)
})

// -- PRESENCE SYNC --
export const onPresenceChange = onValueWritten(
  { ref: 'status/{gameId}/{playerId}', region: 'us-central1' },
  async (event) => {
    const { gameId, playerId } = event.params
    const data = event.data.after.val() as { connected: boolean } | null

    if (!data) return

    try {
      await db
        .collection('games')
        .doc(gameId)
        .collection('players')
        .doc(playerId)
        .set({ connected: data.connected }, { merge: true })

      if (!data.connected) {
        const gameSnap = await db.collection('games').doc(gameId).get()
        if (gameSnap.exists && gameSnap.data()!.hostId === playerId) {
          const playerIds: string[] = gameSnap.data()!.playerIds
          const playersSnap = await db.collection('games').doc(gameId).collection('players').get()
          const connectedPlayers = playersSnap.docs.filter((d) => d.data().connected && d.id !== playerId)
          if (connectedPlayers.length > 0) {
            await db.collection('games').doc(gameId).update({ hostId: connectedPlayers[0].id })
          }
        }
      }
    } catch (err) {
      console.error('Presence sync failed:', err)
    }
  },
)

// -- INTERNAL HELPERS --

async function triggerScoring(gameId: string, roundNum: number) {
  const roundRef = db.collection('games').doc(gameId).collection('rounds').doc(String(roundNum))
  const roundSnap = await roundRef.get()
  if (roundSnap.data()!.status !== 'answering') return

  await roundRef.update({ status: 'revealing' })

  const answersSnap = await roundRef.collection('answers').get()
  const answers: Record<string, string> = {}
  answersSnap.docs.forEach((d) => {
    answers[d.id] = d.data().text
  })

  const question = roundSnap.data()!.question
  const gameSnap = await db.collection('games').doc(gameId).get()
  const game = gameSnap.data()!

  const answerValues = Object.values(answers)
  let groups: string[][]
  let commentary = ''

  const quickGroups = fallbackGrouping(answerValues)
  if (quickGroups.length <= 1) {
    groups = quickGroups
    console.log('All answers match after normalization, skipping Gemini')
  } else {
    try {
      const geminiResult: GeminiGroupResult = await groupAnswersWithGemini(question, answerValues)
      groups = geminiResult.groups
      commentary = geminiResult.commentary
      console.log('Gemini grouping result:', JSON.stringify(groups))
      console.log('Gemini commentary:', commentary)
    } catch (err) {
      console.error('Gemini failed, using fallback:', err)
      groups = quickGroups
      console.log('Fallback grouping result:', JSON.stringify(groups))
    }
  }

  const { results, pinkCowHolder } = scoreRoundAnswers(
    answers,
    groups,
    game.pinkCowHolder,
    game.playerIds,
  )

  const hasHerd = Object.values(results).some((r) => r === 'herd')

  await roundRef.update({
    status: 'scored',
    answerGroups: groups.map((g) => JSON.stringify(g)),
    herdAnswer: hasHerd ? (groups[0] ?? []) : [],
    results,
    playerAnswers: answers,
    commentary,
  })

  const batch = db.batch()
  const gameUpdates: Record<string, any> = { pinkCowHolder: pinkCowHolder }

  for (const [playerId, result] of Object.entries(results)) {
    if (result === 'herd') {
      const playerRef = db.collection('games').doc(gameId).collection('players').doc(playerId)
      batch.update(playerRef, { cows: FieldValue.increment(1) })
    }
  }

  batch.update(db.collection('games').doc(gameId), gameUpdates)
  await batch.commit()
}

async function doAdvanceRound(gameId: string) {
  const gameRef = db.collection('games').doc(gameId)
  const gameSnap = await gameRef.get()
  const game = gameSnap.data()!

  const playersSnap = await gameRef.collection('players').get()
  const winner = playersSnap.docs.find(
    (d) => d.data().cows >= 8 && d.id !== game.pinkCowHolder
  )
  if (winner) {
    await gameRef.update({ status: 'finished' })
    return
  }

  const nextRound = game.currentRound + 1
  if (nextRound > game.settings.totalRounds) {
    await gameRef.update({ status: 'finished' })
    return
  }

  const question = await drawQuestion(gameId)
  if (!question) {
    await gameRef.update({ status: 'finished' })
    return
  }

  const deadline = new Date(Date.now() + game.settings.secondsPerRound * 1000)

  await gameRef.collection('rounds').doc(String(nextRound)).set({
    question: question.text,
    source: question.source,
    status: 'answering',
    deadline: Timestamp.fromDate(deadline),
    answerCount: 0,
    answerGroups: [],
    herdAnswer: [],
    results: {},
  })

  await gameRef.update({ currentRound: nextRound })
}

function fallbackGrouping(answers: string[]): string[][] {
  const normalized = new Map<string, string[]>()
  for (const answer of answers) {
    const key = answer.toLowerCase().trim().replace(/^(a |an |the )/, '').replace(/s$/, '')
    const group = normalized.get(key) ?? []
    group.push(answer)
    normalized.set(key, group)
  }
  return Array.from(normalized.values()).sort((a, b) => b.length - a.length)
}
