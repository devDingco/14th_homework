// 레이아웃 관련 GraphQL 쿼리
// 전역적으로 필요한 데이터나 설정값들을 가져오는 쿼리들

import { gql } from '@apollo/client';

// 사이트 설정 정보 조회
export const FETCH_SITE_CONFIG = gql`
  query FetchSiteConfig {
    fetchSiteConfig {
      _id
      siteName
      logoUrl
      footerText
      enableBanner
    }
  }
`;

// 공지사항 조회 (상단 배너용)
export const FETCH_NOTICES = gql`
  query FetchNotices {
    fetchNotices {
      _id
      title
      content
      isActive
      createdAt
    }
  }
`;
