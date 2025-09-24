// src/app/trip-talk/page.tsx
"use client";

import React, { useState } from "react";

const TripTalkPage = () => {
  const [activeTab, setActiveTab] = useState("talk");

  const boardData = [
    {
      id: 243,
      title: "제주 살이 1일차",
      author: "홍길동",
      date: "2024.12.16",
      hasAttachment: false,
    },
    {
      id: 242,
      title: "강남 살이 100년차",
      author: "홍길동",
      date: "2024.12.16",
      hasAttachment: false,
    },
    {
      id: 241,
      title: "길 걷고 있었는네 고양이한테 간택 받았어요",
      author: "홍길동",
      date: "2024.12.16",
      hasAttachment: false,
    },
    {
      id: 240,
      title: "오늘 날씨 너무 좋아서 바다보러 왔어요~",
      author: "홍길동",
      date: "2024.12.16",
      hasAttachment: false,
    },
    {
      id: 239,
      title: "누가 양양 핫하다고 했어 나밖에 없는데?",
      author: "홍길동",
      date: "2024.12.16",
      hasAttachment: false,
    },
    {
      id: 238,
      title: "여름에 보드타고 싶은거 저밖에 없나요 ^_^",
      author: "홍길동",
      date: "2024.12.16",
      hasAttachment: true,
    },
    {
      id: 237,
      title:
        "사무실에서 과자 너무 많이 먹은거 같아요 다이어트하러 여행 가야겠어요",
      author: "홍길동",
      date: "2024.12.16",
      hasAttachment: false,
    },
    {
      id: 236,
      title: "여기는 기승전 여행이네요 ㅋㅋㅋ",
      author: "홍길동",
      date: "2024.12.16",
      hasAttachment: false,
    },
    {
      id: 235,
      title: "상여금 들어왔는데 이걸로 다낭갈까 사이판 갈까",
      author: "홍길동",
      date: "2024.12.16",
      hasAttachment: false,
    },
    {
      id: 234,
      title: "강릉 여름바다 보기 좋네요",
      author: "홍길동",
      date: "2024.12.16",
      hasAttachment: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 상단 헤더 */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">TRiP TRiP</h1>
            <nav className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "talk"
                    ? "bg-white text-blue-600"
                    : "hover:bg-blue-500"
                }`}
                onClick={() => setActiveTab("talk")}
              >
                트립토크
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "ticket"
                    ? "bg-white text-blue-600"
                    : "hover:bg-blue-500"
                }`}
                onClick={() => setActiveTab("ticket")}
              >
                숙박권 구매
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "mypage"
                    ? "bg-white text-blue-600"
                    : "hover:bg-blue-500"
                }`}
                onClick={() => setActiveTab("mypage")}
              >
                마이 페이지
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* 해변 배경 섹션 */}
      <div className="relative h-80 overflow-hidden">
        {/* 하늘 배경 */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-200"></div>

        {/* 바다 */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-400 to-blue-300"></div>

        {/* 모래사장 */}
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-yellow-100">
          {/* 모래 텍스처 */}
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-yellow-200 opacity-30"
              style={{
                width: Math.random() * 8 + 2 + "px",
                height: Math.random() * 8 + 2 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
            ></div>
          ))}
        </div>

        {/* 파라솔과 의자 */}
        <div className="absolute bottom-20 left-1/3 transform -translate-x-1/2">
          {/* 파라솔 */}
          <div className="relative">
            {/* 파라솔 기둥 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-32 bg-brown-600"></div>

            {/* 파라솔 지붕 */}
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
              <div className="w-48 h-16 bg-red-500 rounded-t-full relative">
                {/* 파라솔 줄무늬 */}
                <div className="absolute top-0 left-0 w-full h-4 bg-white opacity-70"></div>
                <div className="absolute top-6 left-0 w-full h-4 bg-red-600"></div>
                <div className="absolute top-12 left-0 w-full h-4 bg-white opacity-70"></div>
              </div>
            </div>
          </div>

          {/* 의자 */}
          <div className="absolute bottom-0 left-1/2 transform translate-x-8">
            <div className="w-16 h-20 bg-white rounded-lg shadow-lg relative">
              {/* 의자 등받이 */}
              <div className="absolute -top-4 left-0 w-full h-4 bg-white rounded-t-lg"></div>
              {/* 의자 다리 */}
              <div className="absolute -bottom-2 left-2 w-3 h-2 bg-gray-400 rounded-sm"></div>
              <div className="absolute -bottom-2 right-2 w-3 h-2 bg-gray-400 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* 두 번째 파라솔 세트 */}
        <div className="absolute bottom-20 right-1/3 transform translate-x-1/2">
          {/* 파라솔 */}
          <div className="relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-28 bg-brown-600"></div>
            <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2">
              <div className="w-40 h-14 bg-blue-500 rounded-t-full relative">
                <div className="absolute top-0 left-0 w-full h-3 bg-white opacity-70"></div>
                <div className="absolute top-5 left-0 w-full h-3 bg-blue-600"></div>
                <div className="absolute top-10 left-0 w-full h-3 bg-white opacity-70"></div>
              </div>
            </div>
          </div>

          {/* 의자 */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-12">
            <div className="w-14 h-18 bg-white rounded-lg shadow-lg relative">
              <div className="absolute -top-3 left-0 w-full h-3 bg-white rounded-t-lg"></div>
              <div className="absolute -bottom-2 left-2 w-2 h-2 bg-gray-400 rounded-sm"></div>
              <div className="absolute -bottom-2 right-2 w-2 h-2 bg-gray-400 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 게시판 컨텐츠 */}
      <div className="max-w-4xl mx-auto px-4 py-8 -mt-20 relative z-10">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* 게시판 헤더 */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold">트립토크 게시판</h2>
              <span className="text-blue-100">YYYY_MM_DD : YYYY_MM_DD</span>
            </div>
            <p className="text-blue-100 text-sm">서치바 추가:</p>
          </div>

          {/* 게시판 목록 */}
          <div className="p-6">
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-2">제목</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="font-medium w-12">번호</span>
                  <span>제목:</span>
                </li>
                <li className="flex items-center ml-4">
                  <span className="font-medium w-12">-</span>
                  <span>제목:</span>
                </li>
                <li className="flex items-center ml-4">
                  <span className="font-medium w-12">-</span>
                  <span>제목</span>
                </li>
              </ul>
            </div>

            {/* 게시글 목록 */}
            <div className="space-y-3">
              {boardData.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <span className="w-16 text-sm font-medium text-gray-500">
                    {item.id}
                  </span>
                  <div className="flex-1">
                    <span className="text-gray-800">
                      {item.title}
                      {item.hasAttachment && (
                        <span className="text-blue-500 ml-1">^_^</span>
                      )}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">
                      {item.author}
                    </span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 하단 정보 */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-gray-600"></p>
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 TRiP TRiP. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">트립토크 게시판</p>
        </div>
      </footer>
    </div>
  );
};

export default TripTalkPage;
