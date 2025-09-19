"use client";

import React from "react";
import MyBoardWrite from "@/components/myapis-write";

export default function MyBoardsNew({ params }: { params: { boardId: string } }) {  
  return (
    <MyBoardWrite isEdit={true} />
  )
}
