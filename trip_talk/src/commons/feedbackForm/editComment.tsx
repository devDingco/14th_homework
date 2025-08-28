'use client';

import './editComment.css';
import Image from 'next/image';
import { useState, ChangeEvent } from 'react';

interface Comment {
  id: number;
  name: string;
  comment: string;
  star: number;
  createdAt: string;
}

interface EditCommentProps {
  comment: Comment;
  onCancel: () => void;
  onSave: (comment: Comment) => void;
}

export default function EditComment({ comment, onCancel, onSave }: EditCommentProps) {
  const [password, setPassword] = useState('');
  const [newComment, setNewComment] = useState(comment.comment);

  const handleSubmit = () => {
    if (password === '') {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    // 전체 댓글 객체를 전달
    onSave({
      ...comment,
      comment: newComment,
    });
    onCancel();
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  return (
    <div className="edit_comment_wrapper">
      <div className="edit_comment_star_section">
        <div>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Image
              key={index}
              src={`/icons/star${comment.star >= item ? '_filled' : ''}.png`}
              alt="star"
              width={24}
              height={24}
            />
          ))}
        </div>
      </div>
      <div className="edit_comment_auth_section">
        <div className="edit_comment_auth_item">
          <label className="edit_comment_auth_label me_16_24">
            작성자<span>*</span>
          </label>
          <input className="edit_comment_input r_16_24" type="text" value={comment.name} disabled />
        </div>
        <div className="edit_comment_auth_item">
          <label className="edit_comment_auth_label me_16_24">
            비밀번호<span>*</span>
          </label>
          <input
            className="edit_comment_input active r_16_24"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </div>
      <div className="edit_comment_content_section">
        <textarea className="edit_comment_textarea me_16_24" value={newComment} onChange={handleCommentChange} />
        <span className="edit_comment_textarea_count me_16_24">
          {newComment.length === 0 ? 0 : newComment.length}/100
        </span>
      </div>
      <div className="edit_comment_button_section">
        <button className="edit_comment_button sb_18_24" onClick={onCancel}>
          취소
        </button>
        <button className="edit_comment_button submit sb_18_24" onClick={handleSubmit}>
          수정하기
        </button>
      </div>
    </div>
  );
}
