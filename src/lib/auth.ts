import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from './firebase'

let currentUser: User | null = null
let authReady: Promise<User>

export function initAuth(): Promise<User> {
  if (authReady) return authReady

  authReady = new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        currentUser = user
        unsubscribe()
        resolve(user)
      } else {
        try {
          const credential = await signInAnonymously(auth)
          currentUser = credential.user
          unsubscribe()
          resolve(credential.user)
        } catch (err) {
          reject(err)
        }
      }
    })
  })

  return authReady
}

export function getUid(): string {
  if (!currentUser) throw new Error('Auth not initialized. Call initAuth() first.')
  return currentUser.uid
}

export function getCurrentUser(): User | null {
  return currentUser
}
