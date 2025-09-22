"use client"

import styles from './style.module.css'
import useBoardsDetailPage from './hook'
import { useEffect, useState } from 'react'
import { FrownOutlined, LikeOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, Typography } from 'antd'
import { FetchBoardCommentsQuery, FetchBoardQuery } from '@/commons/gql/graphql'
import BoardDetailYoutube from '../youtube'
import useFetchBoard from '@/commons/api/useFetchBoard'
import { useParams } from 'next/navigation'

const { Text } = Typography;

interface IBoardDetail {
    getBoardComments: () => Promise<FetchBoardCommentsQuery | undefined>,
    setComments: React.Dispatch<React.SetStateAction<any>>
}

interface IBoardDetailData {
    getBoard: FetchBoardQuery | undefined,
    getBoardComment: FetchBoardCommentsQuery | undefined
}

const BoardsDetail = (props: IBoardDetail) => {
    const param = useParams()

    const {
        goListHandler,
        goUpdateHandler,
        getBoardDetail
    } = useBoardsDetailPage()
    const { board, loading, error, refetch } = useFetchBoard({boardId: param.boardId})
    
    const [boardDetailData, setBoardDetailData] = useState<IBoardDetailData>()

    // 하드코딩
    const goodBad = {
        good: 24,
        bad: 12
    }

    useEffect(()=>{
        (async ()=>{
            // const getBoardData = await getBoardDetail()
            const getBoardComment = await props.getBoardComments()
            // console.log('getBoardData :',getBoardData)
            setBoardDetailData({getBoard: board, getBoardComment: getBoardComment})
        })()
    },[])

    const address: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <Text copyable={true} >
              {boardDetailData?.getBoard?.fetchBoard.boardAddress?.address} {boardDetailData?.getBoard?.fetchBoard.boardAddress?.addressDetail}
            </Text>
          ),
        }
    ];

    let youtubeUrl: MenuProps['items']
    if (boardDetailData?.getBoard?.fetchBoard.youtubeUrl) {
        youtubeUrl = [
            {
                key: '1',
                label: (
                <Text copyable={true} >
                    {boardDetailData?.getBoard?.fetchBoard.youtubeUrl}
                </Text>
                ),
            }
        ];
    }
    
    return (
        <div className={`${styles.detail_main} flex_column`}>
            <h1 className={`b_28_36`}>
            {boardDetailData?.getBoard?.fetchBoard.title}
            </h1>
            <header id="detail_header" className={`${styles.header_1280w_80h} flex_column`}>
                <div id="detail_header_top" className={`${styles.header_top}`}>
                    <div id="" className={`${styles.detail_profile} flex_align_items_center flex_row flex_justi_sb`}>
                        <div className={`flex_row`}>
                            <img className={`${styles.profile_img}`} src="/svg/person.png" alt="profile"/>
                            {boardDetailData?.getBoard?.fetchBoard.writer}
                        </div>
                        <p className={`r_14_20`} style={{ color: "rgba(129, 129, 129, 1)" }}>{boardDetailData?.getBoard?.fetchBoard.createdAt.split("T")[0]}</p>
                    </div>
                </div>
                <hr />
                <div id="detail_header_bottom" className={`${styles.header_bottom} flex_row flex_align_self_flexend`}>
                    {
                        boardDetailData?.getBoard?.fetchBoard.youtubeUrl
                        ? 
                        <Dropdown menu={{ items: youtubeUrl }} placement="bottomRight">
                            <img className={`${styles.img_24w_24h}`} style={{ cursor: "pointer" }} src="/svg/link.png" alt="link"/>
                        </Dropdown>
                        : 
                        <img className={`${styles.img_24w_24h}`} style={{ cursor: "pointer" }} src="/svg/link.png" alt="link"/>
                    }
                    {
                        boardDetailData?.getBoard?.fetchBoard.boardAddress 
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
            {boardDetailData?.getBoard?.fetchBoard.contents}
            {
                boardDetailData?.getBoard?.fetchBoard.youtubeUrl
                ?
                <BoardDetailYoutube youtubeUrl={boardDetailData?.getBoard?.fetchBoard.youtubeUrl} />
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