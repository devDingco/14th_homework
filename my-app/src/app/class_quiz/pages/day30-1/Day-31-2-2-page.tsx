"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";

interface Board {
  id: number;
  title: string;
  writer: string;
  createdAt: string;
}

const Day30_2 = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchBoards = useCallback(
    async (pageNum: number) => {
      if (loading) return;

      setLoading(true);
      try {
        // 실제 API 호출로 변경해야 합니다
        const response = await fetch(`/api/boards?page=${pageNum}&limit=10`);
        const data = await response.json();

        if (data.boards.length === 0) {
          setHasMore(false);
        } else {
          setBoards((prev) => [...prev, ...data.boards]);
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error fetching boards:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  // 쓰로틀링 함수
  const throttle = useCallback((func: () => void, delay: number) => {
    if (throttleTimeout.current) return;

    throttleTimeout.current = setTimeout(() => {
      func();
      throttleTimeout.current = null;
    }, delay);
  }, []);

  const checkScroll = useCallback(() => {
    if (!containerRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 50;

    if (isBottom) {
      throttle(() => fetchBoards(page), 300);
    }
  }, [loading, hasMore, page, fetchBoards, throttle]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScroll);
    return () => container.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  useEffect(() => {
    // 초기 데이터 로드
    fetchBoards(1);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">게시글 목록 (직접 구현)</h1>

      <div
        ref={containerRef}
        className="h-[500px] overflow-y-auto border border-gray-300 rounded-lg p-4"
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">제목</th>
              <th className="border border-gray-300 p-2">작성자</th>
              <th className="border border-gray-300 p-2">작성일</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((board) => (
              <tr key={board.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2 text-center">
                  {board.id}
                </td>
                <td className="border border-gray-300 p-2">{board.title}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {board.writer}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {new Date(board.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && (
          <div className="flex justify-center py-4">
            <div>로딩 중...</div>
          </div>
        )}

        {!hasMore && (
          <div className="text-center py-4 text-gray-500">
            모든 게시글을 불러왔습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default Day30_2;
