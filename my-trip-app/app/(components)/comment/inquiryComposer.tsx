"use client";

import "./comment.css";
import { useState } from "react";
import Icon from "@utils/iconColor";
import type { NewInquiryComment } from "@/_types/comment";
import { useAuth } from "@/commons/hooks/useAuth";
import { useLoginRequired } from "@/commons/hooks/useLoginRequired";
import LoginRequiredModal from "@/(components)/modal/LoginRequiredModal";

export default function InquiryComposer({ onSubmit }: { onSubmit?: (c: NewInquiryComment) => void }) {
  const { user, isLoggedIn } = useAuth();
  const { showLoginRequiredModal, checkLoginRequired, closeLoginRequiredModal } = useLoginRequired();
  const [content, setContent] = useState("");
  const maxLength = 100;

  const isValid = content.trim().length > 0 && isLoggedIn;

  const handleSubmit = () => {
    if (!checkLoginRequired()) return;
    if (!isValid) return;
    
    onSubmit?.({ 
      content: content.trim(),
      author: user?.name
    });
    setContent("");
  };

  const currentCount = content.length;

  return (
    <>
      <section className="inquiry_composer_container">
        <div className="inquiry_composer_header">
          <Icon outline black name="chat" width={24} height={24} />
          <h2 className="sb_16_24 inquiry_title">문의하기</h2>
        </div>

        <div className="inquiry_textarea_wrap">
          <textarea
            className="inquiry_textarea r_16_24"
            placeholder={isLoggedIn ? "궁금한 사항을 입력해 주세요." : "로그인 후 문의를 작성할 수 있습니다."}
            maxLength={maxLength}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={!isLoggedIn}
          />
          <span className="inquiry_counter r_12_16">{currentCount}/{maxLength}</span>
        </div>

        <div className="inquiry_actions">
          <button type="button" className="inquiry_submit_button sb_16_24" onClick={handleSubmit} disabled={!isValid}>
            문의하기
          </button>
        </div>
      </section>

      <LoginRequiredModal 
        isOpen={showLoginRequiredModal}
        onClose={closeLoginRequiredModal}
        message="문의를 작성하려면 로그인이 필요합니다."
      />
    </>
  );
}
