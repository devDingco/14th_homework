"use client"

import { ApolloError, useMutation } from "@apollo/client"
import { DeleteBoardCommentDocument, DeleteBoardCommentMutation, DeleteBoardCommentMutationVariables, FetchBoardCommentsDocument } from "../../gql/graphql"

const useDeleteBoardComment = () => {
    const [deleteBoardCommentAPI] = useMutation<
        DeleteBoardCommentMutation,
        DeleteBoardCommentMutationVariables
    >(DeleteBoardCommentDocument)

    const postDeleteBoardComment = async (event: React.MouseEvent<HTMLImageElement>, page: number, boardId: string) => {
        event.stopPropagation()
        const deleteBoardCommentPw = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요")
        console.log('삭제 댓글 Id: ', event.currentTarget.dataset.key)
        console.log('비밀번호 : ', deleteBoardCommentPw)

        try {
            const result = await deleteBoardCommentAPI({
                variables: {
                    boardCommentId : String(event.currentTarget.dataset.key),
                    password: deleteBoardCommentPw
                },
                refetchQueries: [
                    {
                      query: FetchBoardCommentsDocument,
                      variables: { 
                            page: page ?? 1,
                            boardId: boardId
                        },
                    },
                ],
            })
            console.log("삭제한 댓글 ID: ",result.data?.deleteBoardComment)

        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }

    return {
        postDeleteBoardComment
    }
}

export default useDeleteBoardComment