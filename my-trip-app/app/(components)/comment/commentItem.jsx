"use client";

import "./comment.css";
import Icon from "@utils/iconColor";

export default function CommentItem({ avatar, author, date, rating, content, onEdit, onDelete }) {
  return (
    <article className="comment_item">
      <header className="comment_item_header">
        <div className="comment_header_left">
          <div className="comment_author">
            <img src={avatar} alt={author} width={24} height={24} className="comment_avatar" />
            <span className="sb_14_20">{author}</span>
          </div>
          <div className="comment_item_rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="star_glyph"
                aria-hidden="true"
                style={{ color: i < rating ? "#FFC107" : "var(--gray-30)" }}
              >
                {i < rating ? "★" : "☆"}
              </span>
            ))}
            <span className="rating_count r_12_16">{rating}/5</span>
          </div>
        </div>
        <div className="comment_actions_inline">
          <button type="button" className="comment_icon_btn" onClick={onEdit} aria-label="수정">
            <Icon outline name="edit" color="var(--gray-50)" width={16} height={16} />
          </button>
          <button type="button" className="comment_icon_btn" onClick={onDelete} aria-label="삭제">
            <Icon outline name="close" color="var(--gray-50)" width={16} height={16} />
          </button>
        </div>
      </header>

      <p className="comment_item_content r_14_20">{content}</p>
      <time className="comment_item_date r_12_16" dateTime={date}>{date}</time>
    </article>
  );
}


