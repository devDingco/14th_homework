 "use client"

import { Rate } from "antd"
import style from './styles.module.css'
import { useState } from "react"
import CommentWrite from "../comment-write"
   
import { CommentListItemProps } from "./types"



 export default function CommentListItem({ el }: CommentListItemProps){
   const [isEdit,setIsEdit] = useState(false)
   const onClickEdit = () => {
      setIsEdit(true)
   }
    return(
              isEdit ? <CommentWrite isEdit={isEdit} setIsEdit={setIsEdit} el={el}/> :
                       <div className={style.comment}>
                           <div className={style.header}>
                             <div className={style.headerLeft}>
                                <div className={style.writer}><img src="/images/user.png" alt="" />{el.writer}</div>
                                <div className={style.rating}>
                                <Rate disabled defaultValue={el.rating} />
                                </div>

                             </div>
                             <div className={style.headerRight}>
                                <button onClick={onClickEdit} className={style.edit}>
                                 <img src="/images/comment_edit.png" alt="" />
                                 </button>
                                 <button className={style.delete}>
                                <img src="/images/comment_close.png" alt="" />
                                 </button>
                                
                             </div>
                           </div>
                           <div className={style.contents}>{el.contents}</div>
                           <div className={style.createdAt}>{new Date(el.createdAt).toISOString().split("T")[0]}</div>
                       </div>

              
                  

    )


 }
 