"use client"

import { gql, useMutation, useQuery } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import { ChangeEvent, MouseEventHandler, useState } from "react"
import { IFunctionUpdateBoard, IPostUpdateData, IUpdateBoardInput } from "./type"
import { CREATE_BOARD, UPDATE_BOARD } from "./queries"
import { useIsEdit } from "@/commons/isEditProvider"

const useBoardWrite = () => {
    const router = useRouter()
    const param = useParams()
    
    const {isEdit, writer, setWriter, title, setTitle, password, setPassword, contents, setContents } = useIsEdit()
    // const [writer, setWriter] = useState<string | undefined>("")
    // const [password, setPassword] = useState<string | number>("")
    // const [title, setTitle] = useState<string | undefined>("")
    // const [contents, setContents] = useState<string | undefined>("")
    
    const [writerErr, setWriterErr] = useState<string>("")
    const [passwordErr, setPasswordErr] = useState<string>("")
    const [titleErr, setTitleErr] = useState<string>("")
    const [contentErr, setContentsErr] = useState<string>("")

    const [createBoard] = useMutation(CREATE_BOARD)
    const [updateBoard] = useMutation(UPDATE_BOARD)

    const onChangePosting = (category: string) => (event: ChangeEvent<HTMLInputElement>) => {
        switch (category) {
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

    const onClickResist = async () => {
        const forValArr = [writer, password, title, contents]
        
        if (forValArr.includes("")) {
            for (let i=0; i < forValArr.length; i++) {
                switch(i) {
                    case 0: {
                        if (forValArr[i] === "") {
                            setWriterErr("필수입력 사항 입니다.")
                        } else {
                            setWriterErr("")
                        }
                        // forValArr[i] === "" ? setWriterErr("필수입력 사항 입니다.") : setWriterErr("")
                        break
                    }
                    case 1: {
                        if (forValArr[i] === "") {
                            setPasswordErr("필수입력 사항 입니다.")
                        } else {
                            setPasswordErr("")
                        }
                        // forValArr[i] === "" ? setPasswordErr("필수입력 사항 입니다.") : setPasswordErr("")
                        break
                    }
                    case 2: {
                        if (forValArr[i] === "") {
                            setTitleErr("필수입력 사항 입니다.")
                        } else {
                            setTitleErr("")
                        }
                        // forValArr[i] === "" ? setTitleErr("필수입력 사항 입니다.") : setTitleErr("")
                        break
                    }
                    case 3: {
                        if (forValArr[i] === "") {
                            setContentsErr("필수입력 사항 입니다.")
                        } else {
                            setContentsErr("")
                        }
                        // forValArr[i] === "" ? setContentsErr("필수입력 사항 입니다.") : setContentsErr("")
                        break
                    }
                    default:
                }
            }
        } else {
            setWriterErr("")
            setPasswordErr("")
            setTitleErr("")
            setContentsErr("")
            
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
                console.log(result.data.createBoard._id)
                router.push(`/boards/${result.data.createBoard._id}`)
            } catch(e) {
                alert(`에러가 발생하였습니다. 다시 시도해 주세요. ${e}`)
            }
        }
    }

    const boardUpdateSetting = (data: IFunctionUpdateBoard | undefined) => {
        const inputBoardPw = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요")
        console.log(data)

        const updateBoardInput: IUpdateBoardInput = {
            password: inputBoardPw,
            boardId: param.boardId
        }

        if((title !== data?.title) && title) {
            updateBoardInput.title = title
        } else {
            console.log('title 이 조건으로는 업데이트 안함')
        }
        if((contents !== data?.contents) && contents) {
            updateBoardInput.contents = contents
        } else {
            console.log('contents 이 조건으로는 업데이트 안함')
        }

        console.log(updateBoardInput)
        return updateBoardInput
    }

    const onUpdateHandler = async (data: IFunctionUpdateBoard | undefined) => {
    
        const updateBoardInput = boardUpdateSetting(data)
        const forValArr = [writer, password, title, contents]

        if (forValArr.includes("")) {
            for (let i=0; i < forValArr.length; i++) {
                switch(i) {
                    case 2: {
                        if (forValArr[i] === "") {
                            setTitleErr("필수입력 사항 입니다.")
                        } else {
                            setTitleErr("")
                        }
                        // forValArr[i] === "" ? setTitleErr("필수입력 사항 입니다.") : setTitleErr("")
                        break
                    }
                    case 3: {
                        if (forValArr[i] === "") {
                            setContentsErr("필수입력 사항 입니다.")
                        } else {
                            setContentsErr("")
                        }
                        // forValArr[i] === "" ? setContentsErr("필수입력 사항 입니다.") : setContentsErr("")
                        break
                    }
                    default:
                }
            }
            return
        } else {
            setTitleErr("")
            setContentsErr("")
            
            try {
                const result = await updateBoard({
                    variables: {
                        updateBoardInput
                    }
                })
                console.log(result.data.createBoard._id)
                router.push(`/boards/${result.data.createBoard._id}`)
            } catch(e: any) {
                alert(`${e.graphQLErrors} 비밀번호가 틀렸습니다.`)
            }
        }
    }

    return {
        onChangePosting,
        onClickResist,
        onUpdateHandler,
        writerErr,
        passwordErr,
        titleErr,
        contentErr,
        param
    }
}

export default useBoardWrite