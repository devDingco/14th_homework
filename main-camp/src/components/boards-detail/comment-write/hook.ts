"use client"

import { ChangeEvent, useState } from "react"
import { IOnChangeWriting } from "./type"
import { ApolloError, useApolloClient, useMutation } from "@apollo/client"
import { CreateBoardCommentDocument, CreateBoardCommentMutation, CreateBoardCommentMutationVariables, FetchBoardCommentsDocument, FetchBoardCommentsQuery, FetchBoardCommentsQueryVariables } from "@/commons/gql/graphql"
import { useParams } from "next/navigation"
import useBoardCommentList from "../comment-list/hook"

interface IUseBoardsCommentWrite {
    commentWriter: string,
    commentPassword: string,
    commentContents: string,
    getBoardComments: () => Promise<FetchBoardCommentsQuery | undefined>,
}

interface ICommentValObj {
    commentWriter: string,
    commentPassword: string,
    commentContents: string
}

const useBoardsCommentWrite = (props: IUseBoardsCommentWrite) => {
    const param = useParams()
    const [isActive, setIsActive] = useState<boolean>(false)

    const [createBoardCommentAPI] = useMutation<
        CreateBoardCommentMutation,
        CreateBoardCommentMutationVariables
    >(CreateBoardCommentDocument)

    const creatingBoardComment = async () => {
        try {
            // createBoard 게시글 등록
            console.log(props.commentContents)
            const result = await createBoardCommentAPI({
                variables: {
                    createBoardCommentInput: {
                        writer: props.commentWriter,
                        password: String(props.commentPassword),
                        contents: props.commentContents,
                        // 하드코딩
                        rating: 1
                    },
                    boardId: String(param.boardId)
                }
            })
            console.log("댓글 쓰기 결과: ", result)
            props.getBoardComments()
        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }

    const activeButton = (valObj: ICommentValObj) => {
        if (isActive) {
            if (valObj.commentWriter === "" || valObj.commentPassword === "" || valObj.commentContents === "") {
                setIsActive(false)
            }
        } else {
            if (valObj.commentWriter && valObj.commentPassword && valObj.commentContents) {
                setIsActive(true)
            }
        }
    }

    return {
        creatingBoardComment,
        activeButton, isActive
    }
}

export default useBoardsCommentWrite