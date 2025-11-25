import { GraphQLClient } from 'graphql-request';

const GRAPHQL_ENDPOINT = 'https://main-practice.codebootcamp.co.kr/graphql';

/**
 * Refresh Token을 사용하여 새로운 Access Token을 발급받는 GraphQL Mutation
 * restoreAccessToken은 쿠키에 저장된 refreshToken을 자동으로 사용합니다.
 */
const RESTORE_ACCESS_TOKEN_MUTATION = `
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

/**
 * GraphQLClient 인스턴스 생성 (쿠키 사용)
 * restoreAccessToken은 쿠키에 저장된 refreshToken을 자동으로 읽어서 사용하므로
 * Authorization 헤더 없이 호출합니다.
 */
const createRefreshClient = (): GraphQLClient => {
  return new GraphQLClient(GRAPHQL_ENDPOINT, {
    credentials: 'include', // 쿠키 포함
    // Authorization 헤더를 제거하여 쿠키의 refreshToken을 사용
  });
};

/**
 * 쿠키에 저장된 refreshToken을 사용하여 새로운 Access Token을 갱신하는 함수
 * restoreAccessToken mutation은 쿠키에 저장된 refreshToken을 자동으로 읽어서 사용합니다.
 * @returns 새로운 Access Token 또는 null (갱신 실패 시)
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const client = createRefreshClient();
    const data = await client.request<{ restoreAccessToken: { accessToken: string } }>(
      RESTORE_ACCESS_TOKEN_MUTATION
    );

    return data?.restoreAccessToken?.accessToken || null;
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
};
