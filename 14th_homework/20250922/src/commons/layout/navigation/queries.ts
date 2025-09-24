import { graphql } from "@/commons/graphql";

export const FETCH_USER_LOGGED_IN = graphql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
      userPoint {
        amount
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
