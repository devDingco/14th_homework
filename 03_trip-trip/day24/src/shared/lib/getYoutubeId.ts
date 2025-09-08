export function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)

    if (u.hostname === 'youtu.be') return u.pathname.slice(1)
    if (u.searchParams.get('v')) return u.searchParams.get('v')
    if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2]
    if (u.pathname.startsWith('/embed/')) return u.pathname.split('/')[2]

    return null
  } catch {
    return /^[a-zA-Z0-9_-]{11}$/.test(url) ? url : null
  }
}