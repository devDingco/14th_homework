"use client";

import styles from "./styles.module.css";
import useBoardDetail from "./hook";
import Image from "next/image";

const BoardDetail = () => {
  const { onClickMove, data } = useBoardDetail();
  return (
    <div className={styles.전체영역}>
      <div className={styles.제목노출}>{data?.fetchBoard.title}</div>
      <div className={styles.작성자_날짜}>
        <div className={styles.작성자노출}>{data?.fetchBoard.writer}</div>
        <div className={styles.작성날짜노출}>{data?.fetchBoard.createdAt}</div>
      </div>
      <div>
        <Image src={"/images/Tranquil.png"} width={400} height={531} />
      </div>
      <div className={styles.내용노출}>{data?.fetchBoard.contents}</div>
      <div className={styles.유투브노출}>{data?.fetchBoard.youtubeUrl}</div>
      <div className={styles.싫어요_좋아요}>
        <Image src={"/images/bad.png"} width={19} height={17} />
        <Image src={"/images/good.png"} width={19} height={17} />
      </div>
      <div className={styles.목록_수정_버튼}>
        <Image src={"/images/목록버튼.png"} width={105} height={40} />
        <Image
          src={"/images/수정버튼.png"}
          width={105}
          height={40}
          onClick={onClickMove}
        />
      </div>
    </div>
  );
};

export default BoardDetail;
