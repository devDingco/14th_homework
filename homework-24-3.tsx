import React from "react";

const Day24_3 = () => {
  const fruits = [
    { number: 1, title: "레드향" },
    { number: 2, title: "사인머스캣" },
    { number: 3, title: "산청딸기" },
    { number: 4, title: "한라봉" },
    { number: 5, title: "사과" },
    { number: 6, title: "애플망고" },
    { number: 7, title: "멜론" },
    { number: 8, title: "참외" },
    { number: 9, title: "파인애플" },
    { number: 10, title: "귤" },
  ];

  // 짝수만 필터링
  const evenFruits = fruits.filter((fruit) => fruit.number % 2 === 0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Filter & Map - 짝수 과일 목록</h1>

      <div style={{ marginTop: "20px" }}>
        <h2>전체 과일 목록</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {fruits.map((fruit) => (
            <li
              key={fruit.number}
              style={{
                padding: "8px",
                margin: "5px 0",
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
              }}
            >
              {fruit.number}. {fruit.title}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>짝수 번호 과일만 보기</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {evenFruits.map((fruit) => (
            <li
              key={fruit.number}
              style={{
                padding: "8px",
                margin: "5px 0",
                backgroundColor: "#e3f2fd",
                borderRadius: "5px",
                border: "1px solid #bbdefb",
              }}
            >
              {fruit.number}. {fruit.title}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>한줄로 구현 (필터 + 맵)</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {fruits
            .filter((fruit) => fruit.number % 2 === 0)
            .map((fruit) => (
              <li
                key={fruit.number}
                style={{
                  padding: "8px",
                  margin: "5px 0",
                  backgroundColor: "#fff3e0",
                  borderRadius: "5px",
                  border: "1px solid #ffe0b2",
                }}
              >
                {fruit.number}. {fruit.title}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Day24_3;
