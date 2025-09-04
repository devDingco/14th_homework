"use client"

import styles from './styles.module.css'
import { gql, useMutation, useQuery } from "@apollo/client";
// import { on } from 'events';
import { useRouter } from 'next/navigation';

const FETCH_BOARDS = gql`
  query{
  fetchBoards(
    page:1
  ){
    writer
    title
    contents
    createdAt
    _id
  }
}
`;
const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!){
  deleteBoard(boardId:$boardId)
  }

`;

export default function BoardsPage() {
  const router = useRouter();

    const onClickDelete = async (event) => {
    alert("삭제가 완료되었습니다.")
    await deleteBoard({
      variables: {
        boardId: String(event.currentTarget.id),
        // html -> 화면에 그려짐 -> 이때는이미 "텍스트화되어잇음"-> 삭제클릭
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickMove = (boardId) => {
    router.push(`/boards/detail/${boardId}`);
  }

  return (

    <div className={styles.box}>
        <div className={styles.container}>
            <div className={styles.board_container}>
                <div className={styles.board}>
                    <div className={styles.board__main}>
                        <div className={styles.board__main__titlebox}>
                            <div className={styles.board__main__titlebox__number}>번호</div>
                            <div className={styles.board__main__titlebox__title}>제목 </div>
                            <div className={styles.board__main__titlebox__writer}>작성자</div>
                            <div className={styles.board__main__titlebox__date}>날짜</div>
                        </div>
                        <div className={styles.board__main__articlebox}>
                            {data?.fetchBoards.map((el, index) => (
                                <div key={el._id} className={styles.board__main__articlebox__item} >
                                    <div className={styles.board__main__articlebox__item__number}>{index + 1}</div>
                                    <div className={styles.board__main__articlebox__item__title} onClick={() => onClickMove(el._id)}>{el.title}</div>
                                    <div className={styles.board__main__articlebox__item__writer}>{el.writer}</div>
                                    <div className={styles.board__main__articlebox__item__date}>{new Date(el.createdAt).toISOString().split("T")[0]}</div>
                                    <button className={styles.board__main__articlebox__item__delete} id={el._id} onClick={onClickDelete}>
                                                        <img
                                                        src={"/images/delete.png"}
                                                          alt="삭제"
                                                        />
                                                        </button>
                                                        
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
  )
}