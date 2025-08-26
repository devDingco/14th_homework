"use client";

import "./comment.css";
import Icon from "@utils/iconColor";
import { useMemo, useState } from "react";

export default function CommentComposer({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setContent] = useState("");
  const maxLength = 100;

  const isValid = useMemo(() => content.trim().length > 0 && rating > 0, [content, rating]);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit?.({ rating, content: content.trim() });
    setContent("");
    setRating(0);
  };

  const currentCount = content.length;

  return (
    <section className="comment_composer_container">
      <h2 className="sb_16_24 comment_title">댓글</h2>

      <div className="comment_rating_row">
        {Array.from({ length: 5 }).map((_, index) => {
          const value = index + 1;
          const active = (hover || rating) >= value;
          return (
            <button
              key={value}
              type="button"
              className="comment_star_button"
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleStarClick(value)}
              aria-label={`${value}점`}
            >
              {active ? (
                <Icon filled name="star" color="yellow" width={20} height={20} />
              ) : (
                <Icon filled name="star" color="var(--gray-30)" width={20} height={20} />
              )}
            </button>
          );
        })}
      </div>

      <div className="comment_textarea_wrap">
        <textarea
          className="comment_textarea r_16_24"
          placeholder="댓글을 입력해 주세요."
          maxLength={maxLength}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <span className="comment_counter r_12_16">{currentCount}/{maxLength}</span>
      </div>

      <div className="comment_actions">
        <button type="button" className="comment_submit_button sb_16_24" onClick={handleSubmit} disabled={!isValid}>
          댓글 등록
        </button>
      </div>
    </section>
  );
}


