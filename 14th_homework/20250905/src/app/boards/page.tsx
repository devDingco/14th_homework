"use client";

import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";

// 게시글 목록을 불러오는 GraphQL 쿼리
const FETCH_BOARDS = gql`
  query FetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
      likeCount
      dislikeCount
      createdAt
      updatedAt
    }
  }
`;

// 게시글을 삭제하는 GraphQL 뮤테이션
const DELETE_BOARD = gql`
  mutation DeleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export default function BoardsPage() {
  const { data, loading, error } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD, {
    refetchQueries: [{ query: FETCH_BOARDS }],
  });

  // 게시글 삭제 핸들러
  const onClickDelete = async (boardId) => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await deleteBoard({ variables: { boardId } });
        console.log(`게시글 ${boardId}가 성공적으로 삭제되었습니다.`);
      } catch (mutationError) {
        console.error("게시글 삭제 중 오류 발생:", mutationError);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-10 w-10 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="mt-4 text-gray-500">로딩 중입니다...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-bold">
          게시글을 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-gray-800 bg-gray-50 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex flex-col min-h-[500px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">게시글 목록</h1>
          <Link
            href="/boards/new"
            className="inline-block px-6 py-2 rounded-full font-semibold text-white transition-colors duration-300 bg-orange-500 hover:bg-orange-600 shadow-md"
          >
            게시글 등록
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tl-lg">
                  번호
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  제목
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  작성자
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  날짜
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tr-lg"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.fetchBoards?.length > 0 ? (
                data.fetchBoards.map((board, index) => (
                  <tr key={board._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {data.fetchBoards.length - index}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/boards/${board._id}`}
                        className="text-blue-600 hover:text-blue-800 transition duration-300 font-medium"
                      >
                        {board.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {board.writer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(board.createdAt).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm relative">
                      <button
                        onClick={() => onClickDelete(board._id)}
                        className="p-1 rounded-full text-red-500 hover:bg-red-100 transition duration-200 focus:outline-none opacity-0 group-hover:opacity-100"
                      >
                        {/* next/image를 사용하여 삭제 아이콘을 추가합니다. */}
                        <Image
                          src="/images/delete.png" 
                          alt="삭제"
                          width={20}
                          height={20}
                          className="w-5 h-5"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500 italic">
                    게시글이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
