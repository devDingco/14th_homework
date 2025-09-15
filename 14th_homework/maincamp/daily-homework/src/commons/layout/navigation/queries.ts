// 네비게이션 GraphQL 쿼리

import { gql } from '@apollo/client';

// 사용자 정보 조회
export const FETCH_USER_INFO = gql`
  query FetchUserInfo {
    fetchUser {
      _id
      email
      name
      picture
    }
  }
`;

// 메뉴 권한 체크
export const CHECK_USER_PERMISSIONS = gql`
  query CheckUserPermissions {
    fetchUser {
      _id
      userPoint {
        _id
        amount
      }
    }
  }
`;
