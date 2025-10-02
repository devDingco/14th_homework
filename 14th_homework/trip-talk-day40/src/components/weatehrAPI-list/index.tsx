"use client";
import OpenAPIs from "@/components/weatehrAPI-list/hook";

export default function WeatherAPI() {
  const { city, weather, loading, getWeather, setCity } = OpenAPIs();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">🌤 날씨 확인</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="도시 입력 (예: Seoul)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={getWeather}
            className="px-4 py-2 rounded-lg bg-blue-400 text-white font-semibold hover:bg-blue-500 transition"
          >
            검색
          </button>
        </div>

        {loading && <p className="text-lg text-gray-700">불러오는 중...</p>}

        {weather && (
          <div className="mt-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {weather.location.name}, {weather.location.country}
            </h2>
            <img
              src={weather.current.weather_icons[0]}
              alt="날씨 아이콘"
              className="w-24 h-24 rounded-full bg-white/60 border border-gray-200 shadow-lg p-3 mx-auto mb-4"
            />
            <p className="text-2xl font-semibold text-gray-900">
              {weather.current.temperature}°C
            </p>
            <p className="text-gray-700">
              {weather.current.weather_descriptions[0]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
