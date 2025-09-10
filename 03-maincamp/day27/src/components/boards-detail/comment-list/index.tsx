import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import style from './styles.module.css'
import { FETCH_COMMENTS } from './queries'
import { FetchBoardCommentsQuery } from "@/gql/graphql";

import { Rate } from 'antd';



export default function CommentList(){
    const {boardId} = useParams()
    const result = useQuery(FETCH_COMMENTS,{
        variables:{
            page:1,
            boardId : boardId
        }
    }
    )
    

    return(
        result.data?.fetchBoardComments?.map(
            (el) => (
                <div key={el._id} className={style.comment}>
                    <div className={style.writer__rating}>
                        <div className={style.writer}><img src="/images/user.png" alt="" />{el.writer}</div>
                        <div className={style.rating}>
                        <Rate disabled defaultValue={el.rating} />

                        </div>
                    </div>
                    <div className={style.contents}>{el.contents}</div>
                    <div className={style.createdAt}>{new Date(el.createdAt).toISOString().split("T")[0]}</div>
                </div>
            )
        )
    )
}