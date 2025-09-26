"use client"

import { FetchBoardCommentsDocument, UpdateBoardCommentDocument, UpdateBoardCommentInput, UpdateBoardCommentMutation, UpdateBoardCommentMutationVariables } from "@/commons/gql/graphql"
import { useIsBoardDetail } from "@/commons/provider/isBoardDetailProvider"
import { ApolloError, useMutation } from "@apollo/client"

const useUpdateBoardComment = () => {
    const { commentInput } = useIsBoardDetail()
    
    const [updateBoardCommentAPI] = useMutation<
        UpdateBoardCommentMutation, 
        UpdateBoardCommentMutationVariables
    >(UpdateBoardCommentDocument)

    const postUpdateBoardComment = async (boardId: string, commentBoardId: string) => {
        const updateBoardCommentInput = commentUpdateSetting(commentBoardId)
        console.log('업데이트 직전: ', updateBoardCommentInput)

        try {
            const result = await updateBoardCommentAPI({
                variables: {
                    ...updateBoardCommentInput
                },
                refetchQueries: [
                    {
                      query: FetchBoardCommentsDocument,
                      variables: { boardId: String(boardId) },
                    },
                ],
            })
            console.log('댓글 업데이트 결과: ',result.data?.updateBoardComment)
        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }

    const commentUpdateSetting = (commentBoardId: string) => {
    const { writer, password, ...forUpdateData } = commentInput

        // 업데이트 시도할 인풋 데이터들
        const updateBoardCommentInput = {
            updateBoardCommentInput: {...forUpdateData} as UpdateBoardCommentInput,
            password: commentInput.password,
            boardCommentId: String(commentBoardId),
        }

        console.log('업데이트된 댓글 객체 확인: ', updateBoardCommentInput)
        return updateBoardCommentInput
    }

    return {
        postUpdateBoardComment
    }
}

export default useUpdateBoardComment