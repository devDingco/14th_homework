"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import deleteIcon from "./assets/delete.svg";
import { useBoardList } from "./hook";
// import { Modal } from "antd";
// import { IBoardList } from "./types";

export default function BoardList() {
  const { data, onClickMoveDetail, onClickDelete } = useBoardList();

  return (
    <div className={styles.BoardContainer}>
      <div className={styles.BoardBody}>
        <div className={styles.BoardFrame}>
          <div className={styles.BoardFrame_Header}>
            <div className={styles.BoardFrame_Header_number}>번호</div>
            <div className={styles.BoardFrame_Header_title}>제목</div>
            <div className={styles.BoardFrame_Header_writer}>작성자</div>
            <div className={styles.BoardFrame_Header_date}>날짜</div>
          </div>

          <div className={styles.FetchBoardFrame}>
            <div>
              <div className={styles.FetchBoard}>
                {data?.fetchBoards?.map(
                  (
                    el: {
                      _id: string;
                      title: string;
                      writer: string;
                      createdAt: string;
                      contents: string;
                      youtubeUrl: string;
                      likeCount: number;
                      dislikeCount: number;
                      images: string[];
                      updatedAt: string;
                      boardAddress: {
                        _id: string;
                        zipcode: string;
                        address: string;
                        addressDetail: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string;
                      };
                    },
                    index: number
                  ) => (
                    <div
                      key={el._id}
                      id={el._id}
                      className={styles.FetchBoard_list}
                      onClick={(event) => onClickMoveDetail(event, el?._id)}
                    >
                      <div className={styles.FetchBoard_number}>
                        {index + 1}
                      </div>
                      <div className={styles.FetchBoard_title}>{el.title}</div>
                      <div className={styles.FetchBoard_writer}>
                        {el.writer}
                      </div>
                      <div className={styles.FetchBoard_date}>
                        {el.createdAt.split("T")[0]}
                      </div>
                      <Image
                        id={el._id}
                        src={deleteIcon}
                        alt="deleteIcon"
                        onClick={onClickDelete}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
