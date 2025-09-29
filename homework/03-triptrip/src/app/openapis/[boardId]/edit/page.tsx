"use client";

import React from "react";
import MyBoardWrite from "@/components/myapis-write";
import { withAuth } from "@/commons/hocs/auth";

function MyBoardsNew({ params }: { params: { boardId: string } }) {  
  return (
    <MyBoardWrite isEdit={true} />
  )
}

export default withAuth(MyBoardsNew)