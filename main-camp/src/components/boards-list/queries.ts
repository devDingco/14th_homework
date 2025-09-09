import { gql } from "@apollo/client"

export const FETCH_BOARDS = gql`
    query fetchBoards($page: Int!) {
        fetchBoards(page: $page) {
                _id
                title
                writer
                contents
                createdAt
        }
    }
`

export const DELETE_BOARD = gql`
    mutation deleteBoard($boardId: ID!) {
        deleteBoard(boardId: $boardId)
    }
`

// 게시글 전체 번호 조회
// const FETCH_BOARDS_COUNT = gql`
//     query {
//         fetchBoardsCount(startDate: "2019-12-03T09:54:33Z", endDate: "2025-12-03T09:54:33Z")
//     }
// `
