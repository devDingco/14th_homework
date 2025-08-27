'use client';

import Image from 'next/image';
import { useState } from 'react';
import EditComment from './editComment';

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
}

export default function FeedbackList({ commentList, setCommentList }: FeedbackListProps) {
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

  return (
    <div className="feedback_list_wrapper">
      {commentList.map((item) => (
        <div key={item.id} className="feedback_list_item">
          {editingCommentId === item.id ? (
            <EditComment
              comment={item}
              onCancel={handleCancelEdit}
              onSave={(updatedComment: Comment) => {
                const updatedList = commentList.map((comment) => (comment.id === item.id ? updatedComment : comment));
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
