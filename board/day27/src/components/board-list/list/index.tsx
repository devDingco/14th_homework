"use client"


import style from './style.module.css'
import useBoardsPage from "./hooks";
import Modal from 'antd/es/modal/Modal';
import { useState } from 'react';





export default function BoardsPage() {
    const { data,      showModal,
        handleOk,
        handleCancel,
        isModalOpen,
        saveId
         } = useBoardsPage()

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
                        <a key={el._id} className={style.data} href={`/board/detail/${el._id}`}>
                            <div className={style.data__number}>{index + 1}</div>
                            <div className={style.data__title}>{el.title}</div>
                            <div className={style.data__writer}>{el?.writer}</div>
                            <div className={style.data__date}>{el?.createdAt.slice(0, 10).replaceAll("-", ".")}</div>
                            <div className={style.data__delete}><img src="/assets/icons/delete.png" alt="" id={el?._id} onClick={showModal} /></div>
                        </a>
                    )
                })}
            </div>
            <Modal
                title="게시글 삭제"
                // closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>{saveId}의 게시글을 삭제하시겠습니까?</p>
            </Modal>
        </div>


    )
}