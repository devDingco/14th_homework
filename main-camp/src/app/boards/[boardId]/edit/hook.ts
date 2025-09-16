"use client"

import { FetchBoardDocument, FetchBoardQuery, FetchBoardQueryVariables } from "@/commons/gql/graphql"
import { useIsEdit } from "@/commons/isEditProvider"
import { ApolloError, useApolloClient } from "@apollo/client"
import { useParams } from "next/navigation"

const useBoardsEditPage = () => {
    const client = useApolloClient();
    const param = useParams()
    const { isEdit } = useIsEdit()

    const getBoardDetail = async () => {
        try {
            if (isEdit) {
                const { data } = await client.query<FetchBoardQuery, FetchBoardQueryVariables>({
                    query: FetchBoardDocument,
                    variables: {
                        boardId: String(param.boardId),
                    }
                })
                console.log(data)
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