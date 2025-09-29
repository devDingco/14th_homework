"use client";


import React from "react";
import BoardsWrite from "@/components/boards-write";
import { withAuth } from "@/commons/hocs/auth";


// HOC로 감싸기
function BoardsNew() {  
  return (
    <BoardsWrite isEdit={false} />
  )
}

// HOC를 export 시점에 적용
export default withAuth(BoardsNew)