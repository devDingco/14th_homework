"use client";
// import { ChangeEvent, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import useDetailPage from "./hook";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import React from "react";
import { Tooltip } from "antd";
import YouTube from "react-youtube";
export default function DetailPageComponent() {
  const { onClickMove, onClickLikeCount, onClickDislikeCount, data } = useDetailPage();
  return (
    <>
      <div className={styles.page}>
        <div className={styles.detailContainer}>
          <div className={styles.detailTitle}>{data?.fetchBoard.title}</div>
          <div className={styles.detailAuthor}>
            <div className={styles.detailAuthor__name}>
              <Image
                src="/icons/outline/profile.svg"
                alt="ProfileIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
              {data?.fetchBoard.writer}
            </div>
            <div className={styles.detailAuthor__date}>
              {data?.fetchBoard.createdAt.split("T")[0]}
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.detailLinkLocation}>
            <div className={styles.detailLinkLocation__enroll}>
              <Image
                src="/icons/outline/link.svg"
                alt="LinkIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
              <Tooltip
                title={`${data?.fetchBoard.boardAddress?.address} ${data?.fetchBoard.boardAddress?.addressDetail}`}
              >
                <Image
                  src="/icons/outline/location.svg"
                  alt="LocationIcon"
                  width={24}
                  height={24}
                  sizes="100vw"
                />
              </Tooltip>
            </div>
          </div>
          <div className={styles.detailPhoto}>
            <img
              className={styles.uploadImage}
              src={`https://storage.googleapis.com/${data?.fetchBoard.images[0]}`}
            />
          </div>
          <div className={styles.detailContent}>{data?.fetchBoard.contents}</div>
          <div className={styles.detailVideo}>
            <YouTube
              videoId={
                data?.fetchBoard?.youtubeUrl?.split("=")[1] &&
                data?.fetchBoard?.youtubeUrl.split("=")[1]
              }
            />
          </div>
          <div className={styles.detailHeart}>
            <div className={styles.detailHeart__bad}>
              <button onClick={onClickDislikeCount}>
                <DislikeOutlined />
              </button>
              {data?.fetchBoard.dislikeCount}
            </div>
            <div className={styles.detailHeart__good}>
              <button onClick={onClickLikeCount}>
                <LikeOutlined />
              </button>
              {data?.fetchBoard.likeCount}
            </div>
          </div>
          <div className={styles.detailButtonEnroll}>
            <button className={styles.detailButtonList}>
              <Image
                src="/icons/outline/menu.svg"
                alt="RedGoodIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
              목록으로
            </button>
            <button className={styles.detailButtonEdit} onClick={onClickMove}>
              <Image
                src="/icons/outline/edit.svg"
                alt="RedGoodIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
              수정하기
            </button>
          </div>
          <hr className={styles.line} />
        </div>
      </div>
    </>
  );
}
