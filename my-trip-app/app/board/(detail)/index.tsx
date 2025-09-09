"use client";
import "./index.css";
import "../../global.css";
import Image from "next/image";
import Icon from "@utils/iconColor";
import Link from "next/link";
import CommentSection from "@components/comment/commentSection";
import { formatDate } from "@hooks/formatDate";
import { toYouTubeEmbedUrl } from "@hooks/youtube";
import { usePostAuth } from "@hooks/usePostAuth";
import { useState } from "react";
import { likeBoardApi, dislikeBoardApi } from "@/commons/apis/board.api";
import UnauthorizedModal from "@components/modal/UnauthorizedModal";
import { useRouter } from "next/navigation";

export default function BoardDetail({ id, initialData }: { id: string; initialData: any }) {
  const [likeCount, setLikeCount] = useState<number>(initialData.likeCount ?? 0);
  const [badCount, setBadCount] = useState<number>(initialData.badCount ?? 0);
  const [pending, setPending] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{ type: 'link' | 'address'; content: string }>({ type: 'link', content: '' });
  const { showUnauthorizedModal, checkPostAuthor, closeUnauthorizedModal } = usePostAuth();
  const router = useRouter();

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
    address: initialData.address,
    detailAddress: initialData.detailAddress,
    zipcode: initialData.zipcode,
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

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (checkPostAuthor(post.authorName)) {
      router.push(`/board/edit/${id}`);
    }
  };

  const handleLinkClick = () => {
    if (post.youtubeUrl) {
      setModalContent({ type: 'link', content: post.youtubeUrl });
      setShowInfoModal(true);
    } else {
      setModalContent({ type: 'link', content: '링크가 없습니다.' });
      setShowInfoModal(true);
    }
  };

  const handleLocationClick = () => {
    const fullAddress = [post.address, post.detailAddress].filter(Boolean).join(' ');
    if (fullAddress) {
      setModalContent({ type: 'address', content: fullAddress });
      setShowInfoModal(true);
    } else {
      setModalContent({ type: 'address', content: '등록된 주소가 없습니다.' });
      setShowInfoModal(true);
    }
  };

  const closeInfoModal = () => {
    setShowInfoModal(false);
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
              <button type="button" onClick={handleLinkClick} className="icon_button">
                <Icon outline name="link" color="var(--gray-70)" className="icon_link"/>
              </button>
              <button type="button" onClick={handleLocationClick} className="icon_button">
                <Icon outline name="location" color="var(--gray-70)" className="icon_location"/>
              </button>
            </div>
          </div>
        </header>

        <section className="detail_content r_16_24">
          <div className="lead_section">
            {post.coverImage && (
              <figure className="lead_media">
                <Image src={post.coverImage} alt="lead" width={260} height={200} priority={false} />
              </figure>
            )}
            <div className="text_block r_16_24 content">
              <p>{post.contents || "내용이 없습니다."}</p>
            </div>
          </div>

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

          <section className="like_section">
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
          </section>

          <CommentSection boardId={id} initialComments={[]} />

        <footer className="detail_actions">
          <div className="bottom_actions">
              <Link href="/" className="r_16_24 btn-outline">
              <Icon outline name="menu" default width={24} height={24}/>
              목록으로
              </Link>
            <div className="reactions">
              <button 
                type="button" 
                className="r_16_24 btn-outline"
                onClick={handleEditClick}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px",
                  background: "transparent",
                  cursor: "pointer"
                }}
              >
                <Icon outline name="edit" default width={24} height={24}/>
                수정하기
              </button>
            </div>
          </div>
        </footer>
      </article>
      
      <UnauthorizedModal 
        isOpen={showUnauthorizedModal}
        onClose={closeUnauthorizedModal}
      />
      
      {showInfoModal && (
        <div className="info_modal_overlay" onClick={closeInfoModal}>
          <div className="info_modal" onClick={(e) => e.stopPropagation()}>
            <div className="info_modal_header">
              <h3 className="sb_18_24">
                {modalContent.type === 'link' ? '유튜브 링크' : '주소 정보'}
              </h3>
              <button type="button" onClick={closeInfoModal} className="close_button">
                <Icon outline name="close" default width={24} height={24}/>
              </button>
            </div>
            <div className="info_modal_content">
              <p className="r_16_24">{modalContent.content}</p>
              {modalContent.type === 'link' && post.youtubeUrl && (
                <button 
                  type="button" 
                  className="link_button sb_16_24"
                  onClick={() => window.open(post.youtubeUrl, '_blank')}
                >
                  링크 열기
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}