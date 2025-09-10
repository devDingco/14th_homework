import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query FetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      userPoint {
        amount
      }
      picture
    }
  }
`;


