import * as admin from 'firebase-admin'

function getDb() {
  return admin.firestore()
}

export async function seedQuestionPool(gameId: string) {
  const db = getDb()
  const questions = (await import('./data/questions.json')).default as { text: string }[]

  const BATCH_SIZE = 400
  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const batch = db.batch()
    const chunk = questions.slice(i, i + BATCH_SIZE)
    for (const q of chunk) {
      const ref = db.collection('games').doc(gameId).collection('questionPool').doc()
      batch.set(ref, {
        text: q.text,
        source: 'preset',
        used: false,
        submittedBy: null,
        category: null,
      })
    }
    await batch.commit()
  }
}

const SOURCE_WEIGHTS: Record<string, number> = {
  'ai-generated': 3,
  'custom': 3,
  'preset': 1,
}

export async function drawQuestion(gameId: string): Promise<{ text: string; source: string } | null> {
  const db = getDb()
  const poolRef = db.collection('games').doc(gameId).collection('questionPool')

  let chosen = await weightedDraw(poolRef)
  if (chosen) return chosen

  const allSnap = await poolRef.get()
  if (allSnap.empty) return null

  const resetBatch = db.batch()
  allSnap.docs.forEach((d) => resetBatch.update(d.ref, { used: false }))
  await resetBatch.commit()

  return weightedDraw(poolRef)
}

async function weightedDraw(
  poolRef: FirebaseFirestore.CollectionReference,
): Promise<{ text: string; source: string } | null> {
  const sources = Object.keys(SOURCE_WEIGHTS)
  const buckets: Record<string, FirebaseFirestore.QueryDocumentSnapshot[]> = {}

  for (const source of sources) {
    const snap = await poolRef
      .where('used', '==', false)
      .where('source', '==', source)
      .limit(50)
      .get()
    if (!snap.empty) {
      buckets[source] = snap.docs
    }
  }

  const availableSources = Object.keys(buckets)
  if (availableSources.length === 0) return null

  const weightedPool: string[] = []
  for (const source of availableSources) {
    const weight = SOURCE_WEIGHTS[source] ?? 1
    for (let i = 0; i < weight; i++) {
      weightedPool.push(source)
    }
  }

  const pickedSource = weightedPool[Math.floor(Math.random() * weightedPool.length)]
  const docs = buckets[pickedSource]
  const chosen = docs[Math.floor(Math.random() * docs.length)]

  await chosen.ref.update({ used: true })
  return { text: chosen.data().text, source: chosen.data().source }
}
