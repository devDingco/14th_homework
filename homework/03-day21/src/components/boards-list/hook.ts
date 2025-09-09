"use client"

import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { DELETE_BOARD, FETCH_BOARDS, FETCH_BOARDS_COUNT } from './queries';
import { FetchBoardsCountDocument } from '@/commons/graphql/graphql';

export default function useBoardsPage () {

    const { data } = useQuery(FETCH_BOARDS, {
        variables: {
            page: 1,
        },
    })

    const { data: boardsCountData } = useQuery(FetchBoardsCountDocument);
    const boardsCount = boardsCountData?.fetchBoardsCount ?? 0; // ✅ 총 게시글 수

    const router = useRouter()
    const onClickBoard = async (boardId: string) => {
        await router.push(`/boards/${boardId}`)
    } 

    
    const [deleteBoard] = useMutation(DELETE_BOARD)

    const onClickDelete =  async (event: React.MouseEvent<HTMLDivElement>, boardId: string) => {        
        event.stopPropagation(); 

        try{
            const result = await deleteBoard({
                variables: {
                    boardId: boardId
                },
                refetchQueries: [
                    {
                        query: FETCH_BOARDS,
                        variables: {page: 1}
                    }
                ]
            })
            alert("게시글이 삭제되었습니다.")
        } catch (error) {
            alert("에러가 발생하였습니다. 다시 시도해 주세요.")
        }
        
    } 
    
 
    
    
    return {
        data,
        onClickBoard,
        onClickDelete,
        boardsCount,
    
    }
        
}