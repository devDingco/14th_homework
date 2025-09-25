// utils/auth.ts
type JwtPayload = { exp?: number }

export function isTokenExpired(token?: string, leewaySec = 60) {
  if (!token) return true
  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as JwtPayload
    if (!payload.exp) return true
    const now = Math.floor(Date.now() / 1000)
    return payload.exp <= now + leewaySec // 시계 오차 대비 여유 60초
  } catch {
    return true
  }
}
