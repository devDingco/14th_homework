"use client"

import style from "./style.module.css"
import useBoardsDetail from "../detail/hooks";
import useCommentListPage from "./hooks";




export default function CommentListPage() {
    const {data} = useCommentListPage()

    return (
        <>
            {data?.fetchBoardComments.map((el) => {
                return (
                    <div className={style.commentlist} key={el._id}>

                        <div className={style.commentlist__info}>
                            <div className={style.commentlist__info__left}>
                                <div className={style.commentlist__info__left__1}>
                                    <div className={style.commentlist__info__left__1__border}>
                                        <img className={style.commentlist__info__left__1__img} src="/assets/icons/profile.png" alt="" />
                                    </div>
                                    <div>{el.writer}</div>
                                </div>
                                <div>별 별 별 별 별</div>
                            </div>
                            <div className={style.commentlist__info__right}>
                                <img className={style.commentlist__info__right__edit} src="/assets/icons/left_icon.png" alt="" />
                                <img className={style.commentlist__info__right__X} src="/assets/icons/X.png" alt="" />
                            </div>
                        </div>
                        <div className={style.commentlist__contents}>{el.contents}</div>
                        <div className={style.commentlist__createdAt}>{el.createdAt.slice(0, 10).replaceAll("-", ".")}</div>
                    </div>
                )

            })
            }
        </>
    )





}