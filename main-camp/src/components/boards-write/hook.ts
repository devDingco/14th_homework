"use client"

import { gql, useMutation, useQuery } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import { ChangeEvent, MouseEventHandler, useState } from "react"
import { IErrSetState, IFunctionUpdateBoard, IOnChangePosting, IPostUpdateData, IUpdateBoardInput } from "./type"
import { CREATE_BOARD, UPDATE_BOARD } from "./queries"
import { useIsEdit } from "@/commons/isEditProvider"

const useBoardWrite = () => {
    const router = useRouter()
    const param = useParams()
    const { writer, setWriter, title, setTitle, password, setPassword, contents, setContents } = useIsEdit()

    const [createBoard] = useMutation(CREATE_BOARD)
    const [updateBoard] = useMutation(UPDATE_BOARD)

    const onChangePosting = (props: IOnChangePosting) => (event: ChangeEvent<HTMLInputElement>) => {
        switch (props.category) {
            case "작성자": {
                setWriter(event.target.value)
                break
            }
            case "비밀번호": {
                setPassword(event.target.value)
                break
            }
            case "제목": {
                setTitle(event.target.value)
                break
            }
            case "내용": {
                setContents(event.target.value)
                break
            }
            default:
        }
    }

    const fetchingBoard = async () => {
        try {
            // createBoard 게시글 등록
            const result = await createBoard({
                variables: {
                    createBoardInput: {
                        writer: writer,
                        password: password,
                        title: title,
                        contents: contents
                    }
                }
            })
            router.push(`/boards/${result.data.createBoard._id}`)
        } catch(e) {
            alert(`에러가 발생하였습니다. 다시 시도해 주세요. ${e}`)
        }
    }

    const updatingBoard = async () => {
        console.log('업데이트 실행!')
        // try {
        //     const result = await updateBoard({
        //         variables: {
        //             updateBoardInput
        //         }
        //     })
        //     console.log(result.data.createBoard._id)
        //     router.push(`/boards/${result.data.createBoard._id}`)
        // } catch(e: any) {
        //     alert(`${e.graphQLErrors} 비밀번호가 틀렸습니다.`)
        // }
    }

    const boardUpdateSetting = (data: IFunctionUpdateBoard | undefined) => {
        const inputBoardPw = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요")

        const updateBoardInput: IUpdateBoardInput = {
            password: inputBoardPw,
            boardId: param.boardId,
            title: data?.title,
            contents: data?.contents
        }

        return updateBoardInput
    }

    

    return {
        onChangePosting,
        boardUpdateSetting,
        fetchingBoard,
        updatingBoard
    }
}

export default useBoardWrite