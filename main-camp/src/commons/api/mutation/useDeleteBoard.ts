"use client"

import { DeleteBoardDocument, DeleteBoardMutation, DeleteBoardMutationVariables, FetchBoardsDocument } from "@/commons/gql/graphql"
import { useIsModal } from "@/commons/provider/isModalProvider"
import { ApolloError, useMutation } from "@apollo/client"

const useDeleteBoard = () => {
    const { setIsWarningModal } = useIsModal()
    
    const [deleteBoardAPI] = useMutation<
        DeleteBoardMutation,
        DeleteBoardMutationVariables
    >(DeleteBoardDocument)
    
    const postDeleteBoard = async (boardId: string) => {
        try {
            const result = await deleteBoardAPI({
            variables: {
                    boardId : String(boardId)
                },
                refetchQueries: [
                    { query: FetchBoardsDocument, variables: { page: 1 } }
                ]
            })
            console.log("삭제한 게시글 ID: ",result.data?.deleteBoard)

            // alert("게시글이 삭제되었습니다!")
            setIsWarningModal({ open: true, value:'게시글이 삭제되었습니다.'})
        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }

    return {
        postDeleteBoard
    }
}

export default useDeleteBoard