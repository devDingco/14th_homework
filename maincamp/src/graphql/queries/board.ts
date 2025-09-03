import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId){
        writer
        title
        contents
        youtubeUrl
        images
        createdAt
        likeCount
        dislikeCount
        user {
        picture
        deletedAt
        }
    }
}
`