import Image from "next/image";
import React from "react";

const BeachSceneWithText = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-blue-50">
      {/* 상단 TRiP 헤더 */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">TRiP TRiP</h1>
        <nav className="flex space-x-4 mt-2">
          <button className="px-3 py-1 bg-blue-500 rounded">토립토크</button>
          <button className="px-3 py-1 bg-blue-500 rounded">숙박권 구매</button>
          <button className="px-3 py-1 bg-blue-500 rounded">마이페이지</button>
        </nav>
      </header>

      <div className="relative w-full h-96 overflow-hidden">
        {/* 하늘 */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-300 to-blue-200"></div>

        {/* 바다 */}
        <div className="absolute bottom-1/3 left-0 w-full h-1/6 bg-blue-400"></div>

        {/* 모래사장 */}
        <div className="absolute bottom-0 left-0 w-full h-2/5 bg-yellow-200">
          {/* 모래 텍스처를 위한 작은 요소들 */}
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-yellow-300 opacity-30"
              style={{
                width: Math.random() * 10 + 2 + "px",
                height: Math.random() * 10 + 2 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
            ></div>
          ))}
        </div>

        {/* 파라솔 */}
        <div className="absolute bottom-2/5 left-1/2 transform -translate-x-1/2">
          {/* 파라솔 기둥 */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-40 bg-brown-600"></div>

          {/* 파라솔 지붕 */}
          <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-40 h-10">
              <div className="absolute inset-0 bg-red-500 rounded-t-full"></div>
              <div className="absolute top-0 left-0 w-full h-4 bg-white opacity-70"></div>
              <div className="absolute top-4 left-0 w-full h-4 bg-red-500"></div>
              <div className="absolute top-8 left-0 w-full h-2 bg-white opacity-70"></div>
            </div>
          </div>
        </div>

        {/* 의자 */}
        <div className="absolute bottom-2/5 left-1/2 transform -translate-x-2/3 translate-y-10">
          <div className="relative w-16 h-16">
            {/* 의자 등받이 */}
            <div className="absolute top-0 left-0 w-full h-4 bg-brown-700 rounded-t-md"></div>
            {/* 의자 좌석 */}
            <div className="absolute top-4 left-0 w-full h-4 bg-brown-700"></div>
            {/* 의자 다리 */}
            <div className="absolute bottom-0 left-2 w-2 h-6 bg-brown-800"></div>
            <div className="absolute bottom-0 right-2 w-2 h-6 bg-brown-800"></div>
          </div>
        </div>

        {/* 그림자 효과 */}
        <div className="absolute bottom-2/5 left-1/2 transform -translate-x-1/2 translate-y-12 w-12 h-4 bg-black opacity-10 rounded-full blur-sm"></div>
        <div className="absolute bottom-2/5 left-1/2 transform -translate-x-2/3 translate-y-16 w-8 h-3 bg-black opacity-10 rounded-full blur-sm"></div>
      </div>

      {/* TRIP 토크 목록 */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">번호 제목</h2>

        <div className="space-y-3">
          <div className="p-3 bg-white rounded shadow">
            <p>
              <span className="font-bold">243</span>{" "}
              <span className="text-blue-600">제주 살이 1일차</span>
            </p>
            <p className="text-sm text-gray-500">홍길동 2024.12.16</p>
          </div>

          <div className="p-3 bg-white rounded shadow">
            <p>
              <span className="font-bold">242</span>{" "}
              <span className="text-blue-600">강남 살이 100년차</span>
            </p>
            <p className="text-sm text-gray-500">홍길동 2024.12.16</p>
          </div>

          <div className="p-3 bg-white rounded shadow">
            <p>
              <span className="font-bold">241</span>{" "}
              <span className="text-blue-600">
                길 걷고 있었는데 고양이한테 간택 받았어요
              </span>
            </p>
            <p className="text-sm text-gray-500">홍길동 2024.12.16</p>
          </div>

          <div className="p-3 bg-white rounded shadow">
            <p>
              <span className="font-bold">240</span>{" "}
              <span className="text-blue-600">
                오늘 날씨 너무 좋아서 바다보러 왔어요~
              </span>
            </p>
            <p className="text-sm text-gray-500">홍길동 2024.12.16</p>
          </div>

          <div className="p-3 bg-white rounded shadow">
            <p>
              <span className="font-bold">239</span>{" "}
              <span className="text-blue-600">
                누가 양양 핫하다고 했어 나밖에 없는데?
              </span>
            </p>
            <p className="text-sm text-gray-500">홍길동 2024.12.16</p>
          </div>

          <div className="p-3 bg-white rounded shadow">
            <p>
              <span className="font-bold">238</span>{" "}
              <span className="text-blue-600">
                여름에 보트타고 싶은거 저밖에 없나요 🥲
              </span>
            </p>
            <p className="text-sm text-gray-500">홍길동 2024.12.16</p>
          </div>

          <div className="p-3 bg-white rounded shadow">
            <p>
              <span className="font-bold">237</span>{" "}
              <span className="text-blue-600">
                사무실에서 과자 너무 많이 먹은거 같아요 다이어트하러 여행
                가야겠어요
              </span>
            </p>
            <p className="text-sm text-gray-500">홍길동 2024.12.16</p>
          </div>

          <div className="p-3 bg-white rounded shadow">
            <p>
              <span className="font-bold">236</span>{" "}
              <span className="text-blue-600">
                여기는 기승전 여행이네요 ㅋㅋㅋ
              </span>
            </p>
            <p className="text-sm text-gray-500">홍길동 2024.12.16</p>
          </div>

          <div className="p-3 bg-white rounded shadow">
            <p>
              <span className="font-bold">235</span>{" "}
              <span className="text-blue-600">
                상여금 들어왔는데 이걸로 다낭갈까 사이판 갈까
              </span>
            </p>
            <p className="text-sm text-gray-500">홍길동 2024.12.16</p>
          </div>

          <div className="p-3 bg-white rounded shadow">
            <p>
              <span className="font-bold">234</span>{" "}
              <span className="text-blue-600">강릉 여름바다 보기 좋네요</span>
            </p>
            <p className="text-sm text-gray-500">홍길동 2024.12.16</p>
          </div>
        </div>

        <div className="mt-6 p-3 bg-gray-100 rounded">
          <h3 className="font-bold">페이지네이션 추가</h3>
          <p className="text-sm text-gray-600 mt-2">
            추가 내용이 여기에 표시됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeachSceneWithText;
