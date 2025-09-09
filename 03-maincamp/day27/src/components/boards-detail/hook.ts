"use client"

import {useRouter, useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { FETCH_BOARD } from './queries';





export default function useBoardsDetail() {
  // const [checkBoardPassword] = useMutation(CHECK_BOARD_PASSWORD);
  const params = useParams()
  console.log(useParams())
  console.log(params)
  const { data } = useQuery(FETCH_BOARD,{
    variables:{
     boardId: String(params.boardId)
    }
  })
  console.log(data)
  const router = useRouter()
  
const onClickMove = () => {
  router.push(`/boards/${params.boardId}/edit`);
  }
const onclickMoveList = () => {
  router.push(`/boards`);
  }

    
  return{
    onclickMoveList,
    onClickMove,
    data
  }
}