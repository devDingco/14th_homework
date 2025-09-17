'use client';

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

// 공지사항 조회
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
