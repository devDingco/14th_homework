"use client"

import { CreateBoardCommentDocument, FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useParams } from "next/navigation"
import { ChangeEvent, useState } from "react";

export default function useCommentWrite(){
    
    // 세팅 - params
    const params = useParams();

    // 댓글 등록 유효성 검사
    const [writer, setWriter] = useState("")
    const [password, setPassword] = useState("")
    const [contents, setContents] = useState("")
    const [isValid, setIsValid] = useState(true)
    const [rating, setRating] = useState(3)

    // 게시글 댓글 생성 API
    const [createBoardComment] = useMutation(CreateBoardCommentDocument)

    // ChangeEvent에 따른 유효성 검증
    const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setWriter(value)

        if(value && password && contents){
            setIsValid(false)
        } else {
            setIsValid(true)
        }
    }

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setPassword(value)

        if(writer && value && contents){
            setIsValid(false)
        } else {
            setIsValid(true)
        }
    }

    const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {

        const value = event.target.value
        setContents(value)

        if(writer && password && value){
            setIsValid(false)
        } else {
            setIsValid(true)
        }
    }

    // 별점 기능
    const onClickRate = (event: React.MouseEvent) => {
        const parent = event.currentTarget.closest('div');
        if(!parent) return;
        setRating(Number(parent.id))
    }

    // 댓글 등록하기 버튼 클릭
    const onClickCommentSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const result = await createBoardComment({
                variables:{
                    createBoardCommentInput:{
                        writer,
                        password,
                        contents,
                        rating,
                    },
                    boardId: params.boardId as string,
                },
                refetchQueries: [
                    {
                        query: FetchBoardCommentsDocument,
                        variables: { boardId: params.boardId}
                    },
                ]
            })
            setWriter("")
            setPassword("")
            setContents("")
            setIsValid(true)
        } catch (error) {
            const showErrorModal = () => Modal.error({
                title: '에러가 발생하였습니다.',
                content: error as string ?? "에러가 발생하였습니다",
              });
              showErrorModal()
        }
    }

    return{writer, password, contents, isValid, rating, onChangeWriter, onChangePassword, onChangeContents, onClickCommentSubmit, onClickRate}
}