"use client"

import { useIsEdit } from "@/commons/isEditProvider"
import { FETCH_BOARD } from "@/components/boards-detail/queries"
import { ApolloError, useApolloClient } from "@apollo/client"
import { useParams } from "next/navigation"

const useBoardsEditPage = () => {
    const client = useApolloClient();
    const param = useParams()
    const { isEdit } = useIsEdit()

    const getBoardDetail = async () => {
        try {
            if (isEdit) {
                const { data } = await client.query({
                    query: FETCH_BOARD, 
                    variables: {
                        boardId: param.boardId,
                    },
                })
                return data
            }            
        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }
    
    return {
        getBoardDetail
    }
}

export default useBoardsEditPage