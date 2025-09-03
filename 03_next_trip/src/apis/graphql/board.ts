import { gql } from '@apollo/client';

// export const CREATE_BOARD = gql`
//   mutation CreateBoard($writer: String, $title: String, $contents: String) {
//     createBoard(writer: $writer, title: $title, contents: $contents) {
//       number
//       message
//     }
//   }
// `;

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
