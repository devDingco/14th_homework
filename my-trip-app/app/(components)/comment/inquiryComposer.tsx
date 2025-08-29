"use client";

import "./comment.css";
import { useState } from "react";
import Icon from "@utils/iconColor";
import type { NewInquiryComment } from "@/types/comment";

export default function InquiryComposer({ onSubmit }: { onSubmit?: (c: NewInquiryComment) => void }) {
  const [content, setContent] = useState("");
  const maxLength = 100;

  const isValid = content.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit?.({ content: content.trim() });
    setContent("");
  };

  const currentCount = content.length;

  return (
    <section className="inquiry_composer_container">
      <div className="inquiry_composer_header">
        <Icon outline black name="chat" width={24} height={24} />
        <h2 className="sb_16_24 inquiry_title">문의하기</h2>
      </div>

      <div className="inquiry_textarea_wrap">
        <textarea
          className="inquiry_textarea r_16_24"
          placeholder="궁금한 사항을 입력해 주세요."
          maxLength={maxLength}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <span className="inquiry_counter r_12_16">{currentCount}/{maxLength}</span>
      </div>

      <div className="inquiry_actions">
        <button type="button" className="inquiry_submit_button sb_16_24" onClick={handleSubmit} disabled={!isValid}>
          문의하기
        </button>
      </div>
    </section>
  );
}
