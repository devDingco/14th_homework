"use client"

import { FetchBoardDocument, FetchBoardQuery, FetchBoardQueryVariables } from "@/commons/graphql/graphql";
import BoardsWrite from "@/components/boards-write"
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";




export default function BoardsEdit(){
    const boardId = useParams()

    const {data} = useQuery<FetchBoardQuery>(FetchBoardDocument, {
        variables: {
            boardId: boardId.boardId
        }
    })

        
    

    return(
        <BoardsWrite isEdit={true} data={data}/>
    )
}