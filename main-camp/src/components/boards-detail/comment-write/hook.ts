"use client"

import { ChangeEvent, useState } from "react"
import { IOnChangeWriting, IOnClickCommentUpdate } from "./type"
import { CreateBoardCommentInput } from "@/commons/gql/graphql"
import { useParams } from "next/navigation"
import useCreateBoardComment from "@/commons/api/mutation/useCreateBoardComment"
import { useIsBoardDetail } from "@/commons/provider/isBoardDetailProvider"
import { ICommentErr } from "@/commons/provider/type"
import useUpdateBoardComment from "@/commons/api/mutation/useUpdateBoardComment"

const useBoardsCommentWrite = () => {
    const param = useParams()
    const { isCommentEdit, setIsCommentEdit } = useIsBoardDetail()
    const { setCommentInput, commentInput, setCommentErr } = useIsBoardDetail()
    
    const [isActive, setIsActive] = useState<boolean>(false)

    const { postCreateBoardComment } = useCreateBoardComment()
    const { postUpdateBoardComment } = useUpdateBoardComment()

    const chooseStar = (rating: number) => {
        setCommentInput((prev: CreateBoardCommentInput) => ({
            ...prev,
            rating: rating
        }))
    }

    const defaultComment = () => {
        setCommentInput({
            writer: undefined,
            contents: undefined,
            password: "",
            rating: 1,
        })
        setCommentErr({
            commentWriterErr: "",
            commentPasswordErr: "",
            commentContentsErr: ""
        })
    }

    const validateComment = (forValArr: Array<string | undefined | null>) => {
        console.log(forValArr)
        let isTrue = false
        if (forValArr.length >= 4) {
            console.log('잘못 된 함수호출입니다')
            return
        } else {
            if (forValArr.includes("")) {
                for (let i=0; i < forValArr.length; i++) {
                    switch(i) {
                        case 0: {
                            if (!isCommentEdit.isUpdate) {
                                forValArr[i] === "" 
                                ?  
                                setCommentErr((prev: ICommentErr) => ({
                                    ...prev,
                                    commentWriterErr: "필수입력 사항 입니다."
                                })) 
                                :
                                setCommentErr((prev: ICommentErr) => ({
                                    ...prev,
                                    commentWriterErr: ""
                                }))
                            } else {
                                isTrue = true
                            }
                            break
                        }
                        case 1: {
                            if ((forValArr[i] !== "")) {
                                setCommentErr((prev: ICommentErr) => ({
                                    ...prev,
                                    commentPasswordErr: ""
                                }))
                            } else {
                                setCommentErr((prev: ICommentErr) => ({
                                    ...prev,
                                    commentPasswordErr: "필수입력 사항 입니다."
                                }))
                            }
                            break
                        }
                        case 2: {
                            forValArr[i] === ""
                            ?
                            setCommentErr((prev: ICommentErr) => ({
                                ...prev,
                                commentContentsErr: "필수입력 사항 입니다."
                            }))
                            :
                            setCommentErr((prev: ICommentErr) => ({
                                ...prev,
                                commentContentsErr: ""
                            }))
                            break
                        }
                    }
                }
            } else {
                isTrue = true
            }
        }
        return isTrue
    }

    const onClickCommentWrite = async () => {
        const forValArr = [commentInput.writer, commentInput.password, commentInput.contents]
        if (validateComment(forValArr)) {
            postCreateBoardComment({ boardId: param.boardId, commentInput: commentInput })
            defaultComment()
        }
    }

    const onClickCommentUpdate = (parameter: IOnClickCommentUpdate) => {
        const forValArr = [commentInput.writer, commentInput.password, commentInput.contents]
        if (validateComment(forValArr)) {
            console.log('댓글 업데이트 시도하도록: ', parameter.boardCommentId, commentInput.password, commentInput.contents, commentInput.rating)
            postUpdateBoardComment(String(param.boardId), parameter.boardCommentId)
            defaultComment()
            setIsCommentEdit({
                commentId: 0,
                isUpdate: false
            })
        } else {
            console.log('댓글 업뎃 왜안됨?')
        }
    }

    const onClickCancel = () => {
        if (!isCommentEdit.isUpdate) return
        defaultComment()
        setIsCommentEdit({
            commentId: 0,
            isUpdate: false
        })
    }

    const onChangeWriting = ({category}: IOnChangeWriting) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (category) {
            case "작성자": {
                setCommentInput((prev: CreateBoardCommentInput) => ({
                    ...prev,
                    writer: event.target.value
                }))
                break
            }
            case "비밀번호": {
                setCommentInput((prev: CreateBoardCommentInput) => ({
                    ...prev,
                    password: event.target.value
                }))
                break
            }
            case "내용": {
                setCommentInput((prev: CreateBoardCommentInput) => ({
                    ...prev,
                    contents: event.target.value
                }))
                break
            }
            default:
        }
    }

    const activeButton = (valObj: CreateBoardCommentInput) => {
        if (isActive) {
            if (valObj.writer === "" || valObj.password === "" || valObj.contents === "") {
                setIsActive(false)
            }
        } else {
            if (valObj.writer && valObj.password && valObj.contents) {
                setIsActive(true)
            }
        }
    }

    return {
        onChangeWriting,
        onClickCancel,
        onClickCommentWrite,
        onClickCommentUpdate,
        chooseStar,
        activeButton, isActive
    }
}

export default useBoardsCommentWrite