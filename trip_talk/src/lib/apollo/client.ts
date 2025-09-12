import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { createUploadLink } from 'apollo-upload-client';

// HTTP 링크 생성 (파일 업로드 지원)
const httpLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://main-practice.codebootcamp.co.kr/graphql',
  credentials: 'include', // 쿠키 포함
});

// 인증 링크 (토큰 자동 추가)
const authLink = setContext((_, { headers }) => {
  // 클라이언트 사이드에서만 토큰 가져오기
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  };
});

// 에러 핸들링 링크
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);

      // 인증 에러 처리 (토큰 만료 등)
      if (extensions?.code === 'UNAUTHENTICATED') {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          sessionStorage.removeItem('accessToken');
          window.location.href = '/signin';
        }
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);

    // 네트워크 에러 시 재시도
    if (networkError.name === 'NetworkError') {
      return forward(operation);
    }
  }
});

// 재시도 링크
const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 3000,
    jitter: true,
  },
  attempts: {
    max: 3,
    retryIf: (error, _operation) => {
      // 네트워크 에러나 서버 에러 시에만 재시도
      return !!error && error.networkError;
    },
  },
});

// 캐시 설정
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        fetchBoards: {
          // 페이지네이션 캐시 정책
          keyArgs: ['page', 'searchStartAt', 'searchEndAt', 'searchKeyword'],
          merge(existing = [], incoming) {
            return incoming;
          },
        },
        fetchBookings: {
          keyArgs: ['page', 'searchStartAt', 'searchEndAt', 'searchKeyword'],
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
    Board: {
      keyFields: ['_id'],
    },
    Booking: {
      keyFields: ['_id'],
    },
    User: {
      keyFields: ['_id'],
    },
  },
});

// Apollo Client 인스턴스 생성
export const client = new ApolloClient({
  link: from([errorLink, retryLink, authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  connectToDevTools: process.env.NODE_ENV === 'development',
});
