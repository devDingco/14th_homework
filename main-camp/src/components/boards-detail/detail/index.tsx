"use client"

import styles from './style.module.css'
import useBoardsDetailPage from './hook'
import { useEffect } from 'react'
import { FrownOutlined, LikeOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, Typography } from 'antd'
import BoardDetailYoutube from '../youtube'
import { IBoardDetail } from './type'

const { Text } = Typography;

const BoardsDetail = (props: IBoardDetail) => {

    const {
        goListHandler,
        goUpdateHandler
    } = useBoardsDetailPage()

    // 하드코딩
    const goodBad = {
        good: 24,
        bad: 12
    }

    useEffect(()=>{
        (async ()=>{
            // console.log('디테일 컴포넌트 마운트 :', props.board)
            // const getBoardData = await getBoardDetail()
            // const getBoardComment = await props.getBoardComments()
            // console.log('getBoardData :',getBoardData)
            // setBoardDetailData({getBoard: props.board, getBoardComment: getBoardComment})
        })()
    },[])

    const address: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <Text copyable={true} >
              {props.boardDetail?.boardAddress?.address} {props.boardDetail?.boardAddress?.addressDetail}
            </Text>
          ),
        }
    ];

    let youtubeUrl: MenuProps['items']
    if (props.boardDetail?.youtubeUrl) {
        youtubeUrl = [
            {
                key: '1',
                label: (
                <Text copyable={true} >
                    {props.boardDetail.youtubeUrl}
                </Text>
                ),
            }
        ];
    }
    
    return (
        <div className={`${styles.detail_main} flex_column`}>
            <h1 className={`b_28_36`}>
            {props.boardDetail?.title}
            </h1>
            <header id="detail_header" className={`${styles.header_1280w_80h} flex_column`}>
                <div id="detail_header_top" className={`${styles.header_top}`}>
                    <div id="" className={`${styles.detail_profile} flex_align_items_center flex_row flex_justi_sb`}>
                        <div className={`flex_row`}>
                            <img className={`${styles.profile_img}`} src="/svg/person.png" alt="profile"/>
                            {props.boardDetail?.writer}
                        </div>
                        <p className={`r_14_20`} style={{ color: "rgba(129, 129, 129, 1)" }}>{props.boardDetail?.createdAt.split("T")[0]}</p>
                    </div>
                </div>
                <hr />
                <div id="detail_header_bottom" className={`${styles.header_bottom} flex_row flex_align_self_flexend`}>
                    {
                        props.boardDetail?.youtubeUrl
                        ? 
                        <Dropdown menu={{ items: youtubeUrl }} placement="bottomRight">
                            <img className={`${styles.img_24w_24h}`} style={{ cursor: "pointer" }} src="/svg/link.png" alt="link"/>
                        </Dropdown>
                        : 
                        <img className={`${styles.img_24w_24h}`} style={{ cursor: "pointer" }} src="/svg/link.png" alt="link"/>
                    }
                    {
                        props.boardDetail?.boardAddress
                        ?
                        <Dropdown menu={{ items: address } }placement="bottomRight">
                            <img className={`${styles.img_24w_24h}`} style={{ cursor: "pointer" }} src="/svg/location.png" alt="location"/>
                        </Dropdown>
                        : 
                        <img className={`${styles.img_24w_24h}`} style={{ cursor: "pointer" }} src="/svg/location.png" alt="location"/>
                    }
                </div>
            </header>
            <img src="/image/Tranquil Beachside Serenity 1.png" alt="publish1"/>
            {props.boardDetail?.contents}
            {
                props.boardDetail?.youtubeUrl
                ?
                <BoardDetailYoutube youtubeUrl={props.boardDetail.youtubeUrl} />
                : 
                null
            }
            
            <div id="" className={`${styles.bad_good_48h} flex_row flex_justi_center`}>
                <div id="bad_area" className={`${styles.bad_good_btn_frame} flex_column flex_align_items_center`}>
                    <FrownOutlined />
                    <p className={`r_14_20`}>{goodBad.bad}</p>
                </div>
                <div id="good_area" className={`${styles.bad_good_btn_frame} flex_column flex_align_items_center`}>
                    <LikeOutlined />
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
            <div className={`${styles.detail_line}`}></div>
        </div>
    )
}

export default BoardsDetail