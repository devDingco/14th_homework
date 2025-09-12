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
        variables: { boardId }, // ← 꼭 추가

    // query fetchBoardComments($boardId: ID!) {
    //     fetchBoardComments(boardId: $boardId) {
    //         _id
    //         writer
    //         contents
    //         rating
    //     }
    // } >> 쿼리에 FETCH_BOARD_COMMENTS 정의가 이렇게 되어있어서
    // 수정 전  refetchQueries에는 변수(variables)를 전달하지 않음 
    // → 서버에서 어떤 boardId 댓글을 가져올지 모름 → refetch 실패

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
