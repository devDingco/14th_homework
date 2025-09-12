"use client"
import { useMutation } from "@apollo/client"
import { useParams } from "next/navigation"
import { ChangeEvent, useState } from "react";
import { Fetch_Board_Comments } from "../comment-list/queries";
import { Create_Board_Comment } from "./queries";




export default function useCommentWritePage() {

    const Id = useParams();
    const [createBoardComment] = useMutation(Create_Board_Comment)
    console.log(Id)

    const [writer, setWriter] = useState("")
    const [password, setPassword] = useState("")
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(3)

    const onChangeWriter = (event: ChangeEvent<HTMLInputElement> ) => {
        setWriter(event.target.value)
     
    }

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)

    }

    const onChangeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value)

    }

    const onclickRating = (event) => {
        console.log(event)
        setRating(event)
    }

    const onClickSubmit = async() => {
        try{
        await createBoardComment({
            variables: {
                boardId: String(Id.id) ,
                createBoardCommentInput: {
                    writer: writer,
                    password: password,
                    contents: comment,
                    rating: rating
                }
            },
            refetchQueries: [
                {query: Fetch_Board_Comments, 
                    variables: {
                        boardId: String(Id.id)
                    }
                }
            ]
        })
        alert("댓글등록 완료")

        }catch(error){
            console.log(error)
            alert("댓글등록중 에러 발생")
        }
    }

    return {
        onChangeWriter,
        onChangePassword,
        onChangeComment,
        onClickSubmit,
        onclickRating
    }
}