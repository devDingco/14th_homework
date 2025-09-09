"use client";

import "./comment.css";
import Icon from "@utils/iconColor";
import { useMemo, useState } from "react";
import type { NewComment } from "@_types/comment";
import { useAuth } from "@/commons/hooks/useAuth";
import { useLoginRequired } from "@/commons/hooks/useLoginRequired";
import LoginRequiredModal from "@/(components)/modal/LoginRequiredModal";

export default function CommentComposer({ 
  onSubmit, 
  disabled = false 
}: { 
  onSubmit?: (c: NewComment) => void;
  disabled?: boolean;
}) {
  const { user, isLoggedIn } = useAuth();
  const { showLoginRequiredModal, checkLoginRequired, closeLoginRequiredModal } = useLoginRequired();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setContent] = useState("");
  const maxLength = 100;

  const isValid = useMemo(() => content.trim().length > 0 && rating > 0 && !disabled && isLoggedIn, [content, rating, disabled, isLoggedIn]);

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (!checkLoginRequired()) return;
    if (!isValid) return;
    
    onSubmit?.({ 
      rating, 
      content: content.trim(),
      author: user?.name
    });
    setContent("");
    setRating(0);
  };

  const currentCount = content.length;

  return (
    <>
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
            placeholder={isLoggedIn ? "댓글을 입력해 주세요." : "로그인 후 댓글을 작성할 수 있습니다."}
            maxLength={maxLength}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={disabled || !isLoggedIn}
          />
          <span className="comment_counter r_12_16">{currentCount}/{maxLength}</span>
        </div>

        <div className="comment_actions">
          <button type="button" className="comment_submit_button sb_16_24" onClick={handleSubmit} disabled={!isValid}>
            댓글 등록
          </button>
        </div>
      </section>

      <LoginRequiredModal 
        isOpen={showLoginRequiredModal}
        onClose={closeLoginRequiredModal}
        message="댓글을 작성하려면 로그인이 필요합니다."
      />
    </>
  );
}


