import { gql } from "@apollo/client";

// 1. GraphQL 쿼리 정의
export const FETCH_USER_LOGGED_IN = gql`
    query fetchUserLoggedIn {
        fetchUserLoggedIn {
            _id
            email
            name
        }
    }
`