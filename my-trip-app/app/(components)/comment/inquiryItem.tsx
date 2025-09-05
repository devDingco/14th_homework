"use client";

import "./comment.css";
import Icon from "@utils/iconColor";
import { useState } from "react";
import Image from "next/image";
import type { InquiryComment, InquiryReply, NewInquiryReply } from "@_types/comment";

export interface InquiryItemProps {
  comment: InquiryComment;
  onEdit?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
  onReply?: (commentId: string, reply: NewInquiryReply) => void;
  onEditReply?: (commentId: string, replyId: string) => void;
  onDeleteReply?: (commentId: string, replyId: string) => void;
}

export default function InquiryItem({ 
  comment, 
  onEdit, 
  onDelete, 
  onReply, 
  onEditReply, 
  onDeleteReply 
}: InquiryItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const maxLength = 100;

  const handleReplySubmit = () => {
    if (replyContent.trim().length === 0) return;
    onReply?.(comment.id, { content: replyContent.trim() });
    setReplyContent("");
    setIsReplying(false);
  };

  const handleReplyCancel = () => {
    setIsReplying(false);
    setReplyContent("");
  };

  const currentReplyCount = replyContent.length;

  return (
    <article className="inquiry_item">
      <header className="inquiry_item_header">
        <div className="inquiry_header_left">
          <div className="inquiry_author">
            <Image src={comment.avatar} alt={comment.author} width={24} height={24} className="inquiry_avatar" />
            <span className="l_14_20" style={{ color: "var(--gray-70)" }}>{comment.author}</span>
          </div>
        </div>
        <div className="inquiry_actions_inline">
          <button type="button" className="inquiry_icon_btn" onClick={() => onEdit?.(comment.id)} aria-label="수정">
            <Icon outline name="edit" color="var(--gray-50)" width={16} height={16} />
          </button>
          <button type="button" className="inquiry_icon_btn" onClick={() => onDelete?.(comment.id)} aria-label="삭제">
            <Icon outline name="close" color="var(--gray-50)" width={16} height={16} />
          </button>
        </div>
      </header>

      <p className="inquiry_item_content r_16_24">{comment.content}</p>
      <time className="inquiry_item_date r_14_20" dateTime={comment.date}>{comment.date}</time>
      
      <div className="inquiry_reply_action_wrap">
        <button 
          id="inquiry_reply_button"
          type="button" 
          className="inquiry_reply_button" 
          onClick={() => setIsReplying(!isReplying)}
        >
          <Icon outline name="reply" black width={24} height={24} />
          <span className="l_14_20" style={{ color: "var(--black)" }}>답변 하기</span>
        </button>
      </div>

      {/* 대댓글 입력 영역 */}
      {isReplying && (
        <div className="inquiry_reply_input">
          <div className="inquiry_reply_textarea_wrap">
            <textarea
              className="inquiry_reply_textarea r_14_20"
              placeholder="답변 내용을 입력해 주세요."
              maxLength={maxLength}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <span className="inquiry_reply_counter r_12_16">{currentReplyCount}/{maxLength}</span>
          </div>
          <div className="inquiry_reply_actions">
            <button type="button" className="inquiry_reply_cancel_button r_14_20" onClick={handleReplyCancel}>
              취소
            </button>
            <button 
              type="button" 
              className="inquiry_reply_submit_button sb_14_20" 
              onClick={handleReplySubmit}
              disabled={replyContent.trim().length === 0}
            >
              답변하기
            </button>
          </div>
        </div>
      )}

      {/* 대댓글 목록 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="inquiry_replies">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="inquiry_reply_item">
              <header className="inquiry_reply_header">
                <div className="inquiry_reply_author">
                  <Image src={reply.avatar} alt={reply.author} width={20} height={20} className="inquiry_reply_avatar" />
                  <span className="sb_12_16">{reply.author}</span>
                </div>
                <div className="inquiry_reply_actions_inline">
                  <button 
                    type="button" 
                    className="inquiry_icon_btn" 
                    onClick={() => onEditReply?.(comment.id, reply.id)} 
                    aria-label="수정"
                  >
                    <Icon outline name="edit" color="var(--gray-50)" width={14} height={14} />
                  </button>
                  <button 
                    type="button" 
                    className="inquiry_icon_btn" 
                    onClick={() => onDeleteReply?.(comment.id, reply.id)} 
                    aria-label="삭제"
                  >
                    <Icon outline name="close" color="var(--gray-50)" width={14} height={14} />
                  </button>
                </div>
              </header>
              <p className="inquiry_reply_content r_12_16">{reply.content}</p>
              <time className="inquiry_reply_date r_10_14" dateTime={reply.date}>{reply.date}</time>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
