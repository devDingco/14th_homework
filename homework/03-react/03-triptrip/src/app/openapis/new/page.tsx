"use client";

import React from "react";
import MyBoardWrite from "@/components/myapis-write";
import { withAuth } from "@/commons/hocs/auth";

function MyBoardsNew() {  
  return (
    <MyBoardWrite isEdit={false} />
  )
}

export default withAuth(MyBoardsNew)