// src/components/openapis-list/map/hook.ts
import { useState, useEffect } from 'react'

// 날씨 데이터 타입을 정의하고 외부에서 사용할 수 있도록 export 합니다.
// export interface WeatherData {
//   temp: number
//   description: string
//   icon: string
//   name: string
// }

export function useWeather(city: string | null) {
  const [data, setData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  useEffect(() => {
    // city 값이 없으면(마우스가 폴리곤에서 벗어나면) 아무 작업도 하지 않습니다.
    if (!city) {
      setData(null)
      return
    }

    const fetchWeatherData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
        )
        if (!res.ok) {
          throw new Error('날씨 정보를 불러오는 데 실패했습니다.')
        }
        const result: WeatherData = await res.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeatherData()
  }, [city]) // city 이름이 바뀔 때마다 API를 다시 호출합니다.

  return { data, isLoading, error }
}
