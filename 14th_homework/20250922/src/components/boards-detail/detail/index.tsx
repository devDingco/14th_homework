"use client";

import Image from "next/image";
import React from "react";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { usePathname } from "next/navigation";
import YouTube from "react-youtube";
import { useBoardsDetail } from "./hook";
import type { BoardsDetailProps } from "./types";
import styles from "./styles.module.css";

// 유튜브 URL에서 비디오 ID 추출 함수
const extractYouTubeVideoId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

export default function BoardsDetail(props: BoardsDetailProps) {
  const { data, loading, error, onClickMoveToEdit, onClickMoveToList, onClickLike, onClickDislike } = useBoardsDetail(props);
  const pathname = usePathname();
  const pageUrl = typeof window !== "undefined" ? `${window.location.origin}${pathname}` : pathname;

  if (loading) {
    return <div className="text-center mt-20">로딩 중입니다...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">에러 발생: {error.message}</div>;
  }

  const boardData = data?.fetchBoard;

  if (!boardData) {
    return <div className="text-center mt-20">게시글을 찾을 수 없습니다.</div>;
  }

  const formattedDate = new Date(boardData.createdAt)
    .toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
    .replace(/\./g, ".")
    .trim();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{boardData.title}</h1>
        <div className={styles.meta}>
          <Image src="/images/profile_img.png" alt="프로필" width={24} height={24} className={styles.avatar} />
          <span className={styles.writer}>{boardData.writer}</span>
          <span>{formattedDate}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
            <a href={pageUrl || "#"} target="_blank" rel="noreferrer" aria-label="링크 열기">
              <Image src="/images/link.png" alt="링크" width={18} height={18} />
            </a>
            <Tooltip 
              title={
                boardData.boardAddress?.address || boardData.boardAddress?.zipcode ? (
                  <div>
                    {boardData.boardAddress?.zipcode && <div>우편번호: {boardData.boardAddress?.zipcode}</div>}
                    {boardData.boardAddress?.address && <div>주소: {boardData.boardAddress?.address}</div>}
                    {boardData.boardAddress?.addressDetail && <div>상세주소: {boardData.boardAddress?.addressDetail}</div>}
                  </div>
                ) : ''
              }
              arrow
              placement="bottom"
              disableHoverListener={!boardData.boardAddress?.address && !boardData.boardAddress?.zipcode}
            >
              <span>
                <Image src="/images/location.png" alt="주소" width={18} height={18} style={{ cursor: "pointer" }} />
              </span>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <Image src="/images/beach.png" alt="바다 풍경" width={384} height={216} className={styles.beachImage} />
        <div className={styles.contents}>{boardData.contents}</div>
      </div>

      {boardData.youtubeUrl ? (
        <div className={styles.youtubeSection}>
          <h3 className={styles.youtubeTitle}>관련 영상</h3>
          <div className={styles.youtubeContainer}>
            <YouTube
              videoId={extractYouTubeVideoId(boardData.youtubeUrl)}
              opts={{
                width: '100%',
                height: '400',
                playerVars: {
                  autoplay: 0,
                  rel: 0,
                  modestbranding: 1,
                },
              }}
              className={styles.youtubePlayer}
            />
          </div>
        </div>
      ) : (
        <div className={styles.videoWrap}>
          <Image src="/images/video_img.jpg" alt="영상" width={768} height={432} className={styles.videoImage} />
          <Image src="/images/play_button.png" alt="재생 버튼" width={48} height={48} className={styles.playButton} />
        </div>
      )}

      <div className={styles.footer}>
        <div className={styles.likes}>
          <div className={styles.likeItem} onClick={onClickLike} role="button" aria-label="좋아요">
            <ThumbUp sx={{ color: '#1976d2', fontSize: 24 }} />
            <span>{boardData.likeCount}</span>
          </div>
          <div className={styles.likeItem} onClick={onClickDislike} role="button" aria-label="싫어요">
            <ThumbDown sx={{ color: '#d32f2f', fontSize: 24 }} />
            <span>{boardData.dislikeCount}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.actionButton} onClick={onClickMoveToList}>
            <Image src="/images/list.png" alt="목록" width={20} height={20} className={styles.actionIcon} />
            목록으로
          </button>
          <button className={styles.actionButton} onClick={onClickMoveToEdit}>
            <Image src="/images/edit_pen.png" alt="수정" width={20} height={20} className={styles.actionIcon} />
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}