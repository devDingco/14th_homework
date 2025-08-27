"use client";

import "./comment.css";
import { useMemo, useState } from "react";
import CommentComposer from "./commentComposer";
import CommentItem from "./commentItem";
import type { AppComment, NewComment } from "@/types/comment";

export default function CommentSection({ initialComments = [] as AppComment[] }) {
  const [comments, setComments] = useState<AppComment[]>(initialComments);

  const reviewCountByAuthor = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of comments) {
      counts[c.author] = (counts[c.author] || 0) + 1;
    }
    return counts;
  }, [comments]);

  const addComment = ({ rating, content }: NewComment) => {
    const newComment: AppComment = {
      id: String(Date.now()),
      avatar: "/images/mobile/profile/img-1.png",
      author: "익명",
      date: new Date().toISOString().slice(0, 10).replaceAll("-", "."),
      rating,
      content,
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const deleteComment = (id: string) => setComments((prev) => prev.filter((c) => c.id !== id));

  return (
    <section className="comment_section">
      <CommentComposer onSubmit={addComment} />

      <div className="comment_list">
        {comments.map((c) => (
          <CommentItem
            key={c.id}
            avatar={c.avatar}
            author={c.author}
            date={c.date}
            rating={c.rating}
            content={c.content}
            onDelete={() => deleteComment(c.id)}
          />
        ))}
      </div>
    </section>
  );
}


