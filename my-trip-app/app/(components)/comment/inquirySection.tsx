"use client";

import "./comment.css";
import { useState } from "react";
import InquiryComposer from "./inquiryComposer";
import InquiryItem from "./inquiryItem";
import type { InquiryComment, NewInquiryComment, NewInquiryReply } from "@/types/comment";
import React from "react";

export default function InquirySection({ initialComments = [] as InquiryComment[] }) {
  const [comments, setComments] = useState<InquiryComment[]>(initialComments);

  const addComment = ({ content }: NewInquiryComment) => {
    const newComment: InquiryComment = {
      id: String(Date.now()),
      avatar: "/images/mobile/profile/img-1.png",
      author: "익명",
      date: new Date().toISOString().slice(0, 10).replaceAll("-", "."),
      content,
      replies: [],
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const deleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const editComment = (id: string) => {
    // 댓글 수정 로직 구현
    console.log("Edit comment:", id);
  };

  const addReply = (commentId: string, reply: NewInquiryReply) => {
    const newReply = {
      id: String(Date.now()),
      avatar: "/images/mobile/profile/img-2.png",
      author: "연재자",
      date: new Date().toISOString().slice(0, 10).replaceAll("-", "."),
      content: reply.content,
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            }
          : comment
      )
    );
  };

  const editReply = (commentId: string, replyId: string) => {
    // 대댓글 수정 로직 구현
    console.log("Edit reply:", commentId, replyId);
  };

  const deleteReply = (commentId: string, replyId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: (comment.replies || []).filter((reply) => reply.id !== replyId),
            }
          : comment
      )
    );
  };

  return (
    <section className="inquiry_section">
      <InquiryComposer onSubmit={addComment} />

      <div className="inquiry_list">
        {comments.length === 0 ? (
          <div className="inquiry_empty_message">
            <p className="r_14_20">등록된 댓글이 없습니다.</p>
          </div>
        ) : (
          comments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              <InquiryItem
                comment={comment}
                onEdit={editComment}
                onDelete={deleteComment}
                onReply={addReply}
                onEditReply={editReply}
                onDeleteReply={deleteReply}
              />
              {/* 문의가 2개 이상이고 마지막 문의가 아닐 때만 구분선 표시 */}
              {comments.length > 1 && index < comments.length - 1 && (
                <div className="inquiry_divider" />
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </section>
  );
}
