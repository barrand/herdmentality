import { ref, onValue, onDisconnect, set, serverTimestamp } from 'firebase/database'
import { rtdb } from './firebase'
import { getUid } from './auth'

let currentGameId: string | null = null

export function setupPresence(gameId: string) {
  const uid = getUid()
  const statusRef = ref(rtdb, `status/${gameId}/${uid}`)
  const connectedRef = ref(rtdb, '.info/connected')

  if (currentGameId) {
    cleanupPresence(currentGameId)
  }
  currentGameId = gameId

  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      onDisconnect(statusRef).set({
        connected: false,
        lastSeen: serverTimestamp(),
      })

      set(statusRef, {
        connected: true,
        lastSeen: serverTimestamp(),
      })
    }
  })
}

export function cleanupPresence(gameId: string) {
  const uid = getUid()
  const statusRef = ref(rtdb, `status/${gameId}/${uid}`)
  set(statusRef, {
    connected: false,
    lastSeen: serverTimestamp(),
  })
  currentGameId = null
}
