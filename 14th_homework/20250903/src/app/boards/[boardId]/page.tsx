"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Image from "next/image";
import React from "react";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
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

export default function BoardsDetail() {
  const { boardId } = useParams() as { boardId: string };

  const { data, loading, error } = useQuery(FETCH_BOARD, {
    variables: { boardId },
  });

  const renderContentWithBreaks = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  if (loading) {
    return <div className="text-center mt-20">로딩 중입니다...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">에러 발생: {error.message}</div>;
  }

  const boardData = data?.fetchBoard;

  if (!boardData) {
    return <div className="text-center mt-20">게시글을 찾을 수 없습니다.</div>;
  }

  // 날짜 포맷 변경
  const formattedDate = new Date(boardData.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\./g, '.').trim();

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* ✅ 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 leading-snug">
          {boardData.title}
        </h1>
        <div className="flex items-center text-gray-500 text-sm">
          <Image
            src="/images/profile_img.png"
            alt="프로필"
            width={24}
            height={24}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="mr-4">{boardData.writer}</span>
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* ✅ 본문 */}
      <div className="mb-6">
        {/*
          TODO: 게시글에 이미지가 있다면 이미지를 표시하는 로직 추가
        */}
        <Image
          src="/images/beach.png"
          alt="바다 풍경"
          width={384}
          height={216}
          className="rounded-md mb-4"
        />
        <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
          {renderContentWithBreaks(boardData.contents)}
        </div>
      </div>

      {/* ✅ 비디오 섹션 */}
      <div className="relative mb-6">
        <Image
          src="/images/video_img.jpg"
          alt="영상"
          width={768}
          height={432}
          className="rounded-md"
        />
        <Image
          src="/images/play_button.png"
          alt="재생 버튼"
          width={48}
          height={48}
          className="absolute inset-0 m-auto w-12 h-12 cursor-pointer"
        />
      </div>

      {/* ✅ 푸터 */}
      <div className="flex justify-between items-center border-t pt-4">
        {/* 좋아요/싫어요 */}
        <div className="flex space-x-6">
          <div className="flex items-center space-x-1">
            <Image
              src="/images/good.png"
              alt="좋아요"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span>{boardData.likeCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Image
              src="/images/bad.png"
              alt="싫어요"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span>{boardData.dislikeCount}</span>
          </div>
        </div>

        {/* 목록 / 수정 */}
        <div className="flex space-x-4">
          <button className="flex items-center border px-3 py-1 rounded">
            <Image
              src="/images/list.png"
              alt="목록"
              width={20}
              height={20}
              className="w-5 h-5 mr-1"
            />
            목록으로
          </button>
          <button className="flex items-center border px-3 py-1 rounded">
            <Image
              src="/images/edit_pen.png"
              alt="수정"
              width={20}
              height={20}
              className="w-5 h-5 mr-1"
            />
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}
