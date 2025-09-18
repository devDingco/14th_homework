import { useState, useEffect } from 'react'
import { OpenWeatherResponse } from './types'
import { fetchWeather } from 'api/weather/fetchWeather'

export function useWeather(city: string | null) {
  const [data, setData] = useState<OpenWeatherResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!city) {
      setData(null)
      return
    }

    const getWeather = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await fetchWeather(city)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    getWeather()
  }, [city])

  return { data, isLoading, error }
}
