import { gql } from "@apollo/client"

export const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!){
        uploadFile(file: $file){
            url
        }
    }

`

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
            boardAddress {
                zipcode
                address
                addressDetail
            }
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