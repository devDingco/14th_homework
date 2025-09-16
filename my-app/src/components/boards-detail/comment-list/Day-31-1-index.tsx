"use client";

import React from "react";

const BeachResortScene = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-600 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        {/* 상단 헤더 */}
        <div className="bg-amber-700 text-white p-4">
          <h1 className="text-2xl font-bold">
            살어리 살어리랏다 쳥산(캐냐)애 살어리랏다멀위랑 도래랑 먹고 쳥산애
            살어리랏다얄리얄리 얄랑셩 얄라리 얄라
          </h1>
          <p className="text-sm">
            살겠노라 살겠노라. 청산에 살겠노라. 얄리얄리 얄랑셩 얄라리 얄라리
            우는구나 우는구나 새야. 자고 일어나 우는구나 새야. 너보다 시름 많은
            나도 자고 일어나 우노라. 얄리얄리 얄라셩 얄라리 얄라 갈던 밭(사래)
            갈던 밭 보았느냐. 물 아래(근처)갈던 밭 보았느냐 이끼 묻은 쟁기를
            가지고 물 아래 갈던 밭 보았느냐. 얄리얄리 얄라셩 얄라리 얄라
            이럭저럭 하여 낮일랑 지내 왔건만 올 이도 갈 이도 없는 밤일랑 또 어찌
            할 것인가. 얄리얄리 얄라셩 얄라리 얄라 어디다 던지는 돌인가 누구를
            맞히려던 돌인가. 미워할 이도 사랑할 이도 없이 맞아서 우노라.
            얄리얄리 얄라셩 얄라리 얄라 살겠노라 살겠노라. 바다에 살겠노라.
            나문재, 굴, 조개를 먹고 바다에 살겠노라. 얄리얄리 얄라셩 얄라리 얄라
            가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라. 얄리얄리 얄라셜
            얄라리 얄라 가다보니 배불룩항 술독에 독한 술을 빚는구나. 조롱박꽃
            모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1] 얄리얄리
            얄라셩 얄라리 얄라
          </p>
        </div>

        <div className="p-4 bg-amber-50">
          <div className="text-right text-gray-600 mb-4">
            <strong>주요</strong>
            <br />
            <span>2024/10/1</span>
          </div>

          {/* 해변 장면 */}
          <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
            {/* 하늘 */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-sky-300 to-sky-200"></div>

            {/* 바다 */}
            <div className="absolute top-1/3 left-0 w-full h-1/6 bg-blue-500"></div>

            {/* 모래사장 */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-amber-100">
              {/* 모래 텍스처 */}
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-amber-200 opacity-30"
                  style={{
                    width: Math.random() * 8 + 2 + "px",
                    height: Math.random() * 8 + 2 + "px",
                    left: Math.random() * 100 + "%",
                    top: Math.random() * 100 + "%",
                  }}
                ></div>
              ))}
            </div>

            {/* 첫 번째 파라솔과 의자 세트 */}
            <div className="absolute bottom-1/2 left-1/4 transform -translate-x-1/2">
              {/* 파라솔 */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <div className="relative w-12 h-24">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-brown-800"></div>
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-10 bg-red-600 rounded-t-full"></div>
                    <div className="absolute top-2 left-0 w-full h-2 bg-white opacity-70"></div>
                    <div className="absolute top-5 left-0 w-full h-3 bg-red-600"></div>
                  </div>
                </div>
              </div>

              {/* 의자 세트 */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-6">
                <div className="w-10 h-10 bg-blue-500 rounded-lg"></div>
                <div className="w-10 h-10 bg-blue-500 rounded-lg"></div>
              </div>
            </div>

            {/* 두 번째 파라솔과 의자 세트 */}
            <div className="absolute bottom-1/2 right-1/4 transform translate-x-1/2">
              {/* 파라솔 */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <div className="relative w-12 h-24">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-brown-800"></div>
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-10 bg-striped-blue rounded-t-full"></div>
                    <div className="absolute top-2 left-0 w-full h-2 bg-white opacity-70"></div>
                    <div className="absolute top-5 left-0 w-full h-3 bg-blue-600"></div>
                  </div>
                </div>
              </div>

              {/* 의자 세트 */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-6">
                <div className="w-10 h-10 bg-green-500 rounded-lg"></div>
                <div className="w-10 h-10 bg-green-500 rounded-lg"></div>
              </div>
            </div>

            {/* 아래쪽 의자 두 개 */}
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 flex space-x-10">
              <div className="w-12 h-12 bg-yellow-400 rounded-md"></div>
              <div className="w-12 h-12 bg-yellow-400 rounded-md"></div>
            </div>

            {/* 갈색 배경 속 아늑한 소파 */}
            <div className="absolute bottom-10 right-10 w-24 h-16 bg-brown-500 rounded-lg">
              <div className="absolute -top-2 left-2 w-20 h-4 bg-brown-600 rounded-t-md"></div>
              <div className="absolute bottom-2 left-2 w-4 h-6 bg-brown-700 rounded-sm"></div>
              <div className="absolute bottom-2 right-2 w-4 h-6 bg-brown-700 rounded-sm"></div>
            </div>
          </div>

          {/* 텍스트 내용 */}
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-lg font-semibold text-center">
              살겠노라 살겠노라
            </p>
          </div>

          {/* 애술리의 별 3개 답장 */}
          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
            <div className="flex items-center mb-2">
              <span className="font-bold text-pink-700">애술리</span>
              <div className="ml-2 flex">
                {[...Array(3)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-700">답장 내용이 여기에 표시됩니다.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-striped-blue {
          background: repeating-linear-gradient(
            45deg,
            #3b82f6,
            #3b82f6 10px,
            #2563eb 10px,
            #2563eb 20px
          );
        }
      `}</style>
    </div>
  );
};

export default BeachResortScene;
