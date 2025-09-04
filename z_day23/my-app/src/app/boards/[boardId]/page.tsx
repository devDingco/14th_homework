"use client";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import styles from "./styles.module.css";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;
export default function BoardsDetail() {
  const params = useParams();
  const boardId = params.boardId;
  const { loading, data, error } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: String(boardId),
    },
  });
  if (loading) return <div>게시글을 불러오는 중입니다...</div>;
  // 에러 발생 시 처리
  if (error) return <div>오류가 발생했습니다: {error.message}</div>;
  // 데이터가 없거나 쿼리가 스킵되어 data가 아직 없을 때 처리
  if (!data) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <>
      <div className={styles.boards}>
        <div className={styles.boards_detail}>
          <div className={styles.boards_body}>
            <div className={styles.boards_body_main}>
              <div className={styles.제목_font}>
                제목: {data.fetchBoard.title}
              </div>
              <div className={styles.글쓴이_날짜}>
                <div className={styles.글쓴이_날짜_좁은거}>
                  <div className={`${styles.글쓴이_font} ${styles.글쓴이}`}>
                    <img src="/images/profile.png" alt=""></img>
                    <div className={styles.글쓴이_name}>
                      작성자: {data.fetchBoard.writer}
                    </div>
                  </div>
                  <div className={`${styles.날짜} ${styles.날짜_font}`}>
                    {data.fetchBoard.createdAt}
                  </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.복붙_위치_위치조정}>
                  <div className={styles.복붙_위치}>
                    <img src="/images/copy.png" alt=""></img>
                    <img src="/images/location.png" alt=""></img>
                  </div>
                </div>
              </div>
              <div>
                <img src="/images/beach.png" alt=""></img>
              </div>
              <div className={styles.content}>
                내용: {data.fetchBoard.contents}
              </div>
              <div className={styles.video_div}>
                <img src="/images/video.png" alt=""></img>
              </div>
              <div className={styles.bad_good}>
                <div className={(styles.bad, styles.good_bad_font)}>
                  <img src="/images/bad.png" alt=""></img>
                  24
                </div>
                <div className={(styles.good, styles.good_bad_font)}>
                  <img src="/images/good.png" alt=""></img>
                  12
                </div>
              </div>
              <div className={styles.buttons}>
                <button className={(styles.button, styles.button_font)}>
                  <img src="/images/list.png" alt=""></img>목록으로
                </button>
                <button className={(styles.button, styles.button_font)}>
                  <img src="/images/fix.png" alt=""></img>수정하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
