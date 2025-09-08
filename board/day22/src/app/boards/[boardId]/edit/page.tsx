"use client"

import BoardsWrite from "@/components/boards-write"
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      likeCount
      dislikeCount
      createdAt
    }
    }
`;


export default function BoardsEdit(){
    const boardId = useParams()

    const {data} = useQuery(FETCH_BOARD, {
        variables: {
            boardId: boardId.boardId
        }
    })

    alert
        
    

    return(
        <BoardsWrite isEdit={true} data={data}/>
    )
}