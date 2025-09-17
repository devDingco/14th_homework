"use client"

import { CreateBoardCommentDocument, FetchBoardCommentsDocument, UpdateBoardCommentDocument } from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useParams } from "next/navigation"
import { ChangeEvent, useState } from "react";
import { IComment } from "../comment-list/types";
import { GraphQLError } from "graphql";

export default function useCommentWrite({el, onClickEdit}:{el?:IComment, onClickEdit?: () => void}){
    
    // 세팅 - params
    const params = useParams();

    // 댓글 등록 유효성 검사
    const [writer, setWriter] = useState(el?.writer ?? "")
    const [password, setPassword] = useState("")
    const [contents, setContents] = useState(el?.contents ?? "")
    const [isValid, setIsValid] = useState(true)
    const [rating, setRating] = useState(3)

    // 게시글 댓글 생성 API
    const [createBoardComment] = useMutation(CreateBoardCommentDocument)

    // 게시글 댓글 수정 API
    const [updateBoardComment] = useMutation(UpdateBoardCommentDocument)

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
                        variables: { page: 1 ,boardId: params.boardId}
                    },
                ]
            })
            setWriter("")
            setPassword("")
            setContents("")
            setIsValid(true)
        } catch (error) {
            const showErrorModal = () => Modal.error({
                title: '댓글 등록에 실패하였습니다.',
                content: error as string ?? "에러가 발생하였습니다",
              });
              showErrorModal()
        }
    }

    // 댓글 수정하기 버튼 클릭
    const onClickCommentEdit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try{
            const result = await updateBoardComment({
                variables:{
                    updateBoardCommentInput:{
                        contents,
                        rating
                    },
                    password,
                    boardCommentId: el?._id as string
                }
            })
            onClickEdit?.()
        } catch (errors){
            const err = errors as GraphQLError
            const showErrorModal = () => Modal.error({
                title: '댓글 수정에 실패하였습니다.',
                content: err.message ?? "에러가 발생하였습니다",
              });
              showErrorModal()
        }
    }

    return{writer, password, contents, isValid, rating, onChangeWriter, onChangePassword, onChangeContents, onClickCommentSubmit, onClickCommentEdit, onClickRate}
}