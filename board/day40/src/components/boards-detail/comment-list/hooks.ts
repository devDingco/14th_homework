"use client"

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation"
import { Fetch_Board_Comments } from "./queries";




export default function useCommentListPage() {

    const param = useParams();
    const { data, fetchMore } = useQuery(Fetch_Board_Comments, {
        variables: {
            page: 1,
            boardId: param.id
        }
    })


    return (
       {data,
        fetchMore
       } 
    )





}