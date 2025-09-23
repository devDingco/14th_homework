import { gql } from "@apollo/client";

export const mygraphql = gql`
mutation createBoard($createBoardInput: CreateBoardInput!){
    createBoard(createBoardInput: $createBoardInput){
        _id, title, contents, likeCount, dislikeCount
    }
}
`;

export const mygraphUpdateql = gql`
mutation updateBoard(
  $boardId: ID!,
  $password: String,
  $updateBoardInput: UpdateBoardInput!
){
  updateBoard(
    boardId: $boardId,
    password: $password,
    updateBoardInput: $updateBoardInput
  ) {
    _id
    title
    writer
    contents
    youtubeUrl
    images
    boardAddress {
      zipcode
      address
      addressDetail
    }
  }
}
`;

 export const UPLOAD_FILE=gql`
   mutation  uploadFile($file: Upload!){
        uploadFile(file:$file){
            url
        }
    }
`