"use client";

// import styles from './styles.module.css'
// import {ChangeEvent, useState } from 'react';
// import { gql, useMutation } from "@apollo/client";
// import { useRouter } from 'next/navigation';
import BoardsWrite from '@/components/boards-write';

// const CREATE_BOARD = gql`
//   mutation createBoard (
//     $createBoardInput: CreateBoardInput!
//   ) {
//   createBoard (
//     createBoardInput: $createBoardInput
//   ) {
//     writer
//     _id
//   }
// }
// `;

export default function BoardsNew() {
  // const router = useRouter();
  // const [createBoard] = useMutation(CREATE_BOARD);
  
  // const onClickSubmit = async () => {
  //   try {
  //     const result = await createBoard({
  //     variables: {
  //       createBoardInput: {
  //         writer: writer,
  //         title: title,
  //         contents: contents,
  //         password: password
  //       },
  //     },
  //   });
  //     router.push(`/boards/detail/${result.data.createBoard._id}`)
  //   } catch (error) {
  //     alert("에러발생") 
  //   }
    
  // };

  return (
     <BoardsWrite isEdit={false} />
  )
}



