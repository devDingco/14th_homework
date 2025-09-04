import { gql } from '@apollo/client';

export const FETCH_BOARDS_OF_THE_BEST_QUERY = gql`
  query fetchBoardsOfTheBest {
    fetchBoardsOfTheBest {
      _id
      title 
      contents
      images
      likeCount
      dislikeCount
      writer
      user {
        _id
        name
        
      }
      createdAt
      updatedAt
    }
  }
`;