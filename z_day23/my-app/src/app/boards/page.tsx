"use client";

import styles from "./styles.module.css";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

interface IFetchBoard {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  createdAt: string;
}

const formatDate = (dateString: string): string => {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function BoardDetail() {
  const { data } = useQuery(FETCH_BOARDS);
  const router = useRouter();
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = async (boardIdToDelete: string) => {
    alert("삭제를 시도합니다.");
    try {
      const result = await deleteBoard({
        variables: {
          boardId: boardIdToDelete,
        },
        refetchQueries: [{ query: FETCH_BOARDS }],
      });

      alert(
        `게시글 (ID: ${result.data.deleteBoard})이 성공적으로 삭제되었습니다.`
      );
    } catch (error: any) {
      alert(`게시글 삭제에 실패했습니다: ${error.message}`);
      console.error("게시글 삭제 오류:", error);
    }
  };

  return (
    <>
      <div className={styles.board}>
        <div className={styles.board_frame}>
          <div className={styles.board_body}>
            <div className={styles.board_list_frame}>
              <div className={styles.board_list}>
                <div className={styles.name}>
                  <div className={styles.number}>번호</div>
                  <div className={styles.title}>제목</div>
                  <div className={styles.writer}>작성자</div>
                  <div className={styles.createdat}>날짜</div>
                </div>
                <div className={styles.list}>
                  {data?.fetchBoards.map((el: IFetchBoard, index: number) => {
                    const displayDate = formatDate(el.createdAt);
                    const onClickTitle = () => {
                      router.push(`/boards/${el._id}`);
                    };
                    return (
                      <div key={el._id} className={styles.listItem}>
                        <div className={styles.name_written}>
                          <div className={styles.number_written}>
                            {index + 1}
                          </div>
                          <div className={styles.title} onClick={onClickTitle}>
                            {el.title}
                          </div>
                          <div className={styles.writer}>{el.writer}</div>
                          <div className={styles.createdat_written}>
                            {displayDate}
                          </div>
                          <div className={styles.deleteButtonContainer}>
                            <button onClick={() => onClickDelete(el._id)}>
                              <img src="/images/delete.png" alt="삭제" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
