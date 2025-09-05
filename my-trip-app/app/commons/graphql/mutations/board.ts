import { gql } from '@apollo/client';

export const CREATE_BOARD_MUTATION = gql`
  mutation CreateBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      title
      contents
      writer
      boardAddress {
        zipcode
        address
        addressDetail
      }
      images
      youtubeUrl
      createdAt
      updatedAt
    }
  }
`;

export const UPLOAD_FILE_MUTATION = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      _id
      url
    }
  }
`;

export const LIKE_BOARD_MUTATION = gql`
  mutation LikeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export const DISLIKE_BOARD_MUTATION = gql`
  mutation DislikeBoard($boardId: ID!) {
    dislikeBoard(boardId: $boardId)
  }
`;


