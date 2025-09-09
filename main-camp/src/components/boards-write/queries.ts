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
    mutation updateBoard($updateBoardInput: UpdateBoardInput!) {
        updateBoard(updateBoardInput: $updateBoardInput) {
            _id
        }
    }
`