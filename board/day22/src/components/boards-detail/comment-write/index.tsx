"use client"
import style from "./style.module.css"
import useCommentWritePage from "./hooks";




export default function CommentWritePage() {

    const { 
        onChangeWriter,
        onChangePassword,
        onChangeComment,
        onClickSubmit } = useCommentWritePage()




    return (
        <div className={style.page}>
            <div className={style.comment}>
                <hr className={style.comment__hr} />
                <div className={style.comment__head}>
                    <img src="/assets/icons/chat.png"></img>
                    <div>댓글</div>
                </div>
                <div className={style.comment__star}>별 별 별 별 별</div>
                <div className={style.comment__main}>
                    <div className={style.comment__info}>
                        <div className={style.comment__info__write}>
                            <div>작성자<span className={style.st}> *</span></div>
                            <input onChange={onChangeWriter} className={style.comment__info__input} type="text" placeholder="작성자 명을 입력해 주세요."></input>
                        </div>
                        <div className={style.comment__info__password}>
                            <div>비밀번호<span className={style.st}> *</span></div>
                            <input onChange={onChangePassword} className={style.comment__info__input} type="password" placeholder="비밀번호를 입력해주세요."></input>
                        </div>
                    </div>
                    <textarea onChange={onChangeComment} className={style.comment__textarea} placeholder="댓글을 입력해주세요." ></textarea>
                    <button onClick={onClickSubmit} className={style.comment__submit}>등록하기</button>
                </div>
            </div>
        </div>
    )
}