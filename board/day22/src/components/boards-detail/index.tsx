"use client"



import style from './styles.module.css'
import useBoardsDetail from './hooks';




export default function BoardsDetail() {
    const {onClickMove, data} = useBoardsDetail()

    return (
        <div className={style.바탕}>
            <div className={style.main}>
                <h1>{data?.fetchBoard.title}</h1>
                <div className={style.header}>
                    <div className={style.header__row}>
                        <div className={style.header__user}>
                            <div className={style.header__avatar}>
                                <img className={style.icon__profile} src="/assets/icons/profile.png"></img>
                            </div>
                            <div>{data?.fetchBoard.writer}</div>
                        </div>
                        <div>
                            <span>2024.11.11</span>
                        </div>
                    </div>
                    <hr />
                    <div className={style.header__icons}>
                        <img className={style.icon__link} src="/assets/icons/link.png" />
                        <img className={style.icon__map} src="/assets/icons/jido.png" />
                    </div>
                </div>

                <img className={style.image__main} src="/assets/images/BeachsideSerenity 1.png" />

                <div className={style.text}>
                    {data?.fetchBoard.contents}
                </div>

                <div className={style.image__wrapper}>
                    <img className={style.image__frame} src="/assets/images/Frame4.png"></img>
                </div>

                <div className={style.reactions}>
                    <div className={style.reactions__item}>
                        <img src="/assets/icons/bad.png"></img>
                        <div>24</div>
                    </div>
                    <div className={style.reactions__item}>
                        <img src="/assets/icons/good.png"></img>
                        <div>12</div>
                    </div>
                </div>

                <div className={style.actions}>
                    <button className={style.actions__item} >
                        <img className={style.icon__list} src="/assets/icons/vector.png"></img>
                        <div>목록으로</div>
                    </button>
                    <button className={style.actions__item} onClick={onClickMove}>
                        <img className={style.icon__edit} src="/assets/icons/left_icon.png"></img>
                        <div>수정하기</div>
                    </button>
                </div>


            </div>
        </div>
    )
}