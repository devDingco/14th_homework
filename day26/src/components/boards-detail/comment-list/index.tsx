"use client";

import { useCommentList } from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
import { Rate } from "antd";

// ❗️실제 파일 이름에 맞게 import 경로를 수정합니다.
import profileImage from "@/assets/profile_image.png";
import editImage from "@/assets/pencil.png";
import closeImage from "@/assets/trashbin.png"; // close.png -> trashbin.png

export default function CommentList() {
  const { data, loading } = useCommentList();

  if (loading) return <div></div>;

  return (
    <div className={styles.commentListBody}>
      <div className={styles.commentListContainer}>
        {data?.fetchBoardComments.map((comment, index) => (
          <div key={comment._id}>
            {/* 👇 꼬여있던 div 구조를 올바르게 수정했습니다. */}
            <div className={styles.listBody}>
              <div className={styles.listTitle}>
                <div className={styles.forwardTitle}>
                  {/* 👇 width와 height를 추가했습니다. */}
                  <Image
                    src={profileImage}
                    alt="프로필이미지"
                    width={40}
                    height={40}
                  />
                  <div className={styles.writerAndStars}>
                    <div className={styles.forwardTitleText}>{comment.writer}</div>
                    <Rate disabled value={comment.rating} style={{ fontSize: 16 }} />
                  </div>
                </div>
                {/* 👇 누락되었던 수정/삭제 아이콘을 추가했습니다. */}
                <div className={styles.backTitle}>
                  <Image
                    src={editImage}
                    alt="편집버튼"
                    width={20}
                    height={20}
                  />
                  <Image
                    src={closeImage}
                    alt="삭제버튼"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div className={styles.commentText}>{comment.contents}</div>
              <div className={styles.commentDate}>
                {comment.createdAt?.split("T")[0].replaceAll("-", ".")}
              </div>
            </div>
            {index + 1 !== data?.fetchBoardComments.length && (
              <div className={styles.border}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}