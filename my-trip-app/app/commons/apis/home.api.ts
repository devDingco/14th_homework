"use client";

import { FETCH_BOARDS_OF_THE_BEST_QUERY } from "../graphql/queries/home";
import { apolloClient } from "../graphql/apollo-client";

export async function fetchBoardsOfTheBestApi() {
  try {
    console.log('🔍 API 호출 시작: fetchBoardsOfTheBest');
    console.log('🌐 GraphQL 엔드포인트:', 'https://main-practice.codebootcamp.co.kr/graphql');
    
    const { data, error: graphqlError } = await apolloClient.query({
      query: FETCH_BOARDS_OF_THE_BEST_QUERY,
      fetchPolicy: 'network-only', // 항상 서버에서 최신 데이터 가져오기
      errorPolicy: 'all', // 에러와 데이터 모두 반환
    });
    
    console.log('📊 GraphQL 응답 데이터:', data);
    console.log('❌ GraphQL 에러:', graphqlError);
    
    if (graphqlError) {
      console.error('🚨 GraphQL 에러 상세:', {
        message: graphqlError.message,
        networkError: graphqlError.networkError,
        graphQLErrors: graphqlError.graphQLErrors
      });
      
      // GraphQL 에러들의 상세 정보 출력
      if (graphqlError.graphQLErrors && graphqlError.graphQLErrors.length > 0) {
        graphqlError.graphQLErrors.forEach((error, index) => {
          console.error(`🚨 GraphQL Error ${index + 1}:`, {
            message: error.message,
            locations: error.locations,
            path: error.path,
            extensions: error.extensions
          });
        });
      }
    }
    
    const boards = data?.fetchBoardsOfTheBest;
    console.log('📝 게시글 데이터:', boards);
    console.log('📊 게시글 개수:', boards?.length || 0);
    
    return boards ?? [];
  } catch (error: any) {
    console.error('🚨 fetchBoardsOfTheBestApi 네트워크 에러:', error);
    console.error('🚨 에러 상세 정보:', {
      message: error.message,
      status: error.networkError?.statusCode,
      response: error.networkError?.result,
      graphQLErrors: error.graphQLErrors,
      networkError: error.networkError
    });
    
    // 400 에러의 경우 더 자세한 정보 출력
    if (error.networkError?.statusCode === 400) {
      console.error('🚨 400 Bad Request 상세:', {
        url: error.networkError?.response?.url,
        headers: error.networkError?.response?.headers,
        body: error.networkError?.result
      });
    }
    
    // 에러가 발생해도 빈 배열을 반환하여 컴포넌트가 렌더링되도록 함
    return [];
  }
}