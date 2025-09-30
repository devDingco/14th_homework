"use client"

import { FetchBoardDocument } from "@/commons/graphql/graphql"
import { withAuth } from "@/commons/hocs/auth"
import BoardsWrite from "@/components/boards-write"
import { useQuery } from "@apollo/client"
import { useParams } from "next/navigation"

function BoardsEditPage() {
    const params = useParams()
    const boardId = String(params.boardId) 
    
    const { data } = useQuery(FetchBoardDocument, {
        variables: {
            boardId: boardId
        },
    })
    return (
        <BoardsWrite isEdit={true} data={data}/>
    )
}

export default withAuth(BoardsEditPage)