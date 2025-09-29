import { isTokenExpired } from 'commons/utils/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export const withAuth =
  <P extends object>(컴포넌트: React.ComponentType<P>) =>
  (props: P) => {
    const router = useRouter()
    const firedRef = useRef(false)
    useEffect(() => {
      if (firedRef.current) return
      firedRef.current = true

      const token = localStorage.getItem('accessToken') ?? undefined
      if (!token) {
        alert('로그인 후 서비스를 이용해주세요.')
        router.replace('/login')
        return
      }
      if (isTokenExpired(token)) {
        alert('로그인이 만료되었습니다. 로그인 후 다시 이용해주세요.')
        localStorage.removeItem('accessToken')
        router.push('/login')
      }
    }, [router])

    return <컴포넌트 {...props} />
  }
