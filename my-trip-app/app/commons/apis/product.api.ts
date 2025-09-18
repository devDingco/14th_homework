"use client";

import { 
  FETCH_TRAVELPRODUCTS_QUERY,
  FETCH_TRAVELPRODUCTS_OF_THE_BEST_QUERY,
  FETCH_TRAVELPRODUCT_QUERY
} from "../graphql/queries/product";
import { apolloClient } from "../graphql/apollo-client";

export async function fetchTravelproductsApi(page?: number, search?: string, isSoldout?: boolean) {
  try {
    console.log('🔍 API 호출 시작: fetchTravelproducts');
    console.log('🌐 GraphQL 엔드포인트:', 'https://main-practice.codebootcamp.co.kr/graphql');
    
    const { data, error: graphqlError } = await apolloClient.query({
      query: FETCH_TRAVELPRODUCTS_QUERY,
      variables: {
        page: page || 1,
        search: search || "",
        isSoldout: isSoldout || false
      },
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
      context: {
        skipAuth: true
      }
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
    
    const products = data?.fetchTravelproducts;
    console.log('🏨 상품 데이터:', products);
    console.log('📊 상품 개수:', products?.length || 0);
    
    return products ?? [];
  } catch (error: any) {
    console.error('🚨 fetchTravelproductsApi 네트워크 에러:', error);
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
    
    return [];
  }
}

export async function fetchTravelproductsOfTheBestApi() {
  try {
    console.log('🔍 API 호출 시작: fetchTravelproductsOfTheBest');
    console.log('🌐 GraphQL 엔드포인트:', 'https://main-practice.codebootcamp.co.kr/graphql');
    
    const { data, error: graphqlError } = await apolloClient.query({
      query: FETCH_TRAVELPRODUCTS_OF_THE_BEST_QUERY,
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: false,
      context: {
        skipAuth: true
      }
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
    
    const bestProducts = data?.fetchTravelproductsOfTheBest;
    console.log('🏆 베스트 상품 데이터:', bestProducts);
    console.log('📊 베스트 상품 개수:', bestProducts?.length || 0);
    
    return bestProducts ?? [];
  } catch (error: any) {
    console.error('🚨 fetchTravelproductsOfTheBestApi 네트워크 에러:', error);
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
    
    return [];
  }
}

export async function fetchTravelproductApi(travelproductId: string) {
  try {
    console.log('🔍 API 호출 시작: fetchTravelproduct');
    console.log('🆔 상품 ID:', travelproductId);
    console.log('🌐 GraphQL 엔드포인트:', 'https://main-practice.codebootcamp.co.kr/graphql');
    
    const { data, error: graphqlError } = await apolloClient.query({
      query: FETCH_TRAVELPRODUCT_QUERY,
      variables: {
        travelproductId
      },
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
      context: {
        skipAuth: true
      }
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
    
    const product = data?.fetchTravelproduct;
    console.log('🏨 상품 상세 데이터:', product);
    
    return product ?? null;
  } catch (error: any) {
    console.error('🚨 fetchTravelproductApi 네트워크 에러:', error);
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
    
    return null;
  }
}

