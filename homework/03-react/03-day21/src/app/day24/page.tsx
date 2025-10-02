"use client"

import React from 'react';
import styles from "./styles.module.css";
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';


const FETCH_BOARDS = gql`  
    query fetchBoards($page: Int, $search: String){
        fetchBoards(page: $page, search: $search) {
            _id
            writer
            title
            contents
            youtubeUrl
            likeCount
            dislikeCount
            images
            user {
                _id
                email
                name
                picture
            }
            createdAt
            updatedAt
            deletedAt
        }    
    }
`

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`

const DELETE_BOARD = gql`
    mutation deleteBoard($boardId: ID!) {
        deleteBoard(boardId: $boardId)
    }
`

export default function BoardsPage () {

    const { data } = useQuery(FETCH_BOARDS, {
        variables: {
            page: 1,
        },
    })

    const { data: boardsCountData } = useQuery(FETCH_BOARDS_COUNT);
    const boardsCount = boardsCountData?.fetchBoardsCount ?? 0; // ✅ 총 게시글 수

    const router = useRouter()
    const onClickBoard = async (boardId: string) => {
        await router.push(`/boards/${boardId}`)
    } 
    
    const [deleteBoard] = useMutation(DELETE_BOARD)

    const onClickDelete =  async (boardId: string) => {        
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

    interface IFetchBoard {
        _id: string
        writer: string
        title: string
        createdAt: string
    }

    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className={styles.boardsContainer}>
                    <div className={styles.boardsList}>
                        <div className={styles.boardsListHeader}>
                            <p>번호</p>
                            <p>제목</p>
                            <p>작성자</p>
                            <p>날짜</p>
                        </div>
                        <div className={styles.boardsListBody}>
                            {/* 게시글 목록 자리 */}
                            {data?.fetchBoards.map((el:IFetchBoard, index: number) => {
                                return(
                                    <div 
                                        key={el._id} 
                                        className={styles.boardsListRow} 
                                        onClick={() => onClickBoard(el._id)}
                                    >
                                        <p>{boardsCount - index}</p> {/* 게시글 번호 */}
                                        <p>{el.title}</p>
                                        <p>{el.writer}</p>
                                        <p>{new Date(el.createdAt).toLocaleDateString("ko-KR")}</p>

                                        <div
                                            className={styles.deleteButton} 
                                            onClick={(event) => {
                                            event?.stopPropagation()
                                            onClickDelete(el._id)
                                            }}
                                        >
                                            <img className={styles.iconImage} src="/images/delete.png" alt="삭제아이콘"/>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}