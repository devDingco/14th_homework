import { gql } from "@apollo/client";


export const CREATE_BOARD = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!){
    createBoard(createBoardInput: $createBoardInput) {
        _id
        writer
        title
        contents
    }
    }
`

export const DELETE_BOARD = gql`
    mutation deleteBoard($boardId:ID!){
        deleteBoard(boardId:$boardId)
    }
`