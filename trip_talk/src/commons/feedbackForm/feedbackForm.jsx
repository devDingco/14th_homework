'use client';

import { useState } from 'react';
import './feedbackForm.css';
import Image from 'next/image';
import FeedbackList from './feedbackList';

// type = 댓글, 문의하기
export default function FeedbackForm({ type }) {
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);

  const handleStarClick = (clickedStar) => {
    // 같은 별을 다시 클릭하면 해제
    if (star === clickedStar && star === 1) {
      setStar(0);
    } else {
      setStar(clickedStar);
    }
  };

  const handleSubmitComment = () => {
    if (comment === '') {
      alert('댓글을 입력해주세요.');
      return;
    }
    setComment('');
    setStar(0);
    setCommentList([
      ...commentList,
      { id: commentList.length + 1, name: '홍길동', comment, star, createdAt: new Date().toLocaleDateString() },
    ]);
  };

  return (
    <div className="feedback_form_wrapper">
      <div className="feedback_form_header">
        <Image src="/icons/chat.png" alt="title_image" width={24} height={24} />
        <span className="sb_16_24">{type}</span>
      </div>
      {type === '댓글' && (
        <div className="feedback_form_star_section">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Image
              key={index}
              src={`/icons/star${star >= item ? '_filled' : ''}.png`}
              alt="star"
              width={24}
              height={24}
              onClick={() => handleStarClick(index + 1)}
            />
          ))}
        </div>
      )}
      <div className="feedback_form_input_section">
        <div className="feedback_form_input_wrapper">
          <textarea
            className="feedback_form_input"
            placeholder="댓글을 입력해 주세요."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <span className="feedback_form_input_count me_16_24">{comment.length}/100</span>
        </div>
        <button
          className="feedback_form_button sb_18_24"
          onClick={handleSubmitComment}
          style={{
            backgroundColor: comment === '' ? 'var(--gray-200)' : 'var(--black)',
          }}
          disabled={comment === '' ? true : false}
        >
          {type === '문의하기' ? '문의하기' : '댓글 등록'}
        </button>
        {commentList.length === 0 && <div className="feedback_form_empty_section r_14_20">등록된 댓글이 없습니다.</div>}
        {commentList.length > 0 && <FeedbackList commentList={commentList} setCommentList={setCommentList} />}
      </div>
    </div>
  );
}
