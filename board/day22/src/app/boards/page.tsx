"use client"

import { gql, useMutation, useQuery } from "@apollo/client"
import style from './style.module.css'
import Link from "next/link"

const FETCH_BOARDS = gql`
query{
  fetchBoards{
  	_id,writer,title,contents,createdAt,updatedAt
  }
}
`;

const DELETE_BOARD = gql`
mutation deleteBoard($boardId: ID!){
  deleteBoard(boardId:$boardId)
    
}
`




export default function BoardsPage() {

    const { data } = useQuery(FETCH_BOARDS)
    const [deleteBoard] = useMutation(DELETE_BOARD)
    console.log(data);

    const onclickDelete = async (event) => {
        await deleteBoard({
            variables: {
                boardId: event.target.id
            },
            refetchQueries: [
                { query: FETCH_BOARDS }
            ]
        })
    }

    return (
        <div className={style.page}>
            <div className={style.boards}>
                <div className={style.header}>
                    <div className={style.header__number}>번호</div>
                    <div className={style.header__title}>제목</div>
                    <div className={style.header__writer}>작성자</div>
                    <div className={style.header__date}>날짜</div>
                </div>
                {data?.fetchBoards.map((el, index) => {
                    return (
                        <div key={el._id} className={style.data}>
                            <div className={style.data__number}>{index + 1}</div>
                            <Link href={`/board/detail/${el._id}`}><div className={style.data__title}>{el.title}</div></Link>
                            <div className={style.data__writer}>{el?.writer}</div>
                            <div className={style.data__date}>{el?.createdAt.slice(0, 10).replaceAll("-", ".")}</div>
                            <div className={style.data__delete}><img src="/assets/icons/delete.png" alt="" id={el?._id} onClick={onclickDelete} /></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}