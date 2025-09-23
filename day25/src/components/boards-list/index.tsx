// src/components/boards-list/index.tsx
"use client";
import styles from "./styles.module.css"; // ❗️스타일 파일도 이 폴더로 옮겨와야 합니다.
import Image from "next/image";
import { useBoardsList } from "./hook";
import { IBoard } from "./types";
import deleteImage from "@assets/trashbin.png"; // ❗️assets 경로를 확인해주세요.

const IMAGE_SRC = {
  deleteImage: { src: deleteImage, alt: "삭제버튼" },
};

export default function BoardsList() {
  const { data, hoveredId, setHoveredId, onClickDelete, onClickDetail } = useBoardsList();

  return (
    <div className={styles.boardBody}>
        <div className={styles.boardFrame}>
          <div className={styles.boardInnerBody}>
            <div className={styles.boardHeader}>
                {/* ... 헤더 부분 JSX ... */}
            </div>
            <div className={styles.contentBody}>
                {data?.fetchBoards.map((el: IBoard, index: number) => (
                  <button
                    onClick={() => onClickDetail(el._id)}
                    key={el._id}
                    className={styles.contentContainer}
                    onMouseEnter={() => setHoveredId(el._id)}
                    onMouseLeave={() => setHoveredId("")}
                  >
                    <div className={styles.contentNumber}>{index + 1}</div>
                    <div className={styles.contentTitle}>{el.title}</div>
                    <div className={styles.contentWriter}>{el.writer}</div>
                    <div className={styles.contentDate}>
                      {el.createdAt.split("T")[0].replace(/-/g, ".")}
                    </div>
                    <span
                      onClick={(event) => onClickDelete(event, el._id)}
                      className={
                        hoveredId === el._id ? styles.showButton : styles.hidden
                      }
                    >
                      <Image
                        src={IMAGE_SRC.deleteImage.src}
                        alt={IMAGE_SRC.deleteImage.alt}
                      />
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </div>
    </div>
  );
}