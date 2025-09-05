"use client";

import styles from "./BoardList.module.css";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import Image from "next/image";
import deleteIcon from "./assets/delete.svg";
import { MouseEvent } from "react";
// import React, { useState } from "react";

const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      _id
      title
      writer
      contents
      createdAt
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        _id
        zipcode
        address
        addressDetail
        createdAt
        updatedAt
        deletedAt
      }
      updatedAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export default function BoardList() {
  const params = useParams();
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const { data } = useQuery(FETCH_BOARDS, {
    variables: {
      page: params?.page ? parseInt(String(params.page), 10) : 1,
      // useParams()가 반환하는 값은 문자열인데, $page는 Int임.
      // -> 문자열을 정수로 변환해야 함!
      // + 라우트가 /boards/[page] 형태가 아니라면 params.page 자체가 없을 수도 있기때문에 기본값(예: 1)을 두는 게 안전함
      // params.page가 있다면 params.page를 숫자로 변환해서 쓰고, 없다면 자동으로 page=1
    },
  });

  const onClickDelete = async (event: React.MouseEvent<HTMLElement>) => {
    await deleteBoard({
      variables: { boardId: event.currentTarget.id },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
    alert("삭제되었습니다!!");
  };

  return (
    <>
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
              {data?.fetchBoards.map(
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
                  <div key={el._id} id={el._id}>
                    <div className={styles.FetchBoard_number}>{index + 1}</div>
                    <div className={styles.FetchBoard_title}>{el.title}</div>
                    <div className={styles.FetchBoard_writer}>{el.writer}</div>
                    <div className={styles.FetchBoard_date}>
                      {el.createdAt.split("T")[0]}
                    </div>
                    <Image
                      id={el._id}
                      src={deleteIcon}
                      alt={deleteIcon}
                      onClick={onClickDelete}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* {data?.fetchBoard.map((el)=>)}
            <div className={styles.FetchBoard_number}>
              {data?.fetchBoard?.number}
            </div>
            <div className={styles.FetchBoard_title}>
              {data?.fetchBoard?.title}
            </div>
            <div className={styles.FetchBoard_writer}>
              {data?.fetchBoard?.writer}
            </div>
            <div className={styles.FetchBoard_date}>
              {data?.fetchBoard?.createdAt} */
}
{
  /* </div> */
}
