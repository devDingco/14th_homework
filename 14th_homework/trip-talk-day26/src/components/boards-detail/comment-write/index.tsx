"use client";

import useCommentWrite from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
export default function CommentWrite() {
  const {
    writer,
    password,
    comment,
    onChangeWriter,
    onChangePassword,
    onChangeComment,
    onClickCreateComment,
  } = useCommentWrite();
  return (
    <>
      <div className={styles.댓글작성}>
        <div className={styles.댓글아이콘}>
          <Image src={"/images/chat.svg"} width={24} height={24} />
          <span className={styles.댓글}>댓글</span>
        </div>
        <div>별점 영역</div>
        <div>
          <div className={styles.작성자_비밀번호}>
            <div>
              <div className={styles.작성자_라벨}>
                <span>작성자</span>
                <Image src={"/images/_.png"} width={8} height={8} />
              </div>
              <input
                className={styles.댓글작성자}
                type="text"
                placeholder="작성자 명을 입력해 주세요"
                value={writer}
                onChange={onChangeWriter}
              />
            </div>
            <div>
              <div className={styles.비밀번호_라벨}>
                <span>비밀번호</span>
                <Image src={"/images/_.png"} width={8} height={8} />
              </div>
              <input
                className={styles.댓글비밀번호}
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={onChangePassword}
              />
            </div>
          </div>
          <div>
            <textarea
              className={styles.댓글입력창}
              placeholder="댓글을 입력해 주세요."
              value={comment}
              onChange={onChangeComment}
            />
          </div>
          <div className={styles.댓글등록버튼}>
            <button
              className={styles.댓글버튼}
              id="댓글등록버튼"
              onClick={onClickCreateComment}
            >
              댓글등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
