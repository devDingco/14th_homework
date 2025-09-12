"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import useBoardWrite from "./hooks";

const 사진경로 = "/images/add_image.png";
const 아스타기호 = "/images/_.png";

export default function BoardWrite(props) {
  const {
    onClickSubmit,
    onClickUpdate,
    작성자입력기능,
    비밀번호입력기능,
    제목입력기능,
    내용입력기능,
  } = useBoardWrite();
  return (
    <>
      <div className={styles.게시물등록영역}>
        <div className={styles.게시물_등록}>게시물 등록</div>
        <div className={styles.작성자_비밀번호_영역}>
          <div>
            <div className={styles.작성자_라벨}>
              <span>작성자</span>
              <Image src={아스타기호} alt="아스타기호" width={8} height={8} />
            </div>

            <input
              id="작성자"
              className={props.수정_등록 ? styles.작성자_비활성 : styles.작성자}
              type="text"
              onChange={작성자입력기능}
              placeholder="작성자 명을 입력해 주세요."
              defaultValue={props.data?.fetchBoard.writer}
            />
          </div>
          <div>
            <div className={styles.비밀번호_라벨}>
              <span>비밀번호</span>
              <Image
                src={아스타기호}
                alt="아스타기호"
                width={8}
                height={8}
                sizes="100vw"
              />
            </div>
            <input
              id="비밀번호"
              className={
                props.수정_등록 ? styles.비밀번호_비활성 : styles.비밀번호
              }
              type="password"
              defaultValue={props.data?.fetchBoard.password}
              onChange={비밀번호입력기능}
              placeholder="비밀번호를 입력해 주세요."
            />
          </div>
        </div>
        <div className={styles.제목등록영역}>
          <div className={styles.제목_라벨}>
            <span>제목</span>
            <Image
              src={아스타기호}
              alt="아스타기호"
              width={8}
              height={8}
              sizes="100vw"
            />
          </div>
          <input
            className={styles.제목인풋}
            type="text"
            onChange={제목입력기능}
            placeholder="제목을 입력해 주세요."
            defaultValue={props.data?.fetchBoard.title}
          />
        </div>
        <div className={styles.내용_주소_등록영역}>
          <div className={styles.내용영역}>
            <div className={styles.내용_라벨}>
              <span>내용</span>
              <Image
                src={아스타기호}
                alt="아스타기호"
                width={8}
                height={8}
                sizes="100vw"
              />
            </div>
            <textarea
              className={styles.내용입력}
              defaultValue={props.data?.fetchBoard.contents}
              onChange={내용입력기능}
              placeholder="내용을 입력해 주세요."
            />
          </div>
          <div className={styles.주소영역}>
            <div>주소</div>
            <div className={styles.우편번호}>
              <div className={styles.우편번호노출영역}></div>
              <button className={styles.우편번호검색버튼}>우편번호검색</button>
            </div>
            <div className={styles.주소노출영역}></div>
            <input
              className={styles.상세주소입력영역}
              type="text"
              placeholder="상세주소"
            />
          </div>
        </div>
        <div className={styles.유튜브링크_첨부영역}>
          <div>유튜브 링크</div>
          <input
            className={styles.유투브링크입력}
            type="text"
            placeholder="링크를 입력해 주세요."
          />
        </div>
        <div className={styles.사진첨부영역}>
          <div>사진첨부</div>
          <div className={styles.사진첨부버튼}>
            <img src={사진경로} />
            <img src={사진경로} />
            <img src={사진경로} />
          </div>
        </div>
        <div className={styles.버튼영역}>
          <button className={styles.취소버튼}>취소</button>
          <button
            id="등록버튼ID"
            className={styles.등록버튼}
            onClick={props.수정_등록 ? onClickUpdate : onClickSubmit}
          >
            {props.수정_등록 ? "수정" : "등록"}하기
          </button>
        </div>
      </div>
    </>
  );
}
