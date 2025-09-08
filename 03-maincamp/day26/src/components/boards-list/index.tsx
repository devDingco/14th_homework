"use client"

import styles from './styles.module.css'
import useBoardsList from './hook'
import { FetchBoardQuery } from '@/gql/graphql'

export default function BoardsList() {

  const {
    data,
    onClickDelete,
    onClickMove,
  } = useBoardsList()
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
                            {data?.fetchBoards.map((el: FetchBoardQuery["fetchBoard"], index:number) => (
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