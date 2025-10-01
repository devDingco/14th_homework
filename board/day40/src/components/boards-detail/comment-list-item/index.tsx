"use client"

import { Rate } from "antd"
import style from "../comment-list/style.module.css"
import { useState } from "react"
import CommentWritePage from "../comment-write"

export default function CommentItem(props){
    const [isEdit, setIsEdit] = useState(false)

    const onClickEdit = () => {
        setIsEdit(true);
    }

    return isEdit ? 
        <CommentWritePage isEdit={isEdit} data={props.el} onDone={()=>setIsEdit(false)} />
     : (
        <div className={style.commentlist} key={props.el._id}>

        <div className={style.commentlist__info}>
            <div className={style.commentlist__info__left}>
                <div className={style.commentlist__info__left__1}>
                    <div className={style.commentlist__info__left__1__border}>
                        <img className={style.commentlist__info__left__1__img} src="/assets/icons/profile.png" alt="" />
                    </div>
                    <div>{props.el.writer}</div>
                </div>
                <Rate allowHalf disabled defaultValue={props.el.rating} />
                
            </div>
            <div className={style.commentlist__info__right}>
                <img className={style.commentlist__info__right__edit} src="/assets/icons/left_icon.png" onClick={onClickEdit} />
                <img className={style.commentlist__info__right__X} src="/assets/icons/X.png" alt="" />
            </div>
        </div>
        <div className={style.commentlist__contents}>{props.el.contents}</div>
        <div className={style.commentlist__createdAt}>{props.el.createdAt.slice(0, 10).replaceAll("-", ".")}</div>
    </div>

    )

}