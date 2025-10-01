"use client"

import { ChangeEvent, useRef } from "react"
import { IBoardErr, IOnChangePosting, IUseBoardWrite } from "./type"
import { useIsEdit } from "@/commons/provider/isEditProvider"
import { IPostData } from "@/commons/provider/type"
import { useIsModal } from "@/commons/provider/isModalProvider"
import useCreateBoard from "@/commons/api/mutation/useCreateBoard"
import useUpdateBoard from "@/commons/api/mutation/useUpdateBoard"
import { useParams } from "next/navigation"
import { checkValidationFile } from "@/commons/libraries/checkValidationFile"
import useUploadFile from "@/commons/api/mutation/useUploadFile"

const useBoardWrite = (props: IUseBoardWrite) => {
    const param = useParams()
    const fileRef = useRef<(HTMLInputElement | null)[]>([]);
    
    const { postData, setPostData, updatingBoardData } = useIsEdit()
    const { setIsWarningModal } = useIsModal()
    
    const { postCreateBoard } = useCreateBoard()
    const { postUpdateBoard } = useUpdateBoard()
    const { postUploadFile } = useUploadFile()

    const onClickImageDelete = (deleteIndex: number) => {
        setPostData((prev: IPostData) => ({
            ...prev,
            images: postData.images?.filter((_, i) => i !== deleteIndex)
            // images: [...(prev.images ?? []), result.data?.uploadFile.url]
        }))
    }

    const onClickImage = (index: number) => {
        // console.log(fileRef.current)
        console.log(fileRef.current)
        fileRef.current[index]?.click()
    }

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
            case "사진첨부": {
                const file = event.target.files?.[0]
                console.log("온체인지까지감?",file)

                const isValid = checkValidationFile(file)
                if (!isValid) return;

                postUploadFile(file)
                // setPostData((prev: IPostData) => ({
                //     ...prev,
                //     images: imageUrlArr
                // }))
                break
            }
            default:
        }
    }

    const onClickResist = async () => {
        const forValArr = [
            { value: postData.writer, setError: props.setBoardErr },
            { value: postData.password, setError: props.setBoardErr },
            { value: postData.title, setError: props.setBoardErr },
            { value: postData.contents, setError: props.setBoardErr },
          ];
        const forAddressValArr = [postData.boardAddress?.zipcode, postData.boardAddress?.address]

        let hasError = false;
            forValArr.forEach(({ value, setError }, i) => {
            if (value === "") {
                switch (i) {
                    case 0: {
                        setError((prev: IBoardErr) => ({
                            ...prev,
                            boardWriterErr: "필수입력 사항 입니다."
                        }));
                        hasError = true;
                        break
                    }
                    case 1: {
                        setError((prev: IBoardErr) => ({
                            ...prev,
                            boardPasswordErr: "필수입력 사항 입니다."
                        }));
                        hasError = true;
                        break
                    }
                    case 2: {
                        setError((prev: IBoardErr) => ({
                            ...prev,
                            boardTitleErr: "필수입력 사항 입니다."
                        }));
                        hasError = true;
                        break
                    }
                    case 3: {
                        setError((prev: IBoardErr) => ({
                            ...prev,
                            boardContentsErr: "필수입력 사항 입니다."
                        }));
                        hasError = true;
                        break
                    }
                }
            } else {
                setError({
                    boardWriterErr: "",
                    boardTitleErr: "",
                    boardPasswordErr: "",
                    boardContentsErr: ""
                });
            }
        });

        if (hasError) return;

        if ((forAddressValArr.filter((v) => v === "").length !== forAddressValArr.length) && (forAddressValArr.filter((v) => v === "").length !== 0)) {
            alert('주소를 끝까지 입력해 주세요')
            return
        }
        
        postCreateBoard(String(param.boardId))
    }

    const onUpdateHandler = async () => {
        
        const forValArr = [
            { value: postData.title, setError: props.setBoardErr },
            { value: postData.contents, setError: props.setBoardErr },
        ];
        
        let hasError = false;
            forValArr.forEach(({ value, setError }, i) => {
            if (value === "") {
                switch (i) {
                    case 0: {
                        setError((prev: IBoardErr) => ({
                            ...prev,
                            boardTitleErr: "필수입력 사항 입니다."
                        }))
                        hasError = true;
                        break
                    }
                    case 1: {
                        setError((prev: IBoardErr) => ({
                            ...prev,
                            boardContentsErr: "필수입력 사항 입니다."
                        }))
                        hasError = true;
                        break
                    }
                }
            } else {
                setError((prev: IBoardErr) => ({
                    ...prev,
                    boardTitleErr: "",
                    boardContentsErr: ""
                }))
            }
        });

        if (hasError) return;

        if (updatingBoardData.contents === postData.contents) {
            // alert('내용이 같으면 수정이 불가능 합니다.')
            setIsWarningModal({ open: true, value: '내용이 같으면 수정이 불가능 합니다.'})
            return
        } else {
            props.setBoardErr((prev: IBoardErr) => ({
                ...prev,
                boardContentsErr: "",
                boardTitleErr: ""
            }))
        }

        postUpdateBoard(String(param.boardId))
    }

    return {
        onChangePosting,
        onClickResist,
        onUpdateHandler,
        onClickImage, fileRef,
        onClickImageDelete
    }
}

export default useBoardWrite