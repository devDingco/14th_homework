"use client";

import styles from "./styles.module.css";
import useBoardDetail from "./hook";
import Image from "next/image";
import { Tooltip } from "antd";
import ReactPlayer from "react-player";
import { IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import HeartBrokenOutlinedIcon from "@mui/icons-material/HeartBrokenOutlined";
const BoardDetail = () => {
  const {
    onClickMove,
    onClickMoveList,
    handleLike,
    handleDislike,
    likes,
    dislikes,
    data,
  } = useBoardDetail();
  const date = data?.fetchBoard?.createdAt
    ? new Date(data.fetchBoard.createdAt).toISOString().split("T")[0]
    : "";
  // console.log(data?.fetchBoard.images);
  const images_tag = data?.fetchBoard.images.map((el, index) => (
    <Image src={el} key={index} width={400} height={531} alt="대표 이미지" />
  ));

  return (
    <div className={styles.전체영역}>
      <div className={styles.제목노출}>{data?.fetchBoard.title}</div>
      <div className={styles.작성자_날짜}>
        <div className={styles.작성자노출}>{data?.fetchBoard.writer}</div>
        <div className={styles.작성날짜노출}>{date}</div>
      </div>
      <div className={styles.링크와주소노출}>
        <Image
          src={"/images/link.png"}
          width={24}
          height={24}
          alt="유튜브링크"
        />
        <Tooltip title={data?.fetchBoard.boardAddress?.address}>
          <Image
            src={"/images/location.png"}
            width={24}
            height={24}
            alt="주소노출"
          />
        </Tooltip>
      </div>
      <div>{images_tag}</div>
      <div className={styles.내용노출}>{data?.fetchBoard.contents}</div>
      <div className={styles.유투브노출}>
        <ReactPlayer
          src={data?.fetchBoard.youtubeUrl}
          width={822}
          height={464}
        />
      </div>
      <div className={styles.싫어요_좋아요}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <IconButton aria-label="싫어요" onClick={handleDislike}>
            <HeartBrokenOutlinedIcon />
          </IconButton>

          <span>{dislikes}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <IconButton aria-label="좋아요" onClick={handleLike}>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
          <span>{likes}</span>
        </div>
      </div>

      <div className={styles.목록_수정_버튼}>
        <Image
          src={"/images/목록버튼.png"}
          width={105}
          height={40}
          onClick={onClickMoveList}
          alt="목록버튼"
        />
        <Image
          src={"/images/수정버튼.png"}
          width={105}
          height={40}
          onClick={onClickMove}
          alt="수정버튼"
        />
      </div>
    </div>
  );
};

export default BoardDetail;
