"use client"

import React from 'react';
import BoardsPage from '@/components/boards-list/list';
import BoardsBanner from '@/components/boards-list/banner';

export default function BoardsListPage () {   

    return (
        <>
            <BoardsBanner/>
            <BoardsPage />
        </>
    )
}