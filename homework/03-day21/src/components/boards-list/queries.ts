import { gql } from "@apollo/client"

export const FETCH_BOARDS = gql`  
    query fetchBoards($page: Int){
        fetchBoards(page: $page) {
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

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`

export const DELETE_BOARD = gql`
    mutation deleteBoard($boardId: ID!) {
        deleteBoard(boardId: $boardId)
    }
`