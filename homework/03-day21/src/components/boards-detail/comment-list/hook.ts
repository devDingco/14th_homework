"use client";

import { useQuery } from "@apollo/client";
import { useState } from "react";
import { FETCH_BOARD_COMMENTS } from "./queries";
import { IFetchBoardComments, IFetchBoardCommentsVariables } from "./types";
import { useParams } from "next/navigation";

export default function useBoardCommentList() {
    const params = useParams()
    const boardId = String(params.boardId)
    const { data } = useQuery<
        IFetchBoardComments,
        IFetchBoardCommentsVariables
    >(FETCH_BOARD_COMMENTS, {
        variables: { boardId },
    });

    const [rating, setRating] = useState(0)


    const StarActive = '/images/star-active.png'
    const StarDisabled = '/images/star-disabled.png'

    const onClickStar = (starRating: number) => {
        setRating(starRating)


    }

    return {
        data,
        rating,
        StarActive,
        StarDisabled,
        onClickStar,
    }
    
}
