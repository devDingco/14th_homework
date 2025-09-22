import { OpenWeatherResponse } from 'components/openapis-list/map/types'

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

export async function fetchWeather(city: string) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
  )
  if (!res.ok) {
    throw new Error('날씨 정보를 불러오는 데 실패했습니다.')
  }
  return res.json() as Promise<OpenWeatherResponse>
}
