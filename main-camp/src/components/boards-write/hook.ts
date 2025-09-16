"use client"

import { ApolloError, useMutation } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import { ChangeEvent } from "react"
import { IOnChangePosting, IOnUpdateHandler, IUpdateBoardInput } from "./type"
import { useIsEdit } from "@/commons/isEditProvider"
import { CreateBoardDocument, CreateBoardMutation, CreateBoardMutationVariables, UpdateBoardDocument, UpdateBoardMutation, UpdateBoardMutationVariables } from "@/commons/gql/graphql"

const useBoardWrite = () => {
    const router = useRouter()
    const param = useParams()
    const { writer, setWriter, title, setTitle, password, setPassword, contents, setContents } = useIsEdit()
    
    const [createBoardAPI] = useMutation<
        CreateBoardMutation,
        CreateBoardMutationVariables
    >(CreateBoardDocument)

    const [updateBaordAPI] = useMutation<
        UpdateBoardMutation, UpdateBoardMutationVariables
    >(UpdateBoardDocument)

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

    const creatingBoard = async () => {
        try {
            // createBoard 게시글 등록
            const result = await createBoardAPI({
                variables: {
                    createBoardInput: {
                        writer: writer,
                        password: String(password),
                        title: title,
                        contents: contents
                    }
                }
            })
            router.push(`/boards/${result.data?.createBoard._id}`)
        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }

    const updatingBoard = async (data: IUpdateBoardInput) => {
        try {
            const result = await updateBaordAPI({
                variables: {
                    updateBoardInput: data.updateBoardInput,
                    password: data.password,
                    boardId: String(data.boardId)
                }
            })
            console.log('업데이트 결과: ',result.data?.updateBoard._id)
            router.push(`/boards/${result.data?.updateBoard._id}`)
        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }

    const boardUpdateSetting = (data: IOnUpdateHandler) => {
        const inputBoardPw = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요")

        // 업데이트 시도할 인풋 데이터들
        const updateBoardInput: IUpdateBoardInput = {
            updateBoardInput: data,
            password: inputBoardPw,
            boardId: param.boardId,
        }

        console.log('업데이트된 객체 확인: ', updateBoardInput)
        return updateBoardInput
    }

    return {
        onChangePosting,
        boardUpdateSetting,
        creatingBoard,
        updatingBoard
    }
}

export default useBoardWrite