import { gql } from "@apollo/client"


export const FETCH_BOARD = gql `
    query fetchBoard($boardId: ID!){
        fetchBoard(boardId: $boardId) {
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

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!){
    createBoard(createBoardInput:$createBoardInput){
      _id
      writer
      title
      contents
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
      images
      likeCount
      createdAt
      updatedAt
      deletedAt
    }
  }

`
export const UPDATE_BOARD = gql`
  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $boardId: ID!, $password: String){
    updateBoard(updateBoardInput:$updateBoardInput, boardId: $boardId, password: $password){
      _id
      writer
      title
      contents
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
      images
      likeCount
      createdAt
      updatedAt
      deletedAt
    }
  }

`