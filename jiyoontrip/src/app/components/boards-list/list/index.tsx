"use client";

import Image from "next/image";
import styles from "./styles.module.css";
// import useBoardPage from "../hook";
// import { IFetchBoard } from "./types";

export default function BoardsPageComponent({
  onClickDelete,
  onClickDetail,
  onToggleModal,
  onToggleDeletModal,
  data,
  isModalOpen,
  Modal,
}: any) {
  return (
    <>
      {/* <div className={styles.page}>
        <div className={styles.container}> */}
      <div className={styles.boardHeader}>
        <span className={styles.boardHeader__number}>번호</span>
        <span className={styles.boardHeader__title}>제목</span>
        <span className={styles.boardHeader__writer}>작성자</span>
        <span className={styles.boardHeader__date}>날짜</span>
        <span className={styles.boardHeader__delete}></span>
      </div>
      <div className={styles.boardList}>
        {data?.fetchBoards.map((el, index: number) => {
          return (
            <div
              id={el._id}
              key={el._id}
              className={styles.boardList__item}
              onClick={onClickDetail}
            >
              <span className={styles.boardList__item__number}>{index + 1}</span>
              <span className={styles.boardList__item__title}>{el.title}</span>
              <span className={styles.boardList__item__writer}>{el.writer}</span>
              <span className={styles.boardList__item__date}>
                {el.createdAt.split("T")[0]}
              </span>
              <button
                id={el._id}
                onClick={onToggleDeletModal}
                className={styles.boardList__item__delete}
              >
                <Image
                  src="/icons/outline/delete.svg"
                  alt="ProfileIcon"
                  width={24}
                  height={24}
                  sizes="100vw"
                />
              </button>
            </div>
          );
        })}
        {/* </div>
        </div> */}
      </div>
      {isModalOpen === true && (
        <Modal
          title="삭제완료"
          closable={{ "aria-label": "Custom Close Button" }}
          open={true}
          onOk={onClickDelete}
          onCancel={onToggleModal}
        >
          성공적으로 삭제되었습니다.
        </Modal>
      )}
    </>
  );
}
