"use client"



import style from './styles.module.css'
import useBoardsDetail from './hooks';
import { DislikeOutlined, EnvironmentOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd';




export default function BoardsDetail() {
    const { 
        onClickMove,
        data,
        onClickdisLike,
        onClickLike } = useBoardsDetail()

    return (
        <div className={style.바탕}>
            <div className={style.main}>
                <h1>{data?.fetchBoard.title}</h1>
                <div className={style.header}>
                    <div className={style.header__row}>
                        <div className={style.header__user}>
                            <div className={style.header__avatar}>
                                <UserOutlined className={style.icon__profile} />

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

                        <Tooltip title={`${data?.fetchBoard.boardAddress?.address} ${data?.fetchBoard.boardAddress?.addressDetail}`} placement="bottomRight" color='white' overlayInnerStyle={{ color: 'black' }}>
                            <EnvironmentOutlined className={style.icon__map} />
                        </Tooltip>

                    </div>
                </div>

                <img className={style.image__main} src="/assets/images/BeachsideSerenity 1.png" />

                <div className={style.text}>
                    {data?.fetchBoard.contents}
                </div>

                <div className={style.image__wrapper}>

                    <iframe className={style.image__frame}
                        src={`https://www.youtube.com/embed/${data?.fetchBoard.youtubeUrl?.split("v=")[1]}`}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>


                </div>

                <div className={style.reactions}>
                    <div className={style.reactions__item}>
                        <DislikeOutlined onClick={onClickdisLike} />

                        <div>{data?.fetchBoard.dislikeCount}</div>
                    </div>
                    <div className={style.reactions__item}>
                        <LikeOutlined onClick={onClickLike} />
                        <div>{data?.fetchBoard.likeCount}</div>
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