"use client";

import { gql, useMutation } from "@apollo/client"
import React, { ChangeEvent, MouseEvent, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import BoardsWrite from "@/components/boards-write";

export default function BoardsNew() {  
  return (
    <BoardsWrite isEdit={false} />
  )
}
