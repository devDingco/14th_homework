import { gql } from "@apollo/client"

export const CREATE_BOARD = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!) {
        createBoard(createBoardInput: $createBoardInput) {
            _id
            writer
            title
        }
    }
`

export const UPDATE_BOARD = gql`
    mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {
        updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {
            _id
        }
    }
`

export const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!) {
        fetchBoard(boardId: $boardId) {
            _id
            writer
            title
            contents
            boardAddress {
                zipcode
                address
                addressDetail
            }
            youtubeUrl
            createdAt
            likeCount
            dislikeCount
            updatedAt
        }
    }
`

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

export const FETCH_BOARDS_COUNT = gql`
    query fetchBoardsCount($endDate: DateTime, $startDate: DateTime, $search: String) {
        fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)
    }
`

export const DELETE_BOARD = gql`
    mutation deleteBoard($boardId: ID!) {
        deleteBoard(boardId: $boardId)
    }
`

export const FETCH_COMMENT = gql`
    query fetchBoardComments($page: Int, $boardId: ID!) {
        fetchBoardComments(page: $page, boardId: $boardId) {
            _id
            writer
            contents
            createdAt
            rating
        }
    }
`

export const CREATE_COMMENT = gql`
    mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {
        createBoardComment (createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {
            _id
        }
    }
`

export const DELETE_COMMENT = gql`
    mutation deleteBoardComment($password: String, $boardCommentId: ID!) {
        deleteBoardComment (password: $password, boardCommentId:$boardCommentId)
    }
`

export const UPDATE_COMMENT = gql`
    mutation updateBoardComment($updateBoardCommentInput: UpdateBoardCommentInput!, $password: String, $boardCommentId: ID!) {
        updateBoardComment (updateBoardCommentInput: $updateBoardCommentInput, password: $password, boardCommentId: $boardCommentId) {
            writer
            deletedAt
        }
    }
`