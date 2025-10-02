"use client";

import React from 'react';
import BoardsDetail from '@/components/boards-detail/detail';
import BoardCommentWrite from '@/components/boards-detail/comment-write';
import BoardCommentList from '@/components/boards-detail/comment-list';
import { useParams } from 'next/navigation';


export default function BoardsDetailPage (){ 
    const params = useParams()
    const boardId = String(params.boardId)

    return(
        <>
            <BoardsDetail />
            <BoardCommentWrite/>
            <BoardCommentList boardId={boardId} />
        </>
    )
}
