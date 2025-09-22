"use client";

import { useState } from "react";

export default function OpenAPIs() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = "c2b5e28d363f175faa152204ab672c1f"; // 내 실제 키

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setWeather(null);

    try {
      const res = await fetch(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
      );
      const data = await res.json();

      if (data.error) {
        alert("에러: " + data.error.info);
      } else {
        setWeather(data);
      }
    } catch (err) {
      alert("데이터를 불러오는 중 오류 발생: " + err);
    } finally {
      setLoading(false);
    }
  };

  return {
    city,
    weather,
    loading,
    getWeather,
    setCity,
  };
}
