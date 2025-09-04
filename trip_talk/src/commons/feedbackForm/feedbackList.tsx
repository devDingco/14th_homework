'use client';

import Image from 'next/image';
import { useState } from 'react';
import EditComment from './editComment';
import { BoardComment } from '@/types/graphql';

interface Comment {
  id: number;
  name: string;
  comment: string;
  star: number;
  createdAt: string;
}

interface FeedbackListProps {
  commentList: Comment[];
  setCommentList: (commentList: Comment[]) => void;
  comments?: BoardComment[];
  commentsLoading?: boolean;
  commentsError?: any;
}

export default function FeedbackList({
  commentList,
  setCommentList,
  comments,
  commentsLoading,
  commentsError,
}: FeedbackListProps) {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const handleEditComment = (id: number) => {
    setEditingCommentId(id);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const handleDeleteComment = (id: number) => {
    const updatedCommentList = commentList.filter((item) => item.id !== id);
    setCommentList(updatedCommentList);
    alert('댓글이 삭제되었습니다.');
  };

  // 로딩 및 에러 처리
  if (commentsLoading) {
    return (
      <div className="feedback_list_wrapper">
        <div className="feedback_loading">댓글을 불러오는 중...</div>
      </div>
    );
  }

  if (commentsError) {
    return (
      <div className="feedback_list_wrapper">
        <div className="feedback_error">댓글을 불러오는데 실패했습니다.</div>
      </div>
    );
  }

  // 실제 댓글 데이터 사용 (API 데이터가 있으면 우선 사용)
  const displayComments = comments && comments.length > 0 ? comments : commentList;

  return (
    <div className="feedback_list_wrapper">
      {comments && comments.length > 0
        ? // API에서 가져온 실제 댓글 표시
          comments.map((comment) => (
            <div key={comment._id} className="feedback_list_item">
              <div className="feedback_list_item_header">
                <div className="feedback_list_item_profile">
                  <Image
                    src={comment.user?.picture || '/images/profile/profile06.png'}
                    alt="profile"
                    width={24}
                    height={24}
                  />
                  <span className="feedback_list_item_name l_14_20">{comment.user?.name || comment.writer}</span>
                </div>
                <div className="feedback_list_item_date l_14_20">
                  {new Date(comment.createdAt).toLocaleDateString('ko-KR')}
                </div>
              </div>
              <div className="feedback_list_item_star">
                {[...Array(5)].map((_, index) => (
                  <Image
                    key={index}
                    src={index < comment.rating ? '/icons/star_filled.png' : '/icons/star.png'}
                    alt="star"
                    width={16}
                    height={16}
                  />
                ))}
              </div>
              <div className="feedback_list_item_comment r_14_20">{comment.contents}</div>
            </div>
          ))
        : // 기존 로컬 댓글 표시 (댓글 작성 기능용)
          commentList.map((item) => (
            <div key={item.id} className="feedback_list_item">
              {editingCommentId === item.id ? (
                <EditComment
                  comment={item}
                  onCancel={handleCancelEdit}
                  onSave={(updatedComment: Comment) => {
                    const updatedList = commentList.map((comment) =>
                      comment.id === item.id ? updatedComment : comment
                    );
                    setCommentList(updatedList);
                    setEditingCommentId(null);
                  }}
                />
              ) : (
                <>
                  <div className="feedback_list_item_header">
                    <div className="feedback_list_item_profile">
                      <Image src="/images/profile/profile06.png" alt="profile" width={24} height={24} />
                      <span className="l_14_20">{item.name}</span>
                    </div>
                    <div className="feedback_list_item_star">
                      {[1, 2, 3, 4, 5].map((star, index) => (
                        <Image
                          key={index}
                          src={`/icons/star${item.star >= index + 1 ? '_filled' : ''}.png`}
                          alt="star"
                          width={24}
                          height={24}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="feedback_list_item_content r_16_24">{item.comment}</div>
                  <div className="feedback_list_item_date r_14_20">{item.createdAt}</div>
                  <div className="feedback_list_tools">
                    <div className="feedback_list_tool">
                      <Image
                        src="/icons/pencil.png"
                        alt="edit_image"
                        width={20}
                        height={20}
                        onClick={() => handleEditComment(item.id)}
                      />
                    </div>
                    <div className="feedback_list_tool">
                      <Image
                        src="/icons/close_dark.png"
                        alt="delete_image"
                        width={20}
                        height={20}
                        onClick={() => handleDeleteComment(item.id)}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
    </div>
  );
}
