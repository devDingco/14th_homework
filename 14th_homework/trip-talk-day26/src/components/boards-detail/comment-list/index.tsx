"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_BOARD_COMMENTS } from "./queries";
import styles from "./styles.module.css";
import Image from "next/image";

export default function CommentList() {
  const board_params = useParams();
  const { data } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { boardId: board_params.boardId },
  });

  const comments = data?.fetchBoardComments.map((el, index: number) => (
    <div id={el._id} key={el._id} className={styles.댓글리스트}>
      <div className={styles.commentBox}>
        <div className={styles.commentHeader}>
          <div className={styles.leftGroup}>
            <span className={styles.commentWriter}>{el.writer}</span>
            <span className={styles.commentRating}>★★★★★</span>
          </div>

          <div className={styles.commentActions}>
            <Image src={"/images/수정.png"} width={20} height={20} />
            <Image src={"/images/삭제.png"} width={20} height={20} />
          </div>
        </div>

        <div className={styles.commentBody}>
          <p>{el.contents}</p>
        </div>

        <div className={styles.commentFooter}>
          <span className="comment-date">{el.createdAt}</span>
        </div>
      </div>
    </div>
  ));

  return <>{comments}</>;
}
