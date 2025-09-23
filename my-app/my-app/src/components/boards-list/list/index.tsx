"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import deleteIcon from "./assets/delete.svg";
import { useBoardList } from "./hook";
import { useState } from "react";
// import { Modal } from "antd";
// import { IBoardList } from "./types";

export default function BoardList() {
  const { data, refetch, hoveredId, onClickMoveDetail, onClickDelete } =
    useBoardList();

  const [startPage, setStartPage] = useState(1);

  const onClickPrevPage = () => {
    setStartPage(startPage - 10);
    refetch({ page: startPage - 10 });
  };

  const onClickPage = (event: any) => {
    refetch({ page: Number(event.target.id) });
  };

  const onClickNextPage = () => {
    setStartPage(startPage + 10);
    refetch({ page: startPage + 10 });
  };

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
                      {/* <div>
                        <span
                          onClick={onClickDelete}
                          className={
                            hoveredId === el._id
                              ? styles.showButton
                              : styles.hidden
                          }
                        >
                          <Image
                            src={deleteIcon}
                            alt="deleteIcon"
                          /> 
                        </span>
                      </div> */}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div>
            <button onClick={onClickPrevPage}>이전페이지</button>
            {new Array(10).fill("희주").map((_, index) => (
              <button
                key={index + startPage}
                id={String(index + startPage)}
                onClick={onClickPage}
              >
                {index + startPage}
              </button>
            ))}
            <button onClick={onClickNextPage}>다음페이지</button>
          </div>
        </div>
      </div>
    </div>
  );
}
