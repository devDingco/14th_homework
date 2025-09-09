"use client"

import { useMutation, useQuery } from "@apollo/client"
import { FETCH_BOARDS } from "./queries"
import { DeleteBoardDocument, DeleteBoardMutation, DeleteBoardMutationVariables, FetchBoardDocument, FetchBoardQuery, FetchBoardQueryVariables, FetchBoardsDocument, FetchBoardsQuery, FetchBoardsQueryVariables } from "@/commons/graphql/graphql"






export default function useBoardsPage() {

    const { data } = useQuery<FetchBoardsQuery, FetchBoardsQueryVariables>(FetchBoardsDocument)
    const [deleteBoard] = useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(DeleteBoardDocument)
    console.log(data);

    const onclickDelete = async (event:React.MouseEvent<HTMLImageElement> ) => {
        await deleteBoard({
            variables: {
                boardId: event.currentTarget.id
            },
            refetchQueries: [
                { query: FETCH_BOARDS }
            ]
        })
    }

    return {
        data,
   
        onclickDelete
    }
}