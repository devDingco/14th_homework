"use client";

import { useEffect, useState } from "react";

export default function OpenApisList() {
    const [forecast, setForecast] = useState<any[]>([]);

    useEffect(() => {
        const lat = 37.5665;
        const lon = 126.9780;
        const apiKey = "321e2ad3e777f6631cd14b1ae48f83a5"; // 본인 키 입력
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`
        )
            .then((res) => res.json())
            .then((data) => {
                // 날짜별 첫번째 데이터만 추출
                const grouped: any = {};
                data.list.forEach((item: any) => {
                    const date = item.dt_txt.split(" ")[0]; // yyyy-mm-dd
                    if (!grouped[date]) {
                        grouped[date] = item; // 각 날짜 첫번째 데이터만 저장
                    }
                });
                // 오늘 이후 5일만
                const daily = Object.values(grouped).slice(0, 5);
                setForecast(daily);
            });
    }, []);

    return (
        <div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "10px",
                }}
            >
                {forecast.length > 0 ? (
                    forecast.map((day: any, idx: number) => (
                        <div
                            key={idx}
                            style={{
                                padding: "10px",
                                background: "linear-gradient(135deg,#6fb1fc,#4364f7)",
                                borderRadius: "8px",
                                color: "#fff",
                                textAlign: "center",
                            }}
                        >
                            <p>
                                {new Date(day.dt_txt).toLocaleDateString("ko-KR", {
                                    month: "short",
                                    day: "numeric",
                                })}
                            </p>
                            <img
                                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                alt="날씨아이콘"
                                style={{ width: "60px" }}
                            />
                            <p style={{ fontSize: "1.2rem", margin: "5px 0" }}>
                                {day.main.temp}°C
                            </p>
                            <p style={{ marginBottom: 0 }}>{day.weather[0].description}</p>
                        </div>
                    ))
                ) : (
                    <p>날씨 정보를 불러오는 중...</p>
                )}
            </div>

            <img
                style={{ width: "100px", height: "100px" }}
                src="https://api.dicebear.com/9.x/bottts/svg?randomizeIds=false"
                alt="avatar"
            />



        </div>





    );
}