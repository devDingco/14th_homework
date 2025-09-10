"use client";

import "./comment.css";
import { useMemo, useState, useEffect, useCallback } from "react";
import CommentComposer from "./commentComposer";
import CommentItem from "./commentItem";
import type { AppComment, NewComment } from "@_types/comment";
import { 
  fetchBoardCommentsApi, 
  createBoardCommentApi, 
  updateBoardCommentApi, 
  deleteBoardCommentApi 
} from "@/commons/apis/comment.api";
import React from "react";

interface CommentSectionProps {
  boardId: string;
  initialComments?: AppComment[];
  onCommentChange?: () => void; // 댓글 변경 시 상위 컴포넌트에 알림
}

export default function CommentSection({ 
  boardId, 
  initialComments = [], 
  onCommentChange 
}: CommentSectionProps) {
  const [comments, setComments] = useState<AppComment[]>(initialComments);
  const [loading, setLoading] = useState(false);

  const reviewCountByAuthor = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of comments) {
      counts[c.author] = (counts[c.author] || 0) + 1;
    }
    return counts;
  }, [comments]);

  // 댓글 목록 새로고침
  const refreshComments = useCallback(async () => {
    if (!boardId) return;
    
    try {
      setLoading(true);
      const fetchedComments = await fetchBoardCommentsApi(boardId);
      const formattedComments: AppComment[] = fetchedComments.map((comment: any) => ({
        id: comment._id,
        avatar: "/images/mobile/profile/img-1.png", // 기본 아바타
        author: comment.writer || "익명",
        date: new Date(comment.createdAt).toISOString().slice(0, 10).replaceAll("-", "."),
        rating: comment.rating,
        content: comment.contents,
      }));
      setComments(formattedComments);
    } catch (error) {
      console.error("댓글 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [boardId]);

  // 컴포넌트 마운트 시 댓글 로드
  useEffect(() => {
    if (boardId && initialComments.length === 0) {
      refreshComments();
    }
  }, [boardId, initialComments.length, refreshComments]);

  const addComment = async ({ rating, content, author }: NewComment) => {
    if (!boardId || !author) return; // 로그인하지 않은 경우 처리하지 않음
    
    try {
      setLoading(true);
      await createBoardCommentApi(boardId, {
        contents: content,
        rating,
        password: undefined, // 로그인 사용자는 패스워드 불필요
      });
      
      // 댓글 목록 새로고침 (로컬 상태 업데이트)
      await refreshComments();
      
      // 상위 컴포넌트에 변경 알림
      onCommentChange?.();
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (id: string) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    
    try {
      setLoading(true);
      await deleteBoardCommentApi(id, undefined, boardId);
      
      // 댓글 목록 새로고침 (로컬 상태 업데이트)
      await refreshComments();
      
      // 상위 컴포넌트에 변경 알림
      onCommentChange?.();
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const editComment = async (id: string, content: string, rating: number) => {
    try {
      setLoading(true);
      await updateBoardCommentApi(id, {
        contents: content,
        rating,
      }, undefined, boardId);
      
      // 댓글 목록 새로고침 (로컬 상태 업데이트)
      await refreshComments();
      
      // 상위 컴포넌트에 변경 알림
      onCommentChange?.();
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="comment_section">
      <CommentComposer onSubmit={addComment} disabled={loading} />

      <div className="comment_list">
        {loading && comments.length === 0 ? (
          <div className="comment_loading">댓글을 불러오는 중...</div>
        ) : (
          comments.map((c, index) => (
            <React.Fragment key={c.id}>
              <CommentItem
                avatar={c.avatar}
                author={c.author}
                date={c.date}
                rating={c.rating}
                content={c.content}
                onEdit={() => {
                  const newContent = prompt("댓글을 수정하세요:", c.content);
                  const newRating = prompt("별점을 입력하세요 (1-5):", c.rating.toString());
                  if (newContent && newRating) {
                    const rating = parseInt(newRating);
                    if (rating >= 1 && rating <= 5) {
                      editComment(c.id, newContent, rating);
                    } else {
                      alert("별점은 1-5 사이의 숫자여야 합니다.");
                    }
                  }
                }}
                onDelete={() => deleteComment(c.id)}
                disabled={loading}
              />
              {/* 댓글이 2개 이상이고 마지막 댓글이 아닐 때만 구분선 표시 */}
              {comments.length > 1 && index < comments.length - 1 && (
                <div className="comment_divider" />
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </section>
  );
}


