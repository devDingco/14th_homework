"use client";

import styles from "./styles.module.css";
import { useBoardDetail } from "./hook";
import React from "react";
import { Tooltip } from "antd";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import { useParams } from "next/navigation";

export default function BoardsDetail() {
  const { loading, data, error, onClickUpdateMove, onClickMoveToList } =
    useBoardDetail();

  const params = useParams();
  const boardId = params.boardId;

  if (!boardId) {
    return <div>유효하지 않은 게시글 ID입니다.</div>;
  }

  if (loading) return <div>게시글을 불러오는 중입니다...</div>;
  if (error) return <div>오류가 발생했습니다: {error.message}</div>;
  if (!data || !data.fetchBoard) return <div>게시글을 찾을 수 없습니다.</div>;

  const {
    title,
    writer,
    createdAt,
    contents,
    likeCount,
    dislikeCount,
    youtubeUrl,
    boardAddress,
  } = data.fetchBoard;

  const addressInfo = `우편번호: ${boardAddress?.zipcode || "없음"}\n주소: ${
    boardAddress?.address || "없음"
  }\n상세주소: ${boardAddress?.addressDetail || "없음"}`;

  const getYoutubeEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch {
      return null;
    }
  };

  const embedUrl = youtubeUrl ? getYoutubeEmbedUrl(youtubeUrl) : null;

  return (
    <div className={styles.boards}>
      <div className={styles.boards_detail}>
        <div className={styles.boards_body}>
          <div className={styles.boards_body_main}>
            <div className={styles.제목_font}>제목: {title}</div>

            <div className={styles.글쓴이_날짜}>
              <div className={styles.글쓴이_날짜_좁은거}>
                <div className={`${styles.글쓴이_font} ${styles.글쓴이}`}>
                  <img src="/images/profile.png" alt="" />
                  <div className={styles.글쓴이_name}>작성자: {writer}</div>
                </div>
                <div className={`${styles.날짜} ${styles.날짜_font}`}>
                  {createdAt}
                </div>
              </div>

              <div className={styles.line}></div>

              <div className={styles.복붙_위치_위치조정}>
                <div className={styles.복붙_위치}>
                  <img src="/images/copy.png" alt="" />
                  <Tooltip title={addressInfo} placement="bottom">
                    <img src="/images/location.png" alt="" />
                  </Tooltip>
                </div>
              </div>
            </div>

            <div>
              <img src="/images/beach.png" alt="" />
            </div>

            <div className={styles.content}>내용: {contents}</div>

            {/* 유튜브 영상 iframe */}
            {embedUrl && (
              <div
                className={styles.video_div}
                style={{
                  width: "1280px",
                  height: "720px",
                  backgroundColor: "#000",
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={embedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ backgroundColor: "#000" }}
                />
              </div>
            )}

            <div className={styles.bad_good}>
              <div className={styles.good_bad_font}>
                <DislikeFilled style={{ color: "gray" }} />
                {dislikeCount}
              </div>
              <div className={styles.good_bad_font}>
                <LikeFilled style={{ color: "gray" }} />
                {likeCount}
              </div>
            </div>

            <div className={styles.buttons}>
              <button
                className={(styles.button, styles.button_font)}
                onClick={onClickMoveToList}
              >
                <img src="/images/list.png" alt="" />
                목록으로
              </button>
              <button
                className={(styles.button, styles.button_font)}
                onClick={onClickUpdateMove}
              >
                <img src="/images/fix.png" alt="" />
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
