"use client"

import BoardListBannerPage from "@/commons/layout/banner"
import BoardsPage from "@/components/board-list/list"
import Pagination from "@/components/board-list/pagination"

import style from "../../components/board-list/list/style.module.css"
import { FetchBoardsDocument, FetchBoardsQuery, FetchBoardsQueryVariables } from "@/commons/graphql/graphql"
import { useQuery } from "@apollo/client"
import { FETCH_BOARDS_COUNT } from "@/components/board-list/pagination/queries"
import { FETCH_BOARDS } from "@/components/board-list/list/queries"
import Search from "@/components/board-list/search/page"
import { useEffect, useState } from "react"
import { Modal } from "antd"
import { useRouter } from "next/navigation"


export default function Boardpage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter()
    const [keyword, setKeyword] = useState("")
    const { data, refetch } = useQuery(FETCH_BOARDS
    )
    const { data: dataCount } = useQuery(FETCH_BOARDS_COUNT)
    const lastPage = Math.ceil((dataCount?.fetchBoardsCount ?? 10) / 10)

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
        setIsModalOpen(true)
        
        }
    })

    const handleOk = () => {
        setIsModalOpen(false);
        router.push("/")
    }

    return (
        <div className={style.page}>

            <div className={style.boards}>
                <Search refetch={refetch} setKeyword={setKeyword} />
                <BoardsPage data={data?.fetchBoards} keyword={keyword} refetch={refetch} />
                <Pagination refetch={refetch} lastPage={lastPage} />
            </div>

            <Modal
                title="접근 불가"
                closable={{ 'aria-label': 'Custom Close Button' }}
                okText = "확인"
                cancelButtonProps={{style: {display: "none"}}}
                open={isModalOpen}
                onOk={handleOk}
           
            >
                <p>로그인 후 이동 가능합니다.</p>
               
            </Modal>
        </div>


    )
}