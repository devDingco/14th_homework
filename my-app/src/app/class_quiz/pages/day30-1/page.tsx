import React, { useEffect, useState } from "react";
import Head from "next/head";

const BeachCursorWithText = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 커서 요소 생성
    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    document.body.appendChild(cursor);

    // 텍스트 표시 요소 생성
    const textDisplay = document.createElement("div");
    textDisplay.id = "text-display";
    document.body.appendChild(textDisplay);

    // 커서 및 텍스트 스타일 적용
    const style = document.createElement("style");
    style.innerHTML = `
      #custom-cursor {
        position: fixed;
        width: 40px;
        height: 40px;
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M20 2.5C10.34 2.5 2.5 10.34 2.5 20S10.34 37.5 20 37.5 37.5 29.66 37.5 20 29.66 2.5 20 2.5zm0 32.5c-8.84 0-16-7.16-16-16S11.16 3 20 3s16 7.16 16 16-7.16 16-16 16z" fill="%23ffa726"/><circle cx="20" cy="20" r="8" fill="%23fff9c4"/><path d="M25 15a5 5 0 1 0-10 0 5 5 0 0 0 10 0z" fill="%23ffb74d"/><path d="M20 5v30M5 20h30" stroke="%23ffb74d" stroke-width="0.5"/></svg>');
        background-size: contain;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
      }
      
      #text-display {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.9);
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        font-family: 'Nanum Gothic', sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: #333;
        max-width: 80%;
        text-align: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
        opacity: 0;
        pointer-events: none;
      }
      
      #text-display.show {
        opacity: 1;
      }
      
      #text-display .highlight {
        color: #e67e22;
        font-weight: bold;
      }
      
      #toggle-text {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 15px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        z-index: 10001;
        font-family: 'Nanum Gothic', sans-serif;
      }
      
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    // 마우스 이동 시 커서 이동
    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    document.addEventListener("mousemove", moveCursor);

    // 클릭 효과
    const clickEffect = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
      setTimeout(() => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
      }, 100);
    };

    document.addEventListener("mousedown", clickEffect);

    // 텍스트 표시 토글 버튼 생성
    const toggleButton = document.createElement("button");
    toggleButton.id = "toggle-text";
    toggleButton.textContent = "목록으로/";
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener("click", () => {
      setIsVisible((prev) => !prev);
      textDisplay.classList.toggle("show");
    });

    // 정리 함수
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mousedown", clickEffect);
      if (document.getElementById("custom-cursor")) {
        document.body.removeChild(
          document.getElementById("custom-cursor") as Node
        );
      }
      if (document.getElementById("text-display")) {
        document.body.removeChild(
          document.getElementById("text-display") as Node
        );
      }
      if (document.getElementById("toggle-text")) {
        document.body.removeChild(
          document.getElementById("toggle-text") as Node
        );
      }
    };
  }, []);

  useEffect(() => {
    const textDisplay = document.getElementById("text-display");
    if (textDisplay) {
      textDisplay.innerHTML = `
        <div>
          <span class="highlight">살어리 살어리랏다</span> 쳥산(青山)애 살어리랏다<br/>
          멀위랑 도래랑 먹고 쳥산(青山)애 살어리랏다<br/>
          얄리얄리 얄랑셩 얄라리 얄라<br/>
          <br/>
          2024.11.11<br/>
          <br/>
          <span class="highlight">살겠노라 살겠노라. 청산에 살겠노라.</span><br/>
          머루랑 다래를 먹고 청산에 살겠노라.
          얄리얄리 얄랑셩 얄라리 얄라

          우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
          너보다 시름 많은 나도 자고 일어나 우노라.
          얄리얄리 얄라셩 얄라리 얄라

          갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
          이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
          얄리얄리 얄라셩 얄라리 얄라

          이럭저럭 하여 낮일랑 지내 왔건만
          올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
          얄리얄리 얄라셩 얄라리 얄라

          어디다 던지는 돌인가 누구를 맞히려던 돌인가.
          미워할 이도 사랑할 이도 없이 맞아서 우노라.
          얄리얄리 얄라셩 얄라리 얄라

          살겠노라 살겠노라. 바다에 살겠노라.
          나문재, 굴, 조개를 먹고 바다에 살겠노라.
          얄리얄리 얄라셩 얄라리 얄라

          가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.
          사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
          얄리얄리 얄라셩 얄라셩 얄라

          가다 보니 배불룩한 술독에 독한 술을 빚는구나.
          조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
          얄리얄리 얄라셩 얄라리 얄라
        </div>
      `;
    }
  }, [isVisible]);

  return (
    <Head>
      <title>해변 휴가 테마 커서와 전통 가사</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};

export default BeachCursorWithText;
