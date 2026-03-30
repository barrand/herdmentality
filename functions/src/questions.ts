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

export async function drawQuestion(gameId: string): Promise<{ text: string; source: string } | null> {
  const db = getDb()
  const poolRef = db.collection('games').doc(gameId).collection('questionPool')
  let snap = await poolRef.where('used', '==', false).limit(50).get()

  if (snap.empty) {
    const allSnap = await poolRef.get()
    if (allSnap.empty) return null

    const resetBatch = db.batch()
    allSnap.docs.forEach((d) => resetBatch.update(d.ref, { used: false }))
    await resetBatch.commit()

    snap = await poolRef.where('used', '==', false).limit(50).get()
    if (snap.empty) return null
  }

  const randomIndex = Math.floor(Math.random() * snap.docs.length)
  const chosen = snap.docs[randomIndex]

  await chosen.ref.update({ used: true })

  return {
    text: chosen.data().text,
    source: chosen.data().source,
  }
}
