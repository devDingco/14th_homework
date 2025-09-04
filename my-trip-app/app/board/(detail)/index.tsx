"use client";
import "./index.css";
import "../../global.css";
import Image from "next/image";
import Icon from "@utils/iconColor";
import Link from "next/link";
import CommentSection from "@components/comment/commentSection";
import { formatDate } from "@hooks/formatDate";
import { toYouTubeEmbedUrl } from "@hooks/youtube";
import { useState } from "react";
import { likeBoardApi, dislikeBoardApi } from "@/commons/apis/board.api";

export default function BoardDetail({ id, initialData }: { id: string; initialData: any }) {
  const [likeCount, setLikeCount] = useState<number>(initialData.likeCount ?? 0);
  const [badCount, setBadCount] = useState<number>(initialData.badCount ?? 0);
  const [pending, setPending] = useState<boolean>(false);

  const post = {
    title: initialData.title,
    authorProfileImage: "",
    authorName: initialData.authorName,
    createdAt: initialData.createdAt,
    coverImage: initialData.coverImage,
    contents: initialData.contents,
    badCount,
    likeCount,
    youtubeUrl: initialData.youtubeUrl,
  };

  const handleLike = async () => {
    if (pending) return;
    try {
      setPending(true);
      const next = await likeBoardApi(id);
      setLikeCount(typeof next === "number" ? next : likeCount + 1);
    } finally {
      setPending(false);
    }
  };

  const handleDislike = async () => {
    if (pending) return;
    try {
      setPending(true);
      const next = await dislikeBoardApi(id);
      setBadCount(typeof next === "number" ? next : badCount + 1);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="board_detail_page">
      <article className="board_detail">
        <header className="detail_header">
          <h1 className="b_28_36 detail_title">{post.title}</h1>
          <div className="detail_meta">
            <div className="author">
              {post.authorProfileImage && (
                <Image
                  src={post.authorProfileImage}
                  alt={post.authorName}
                  width={32}
                  height={32}
                  className="author_avatar"
                  priority={false}
                />
              )}
              <span className="sb_16_24 author_name">{post.authorName}</span>
              <span className="r_14_20 date">{formatDate(post.createdAt)}</span>
            </div>
            <div className="icon_wrap">
              <Icon outline name="link" default className="link_icon"/>
              <Icon outline name="location" default className="location_icon"/>
            </div>
          </div>
        </header>

        <section className="detail_content r_16_24">
          {post.coverImage && (
            <div className="lead_section">
              <figure className="lead_media">
                <Image src={post.coverImage} alt="lead" width={260} height={200} priority={false} />
              </figure>
              <div className="text_block r_16_24 content">
                <p>{post.contents}</p>
              </div>
            </div>
          )}

          {post.youtubeUrl && toYouTubeEmbedUrl(post.youtubeUrl) && (
            <div className="detail_media wide">
              <div className="media_wrap">
                <iframe
                  src={toYouTubeEmbedUrl(post.youtubeUrl)}
                  title="YouTube video player"
                  frameBorder="0"
                  style={{ width: "82.2rem", height: "46.4rem", margin: "0 auto", display: "block" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </section>

          <article className="like_section">
            <div className="like_wrap">
              <button type="button" className="like_icon" onClick={handleDislike} disabled={pending}>
                <Icon outline name="bad" color="var(--gray-70)"/>
              </button>
              <div className="unlike_count">
                <span className="r_16_24" style={{ color: "var(--gray-70)" }}>{post.badCount}</span>
              </div>
            </div>
            <div className="like_wrap">
              <button type="button" className="like_icon" onClick={handleLike} disabled={pending}>
                <Icon outline name="good" red className="like_icon"/>
              </button>
              <div className="like_count">
                <span className="r_16_24" style={{ color: "var(--red)" }}>{post.likeCount}</span>
              </div>
            </div>
          </article>

          <CommentSection initialComments={[]} />

        <footer className="detail_actions">
          <div className="bottom_actions">
              <Link href="/" className="r_16_24">
            <button type="button" className="btn-outline">
              <Icon outline name="menu" default width={24} height={24}/>
              목록으로
            </button>
              </Link>
            <div className="reactions">
              <button type="button" className="btn-outline">
                <Icon outline name="edit" default width={24} height={24}/>
                수정하기
              </button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}