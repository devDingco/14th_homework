"use client"

import { ChangeEvent, useState } from "react"
import { ICommentErr, IOnChangeWriting, IUseBoardsCommentWrite } from "./type"
import { CreateBoardCommentInput } from "@/commons/gql/graphql"
import { useParams } from "next/navigation"
import useCreateBoardComment from "@/commons/api/useCreateBoardComment"

const useBoardsCommentWrite = (props: IUseBoardsCommentWrite) => {
    const param = useParams()
    const [isActive, setIsActive] = useState<boolean>(false)
    const { postCreateBoardComment } = useCreateBoardComment()

    const chooseStar = (rating: number) => {
        props.setCommentInput((prev: CreateBoardCommentInput) => ({
            ...prev,
            rating: rating
        }))
    }

    const onClickCommentWrite = async () => {
        const forValArr = [props.commentInput.writer, props.commentInput.password, props.commentInput.contents]
        
        if (forValArr.includes("")) {
            for (let i=0; i < forValArr.length; i++) {
                switch(i) {
                    case 0: {
                        forValArr[i] === "" 
                        ?  
                        props.setCommentErr((prev: ICommentErr) => ({
                            ...prev,
                            commentWriterErr: "필수입력 사항 입니다."
                        })) 
                        :
                        props.setCommentErr((prev: ICommentErr) => ({
                            ...prev,
                            commentWriterErr: ""
                        }))
                        break
                    }
                    case 1: {
                        forValArr[i] === "" 
                        ?
                        props.setCommentErr((prev: ICommentErr) => ({
                            ...prev,
                            commentPasswordErr: "필수입력 사항 입니다."
                        }))
                        :
                        props.setCommentErr((prev: ICommentErr) => ({
                            ...prev,
                            commentPasswordErr: ""
                        }))
                        break
                    }
                    case 2: {
                        forValArr[i] === "" 
                        ?
                        props.setCommentErr((prev: ICommentErr) => ({
                            ...prev,
                            commentContentsErr: "필수입력 사항 입니다."
                        }))
                        :
                        props.setCommentErr((prev: ICommentErr) => ({
                            ...prev,
                            commentContentsErr: ""
                        }))
                        break
                    }
                }
            }
        } else {
            props.setCommentErr({
                commentWriterErr: "",
                commentPasswordErr: "",
                commentContentsErr: ""
            })
            postCreateBoardComment({ boardId: param.boardId, commentInput: props.commentInput })
            props.setCommentInput({
                writer: "",
                contents: "",
                password: "",
                rating: 1,
            })
        }
    }

    const onChangeWriting = ({category}: IOnChangeWriting) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (category) {
            case "작성자": {
                props.setCommentInput((prev: CreateBoardCommentInput) => ({
                    ...prev,
                    writer: event.target.value
                }))
                break
            }
            case "비밀번호": {
                props.setCommentInput((prev: CreateBoardCommentInput) => ({
                    ...prev,
                    password: event.target.value
                }))
                break
            }
            case "내용": {
                props.setCommentInput((prev: CreateBoardCommentInput) => ({
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
        onClickCommentWrite,
        chooseStar,
        activeButton, isActive
    }
}

export default useBoardsCommentWrite