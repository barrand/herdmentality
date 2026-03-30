import { useState, useEffect } from 'react'
import { initAuth, getUid } from '../lib/auth'
import type { PlayerData } from '../types'

export function useAuth() {
  const [uid, setUid] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initAuth()
      .then((user) => {
        setUid(user.uid)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Auth failed:', err)
        setLoading(false)
      })
  }, [])

  return { uid, loading }
}

export function useCurrentPlayer(players: PlayerData[], uid: string | null): PlayerData | null {
  if (!uid) return null
  return players.find((p) => p.id === uid) ?? null
}

export function useIsHost(hostId: string | null | undefined, uid: string | null): boolean {
  return !!hostId && !!uid && hostId === uid
}
