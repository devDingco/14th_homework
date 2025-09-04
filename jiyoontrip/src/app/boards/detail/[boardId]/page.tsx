"use client";
// import { ChangeEvent, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      title
      contents
      likeCount
      dislikeCount
      images
      createdAt
      updatedAt
    }
  }
`;

export default function DetailPage() {
  const params = useParams(); // 문자열로 나옴

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });
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
            <div className={styles.detailAuthor__date}>{data?.fetchBoard.createdAt}</div>
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
              <Image
                src="/icons/outline/location.svg"
                alt="LocationIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
            </div>
          </div>
          <div className={styles.detailPhoto}>
            <Image
              src="/images/beach.png"
              alt="BeachImage"
              width={400}
              height={531}
              sizes="100vw"
            />
          </div>
          <div className={styles.detailContent}>{data?.fetchBoard.contents}</div>
          <div className={styles.detailVideo}>
            <Image
              src="/images/sofa.png"
              alt="SofaImage"
              width={822}
              height={464}
              sizes="100vw"
            />
          </div>
          <div className={styles.detailHeart}>
            <div className={styles.detailHeart__bad}>
              <Image
                src="/icons/outline/bad.svg"
                alt="BadIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
              {data?.fetchBoard.dislikeCount}
            </div>
            <div className={styles.detailHeart__good}>
              <Image
                src="/icons/outline/RedGood.svg"
                alt="RedGoodIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
              {data?.fetchBoard.likeCount}
            </div>
          </div>
          <div className={styles.detailButtonEnroll}>
            <button className={styles.detailButtonList}>
              <Image
                src="/icons/outline/menu.svg"
                alt="MenuIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
              목록으로
            </button>
            <button className={styles.detailButtonEdit}>
              <Image
                src="/icons/outline/edit.svg"
                alt="EditIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
              수정하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
