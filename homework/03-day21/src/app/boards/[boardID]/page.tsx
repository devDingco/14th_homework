"use client";

import React from 'react';
import BoardsDetail from '@/components/boards-detail/detail';
import BoardCommentWrite from '@/components/boards-detail/comment-write';
import BoardCommentList from '@/components/boards-detail/comment-list';


export default function BoardsDetailPage (){ 


    return(
        <>
            <BoardsDetail />
            <BoardCommentWrite/>
            <BoardCommentList />
        </>
    )
}
