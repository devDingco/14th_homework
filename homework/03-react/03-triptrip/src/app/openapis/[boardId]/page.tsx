"use client";

import React from 'react';
import MyBoardsDetail from '@/components/myapis-detail'; 
import { withAuth } from '@/commons/hocs/auth';

function MyBoardsDetailPage (){ 

    return(
        <>
            <MyBoardsDetail/>            
        </>
    )
}

export default withAuth(MyBoardsDetailPage)