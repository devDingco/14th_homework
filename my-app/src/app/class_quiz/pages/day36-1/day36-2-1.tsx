// src/app/class_quiz/pages/day36-1/page.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const Day36_1 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 실제 검색 API 호출 함수 (가짜 구현)
  const searchAPI = useCallback(async (query: string): Promise<string[]> => {
    // 실제로는 서버에 검색 요청을 보냅니다
    console.log(`🔍 검색 API 호출: "${query}"`);

    // 가짜 로딩 시간
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 가짜 검색 결과
    if (!query.trim()) return [];

    const mockResults = [
      `${query} 관련 결과 1`,
      `${query} 관련 결과 2`,
      `${query} 관련 결과 3`,
      `${query} 여행지 추천`,
      `${query} 숙소 정보`,
      `${query} 관광지 안내`,
    ];

    return mockResults.slice(0, Math.random() * 4 + 2); // 2-5개의 랜덤 결과
  }, []);

  // 디바운싱 검색 함수
  const debouncedSearch = useCallback(
    (query: string) => {
      // 이전 타임아웃 취소
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 새로운 타임아웃 설정 (500ms 후 검색 실행)
      timeoutRef.current = setTimeout(async () => {
        if (query.trim()) {
          setIsSearching(true);
          try {
            const results = await searchAPI(query);
            setSearchResults(results);
            setSearchCount((prev) => prev + 1);
          } catch (error) {
            console.error("검색 중 오류 발생:", error);
            setSearchResults(["검색 중 오류가 발생했습니다."]);
          } finally {
            setIsSearching(false);
          }
        } else {
          setSearchResults([]);
        }
      }, 500); // 500ms 디바운스 딜레이
    },
    [searchAPI]
  );

  // 입력 변경 핸들러
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  // 컴포넌트 언마운트 시 타임아웃 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 디바운싱 원리 설명 컴포넌트
  const DebouncingExplanation = () => (
    <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">
        🎯 디바운싱 원리 설명
      </h3>

      <div className="space-y-3 text-sm text-blue-700">
        <div className="flex items-start">
          <span className="font-bold w-6">1.</span>
          <span>
            사용자가 빠르게 타이핑할 때마다 검색 API가 호출되는 것을 방지
          </span>
        </div>

        <div className="flex items-start">
          <span className="font-bold w-6">2.</span>
          <span>입력이 멈춘 후 500ms가 지나야만 실제 검색 실행</span>
        </div>

        <div className="flex items-start">
          <span className="font-bold w-6">3.</span>
          <span>새로운 입력이 들어오면 이전 예정된 검색을 취소</span>
        </div>

        <div className="mt-4 p-3 bg-white rounded border">
          <code className="text-xs block">
            {`// 디바운싱 로직\nif (timeoutRef.current) clearTimeout(timeoutRef.current);\ntimeoutRef.current = setTimeout(search, 500);`}
          </code>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Day 36: 검색 디바운싱 직접 구현
          </h1>
          <p className="text-gray-600 mb-6">
            lodash 없이 순수 JavaScript로 디바운싱 구현하기
          </p>

          {/* 검색 입력창 */}
          <div className="mb-6">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              여행지 검색
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="여행지나 관광지를 검색해보세요..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {isSearching && (
                <div className="absolute right-3 top-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              실시간 입력:{" "}
              <span className="font-mono">{searchTerm || "(없음)"}</span>
            </div>
          </div>

          {/* 검색 결과 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                검색 결과{" "}
                {searchResults.length > 0 && `(${searchResults.length}개)`}
              </h2>
              <span className="text-sm text-gray-500">
                API 호출 횟수: {searchCount}회
              </span>
            </div>

            {isSearching ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                <p className="text-gray-500">검색 중...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{result}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchTerm ? (
              <div className="text-center py-8 text-gray-500">
                검색 결과가 없습니다.
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                검색어를 입력해주세요.
              </div>
            )}
          </div>

          {/* 디바운싱 시각화 */}
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-2">
              ⚡ 디바운싱 동작 시각화
            </h3>
            <div className="text-sm text-yellow-700 space-y-1">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>사용자 입력 발생</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span>500ms 대기 중... (새로운 입력시 취소)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>검색 API 호출</span>
              </div>
            </div>
          </div>

          <DebouncingExplanation />

          {/* 성능 비교 */}
          <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">
              📊 디바운싱 효과
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-red-50 rounded border border-red-200">
                <h4 className="font-medium text-red-700 mb-1">
                  디바운싱 없을 때
                </h4>
                <p className="text-red-600">"제주도" 입력시 API 6회 호출</p>
              </div>
              <div className="p-3 bg-green-100 rounded border border-green-300">
                <h4 className="font-medium text-green-700 mb-1">
                  디바운싱 적용시
                </h4>
                <p className="text-green-600">"제주도" 입력시 API 1회 호출</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day36_1;
