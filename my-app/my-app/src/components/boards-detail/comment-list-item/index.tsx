"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import profileIcon from "./icon/img.svg";
import editIcon from "./icon/edit.svg";
import closeIcon from "./icon/close.svg";
import { Rate } from "antd";

import { ICommentListItem } from "./types";
import { useState } from "react";
import CommentWrite from "../comment-write";

const IMAGE_SRC = {
  profileIcon: {
    src: profileIcon,
    alt: "프로필이미지",
  },
  editIcon: {
    src: editIcon,
    alt: "편집버튼",
  },
  closeIcon: {
    src: closeIcon,
    alt: "삭제버튼",
  },
};

export default function CommentListItem({ el, index, length }) {
  const [isEditing, setIsEditing] = useState(false);

  //   const onClickEditIcon = (id: string) => setIsEditing(id);
  // const onClickEditSignUp = () => setIsEditing
  return (
    <>
      <div key={el?._id}>
        {isEditing ? (
          <CommentWrite el={el} isEdit={true} />
        ) : (
          <div className={styles.commentContainer}>
            <div className={styles.commentBody}>
              <div className={styles.commentFrame}>
                <div className={styles.header}>
                  <div className={styles.header_Profile}>
                    <Image
                      src={IMAGE_SRC.profileIcon.src}
                      alt={IMAGE_SRC.profileIcon.alt}
                    />
                    <div className={styles.header_Profile_writer}>
                      {el?.writer}
                    </div>
                    <Rate
                      disabled
                      className={styles.header_Rating}
                      defaultValue={Number(el?.rating ?? 0)} // number 보장
                    />
                  </div>
                  <div className={styles.header_Edit_Close}>
                    <Image
                      src={IMAGE_SRC.editIcon.src}
                      alt={IMAGE_SRC.editIcon.alt}
                      onClick={() => setIsEditing(true)}
                    />
                    <Image
                      src={IMAGE_SRC.closeIcon.src}
                      alt={IMAGE_SRC.closeIcon.alt}
                    />
                  </div>
                </div>

                <div className={styles.commentContents}>{el?.contents}</div>
                <div className={styles.commentDate}>
                  {el?.createdAt ? el.createdAt.split("T")[0] : ""}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
