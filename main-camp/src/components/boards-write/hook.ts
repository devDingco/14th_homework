"use client"

import { ApolloError, useMutation } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import { ChangeEvent } from "react"
import { IOnChangePosting, IOnUpdateHandler, IUpdateBoardInput } from "./type"
import { useIsEdit } from "@/commons/provider/isEditProvider"
import { CreateBoardDocument, CreateBoardInput, CreateBoardMutation, CreateBoardMutationVariables, UpdateBoardDocument, UpdateBoardInput, UpdateBoardMutation, UpdateBoardMutationVariables } from "@/commons/gql/graphql"
import { IPostData } from "@/commons/provider/type"

const useBoardWrite = () => {
    const router = useRouter()
    const param = useParams()
    const { 
        postData, setPostData
     } = useIsEdit()
    
    const [createBoardAPI] = useMutation<
        CreateBoardMutation,
        CreateBoardMutationVariables
    >(CreateBoardDocument)

    const [updateBoardAPI] = useMutation<
        UpdateBoardMutation, UpdateBoardMutationVariables
    >(UpdateBoardDocument)

    const onChangePosting = (props: IOnChangePosting) => (event: ChangeEvent<HTMLInputElement>) => {
        switch (props.category) {
            case "작성자": {
                setPostData((prev: IPostData) => ({
                    ...prev,
                    writer: event.target.value
                }))
                break
            }
            case "비밀번호": {
                setPostData((prev: IPostData) => ({
                    ...prev,
                    password: event.target.value
                }))
                break
            }
            case "제목": {
                setPostData((prev: IPostData) => ({
                    ...prev,
                    title: event.target.value
                }))
                break
            }
            case "내용": {
                setPostData((prev: IPostData) => ({
                    ...prev,
                    contents: event.target.value
                }))
                break
            }
            case "주소": {
                console.log('주소까지 옴?')
                if (event.target.id === "addressDetail") {
                    if (event.target.value === "" && postData.boardAddress) {
                        const { addressDetail, ...rest } = postData.boardAddress
                        console.log("검증시간?", rest)
                        setPostData((prev: IPostData) => ({
                            ...prev,
                            boardAddress: rest
                        }))
                    } else {
                        setPostData((prev: IPostData) => ({
                            ...prev,
                            boardAddress: {
                                ...postData.boardAddress, 
                                [event.target.id]: event.target.value
                            }
                        }))
                    }
                } else {
                    setPostData((prev: IPostData) => ({
                        ...prev,
                        boardAddress: {
                            ...postData.boardAddress, 
                            [event.target.id]: event.target.value
                        }
                    }))
                }
                break
            }
            case "유튜브링크": {
                setPostData((prev: IPostData) => ({
                    ...prev,
                    youtubeUrl: event.target.value
                }))
                break
            }
            default:
        }
    }

    const creatingBoard = async () => {
        const createBoardInput = boardCreateSetting()

        console.log('직전 확인! ',createBoardInput)
        
        try {
            // createBoard 게시글 등록
            const result = await createBoardAPI({
                variables: {
                    createBoardInput: {
                        ...createBoardInput
                    } as CreateBoardInput
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

    const boardCreateSetting = () => {
        console.log("createBoard 전에 데이터 정리! ", postData)
        if (Object.values(postData.boardAddress ?? {}).filter(v => v === "").length > 0) {
            const { boardAddress, ...updateData } = postData
            return Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== ""))
        } else {
            return Object.fromEntries(Object.entries(postData).filter(([_, v]) => v !== ""))
        }
    }

    const updatingBoard = async () => {
        const updateBoardInput = boardUpdateSetting()
        // console.log(updateBoardInput)
        // console.log({...updateBoardInput})
        try {
            const result = await updateBoardAPI({
                variables: {
                    ...updateBoardInput
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

    const boardUpdateSetting = () => {
        const inputBoardPw = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요")

        const { writer, ...forUpdateData } = postData
        // 업데이트 시도할 인풋 데이터들
        const updateBoardInput = {
            updateBoardInput: {...forUpdateData} as UpdateBoardInput,
            password: String(inputBoardPw),
            boardId: String(param.boardId),
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