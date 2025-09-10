"use client";

import React from "react";
import { gql, useQuery } from "@apollo/client";

const FETCH_BOARD_COMMENTS = gql`
  query fetchBoardComments($boardId: ID!, $page: Int) {
    fetchBoardComments(boardId: $boardId, page: $page) {
      _id
      writer
      contents
      createdAt
    }
  }
`;

interface CommentListProps {
  boardId: string;
}

interface BoardCommentItem {
  _id: string;
  writer?: string | null;
  contents: string;
  createdAt: string;
}

export default function CommentList(props: CommentListProps) {
  const { data, loading, error } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { boardId: props.boardId, page: 1 },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <div className="text-center mt-4 text-gray-500">댓글을 불러오는 중...</div>;
  }
  if (error) {
    return <div className="text-center mt-4 text-red-500">댓글을 불러오는 중 오류가 발생했습니다.</div>;
  }

  const comments: BoardCommentItem[] = data?.fetchBoardComments ?? [];

  if (!comments.length) {
    return <div className="text-center mt-6 text-gray-400">등록된 댓글이 없습니다.</div>;
  }

  return (
    <div className="content-container">
      <h3 className="post-title" style={{ marginBottom: 12 }}>댓글</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {comments.map((comment) => {
          const date = new Date(comment.createdAt).toLocaleDateString("ko-KR");
          return (
            <li key={comment._id} style={{ padding: "12px 0", borderBottom: "1px solid #eee" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e5e7eb" }} />
                <div style={{ fontWeight: 600 }}>{comment.writer || "익명"}</div>
                {/* 별점(0점 고정) */}
                <div style={{ color: "#D1D5DB", marginLeft: "auto" }}>☆☆☆☆☆</div>
              </div>
              <div style={{ color: "#374151", lineHeight: 1.6 }}>{comment.contents}</div>
              <div style={{ marginTop: 6, fontSize: 12, color: "#9CA3AF" }}>{date}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


