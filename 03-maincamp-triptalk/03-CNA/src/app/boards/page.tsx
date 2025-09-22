"use client";

import { useQuery, gql, useMutation } from "@apollo/client";
import Link from "next/link";
import styles from "./styles.module.css";
import { formatDate } from "@/utils/formatDate";
import deleteIcon from "@/assets/icons/delete.png";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      title
      writer
      createdAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export default function BoardListPage() {
  const { data } = useQuery(FETCH_BOARDS, { variables: { page: 1 } });
  const [deleteBoard, { loading: deleting }] = useMutation(DELETE_BOARD);

  const onClickDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    alert("삭제되었습니다!");
    try {
      await deleteBoard({
        variables: { boardId: id },
        refetchQueries: [{ query: FETCH_BOARDS, variables: { page: 1 } }],
        awaitRefetchQueries: true,
      });
    } catch (e: any) {
      alert(e?.message ?? "삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.card}>
        <div className={styles.header}>
          <div className={styles.noCol}>번호</div>
          <div className={styles.titleCol}>제목</div>
          <div className={styles.authorCol}>작성자</div>
          <div className={styles.dateCol}>날짜</div>
          <div className={styles.actionsCol}></div>
        </div>

        <ul className={styles.list} role="list">
          {data?.fetchBoards.map((board, index) => (
            <li key={board._id} className={styles.row}>
              <div className={styles.noCol}>{index + 1}</div>
              <Link href={`/boards/${board._id}`} className={styles.titleLink}>
                <span className={styles.titleText}>{board.title}</span>
              </Link>
              <div className={styles.authorCol}>
                <span className={styles.chip}>{board.writer}</span>
              </div>
              <div className={styles.dateCol}>
                <span className={styles.badge}>
                  {formatDate(board.createdAt)}
                </span>
              </div>
              <div className={styles.actionsCol}>
                <button
                  className={styles.deleteIcon}
                  onClick={(e) => onClickDelete(e, board._id)}
                  aria-label="삭제"
                  title="삭제"
                >
                  <img src={deleteIcon.src} alt="삭제" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
