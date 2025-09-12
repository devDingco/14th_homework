"use client"

import styles from './style.module.css'
import useBoardsDetailPage from './hook'

const BoardsDetail = () => {
    const {
        goListHandler,
        goUpdateHandler,
        fetchBoard
    } = useBoardsDetailPage()

    // 하드코딩
    const goodBad = {
        good: 24,
        bad: 12
    }

    return (
        <div id="main" className={`${styles.detail_main}`}>
            <h1 className={`b_28_36`}>
            {fetchBoard?.fetchBoard.title}
            </h1>
            <header id="detail_header" className={`${styles.header_1280w_80h} flex_column`}>
                <div id="detail_header_top" className={`${styles.header_top}`}>
                    <div id="" className={`${styles.detail_profile} flex_align_items_center flex_row flex_justi_sb`}>
                        <div className={`flex_row`}>
                            <img className={`${styles.profile_img}`} src="/svg/person.png" alt="profile"/>
                            {fetchBoard?.fetchBoard.writer}
                        </div>
                        <p className={`r_14_20`} style={{ color: "rgba(129, 129, 129, 1)" }}>{fetchBoard?.fetchBoard.createdAt.split("T")[0]}</p>
                    </div>
                </div>
                <hr />
                <div id="detail_header_bottom" className={`${styles.header_bottom} flex_row flex_align_self_flexend`}>
                    <img className={`${styles.img_24w_24h}`} src="/svg/link.png" alt="link"/>
                    <img className={`${styles.img_24w_24h}`} src="/svg/location.png" alt="location"/>
                </div>
            </header>
            <img src="/image/Tranquil Beachside Serenity 1.png" alt="publish1"/>
            {fetchBoard?.fetchBoard.contents}
            <div className={`${styles.detail_video} flex_row flex_justi_center`}>
                <img src="/image/Frame 427323252.png" alt="publish2"/>
            </div>
            <div id="" className={`${styles.bad_good_48h} flex_row flex_justi_center`}>
                <div id="bad_area" className={`${styles.bad_good_btn_frame} flex_column flex_align_items_center`}>
                    <img src="/svg/bad.png" alt="bad"/>
                    <p className={`r_14_20`}>{goodBad.bad}</p>
                </div>
                <div id="good_area" className={`${styles.bad_good_btn_frame} flex_column flex_align_items_center`}>
                    <img src="/svg/good.png" alt="good"/>
                    <p className={`r_14_20`} style={{ color: "rgba(246, 106, 106, 1)" }}>{goodBad.good}</p>
                </div>
            </div>
            <div className={`${styles.detail_update} flex_row flex_justi_center`}>
                <button className={`flex_row flex_align_items_center`} onClick={goListHandler}>
                    <img src="/svg/menu.png" alt="menu"/>
                    <p className={`sb_14_20`} style={{ whiteSpace: "nowrap" }}>목록으로</p>
                </button>
                <button className={`flex_row flex_align_items_center`} onClick={goUpdateHandler}>
                    <img src="/svg/edit.png" alt="edit"/>
                    <p className={`sb_14_20`} style={{ whiteSpace: "nowrap" }}>수정하기</p>
                </button>
            </div>
        </div>
    )
}

export default BoardsDetail