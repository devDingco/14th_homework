"use client"

import { ApolloError, useMutation } from "@apollo/client";
import { CreateBoardCommentDocument, CreateBoardCommentMutation, CreateBoardCommentMutationVariables, FetchBoardCommentsDocument } from "../../gql/graphql";
import { IPostCreateBoardComment } from "../type";

const useCreateBoardComment = () => {
    const [createBoardCommentAPI] = useMutation<
        CreateBoardCommentMutation,
        CreateBoardCommentMutationVariables
    >(CreateBoardCommentDocument)

    const postCreateBoardComment = async ({ boardId, commentInput }: IPostCreateBoardComment) => {
        try {
            console.log('상세페이지 댓글 등록 직전: ',commentInput)
            const result = await createBoardCommentAPI({
                variables: {
                    createBoardCommentInput: {
                        writer: commentInput.writer,
                        password: commentInput.password,
                        contents: commentInput.contents,
                        rating: commentInput.rating
                    },
                    boardId: String(boardId)
                },
                refetchQueries: [
                    {
                      query: FetchBoardCommentsDocument,
                      variables: { page: 1, boardId: String(boardId) },
                    },
                ],
            })
            console.log("댓글 쓰기 결과: ", result)
        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }
    
    return {
        postCreateBoardComment
    }
}

export default useCreateBoardComment