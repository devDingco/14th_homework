import { client } from './client';

// 캐시 유틸리티
export const cacheUtils = {
  // 특정 쿼리 캐시 제거
  clearQuery: (queryName: string) => {
    client.cache.evict({ fieldName: queryName });
    client.cache.gc();
  },

  // 모든 캐시 제거
  clearAll: () => {
    client.cache.reset();
  },

  // 특정 필드 캐시 제거
  clearField: (fieldName: string, args?: any) => {
    client.cache.evict({ fieldName, args });
    client.cache.gc();
  },

  // 캐시된 데이터 읽기
  readQuery: (query: any, options?: any) => {
    return client.cache.readQuery({ query, ...options });
  },

  // 캐시에 데이터 쓰기
  writeQuery: (query: any, data: any, options?: any) => {
    client.cache.writeQuery({ query, data, ...options });
  },

  // 캐시된 데이터 수정
  modifyQuery: (query: any, modifier: (data: any) => any) => {
    client.cache.modify({
      fields: {
        [query.definitions[0].selectionSet.selections[0].name.value]: (existingData) => {
          return modifier(existingData);
        },
      },
    });
  },
};

// 페이지네이션 캐시 헬퍼
export const paginationCache = {
  // 페이지네이션 데이터 병합
  mergePaginatedData: (existing: any[] = [], incoming: any[]) => {
    return incoming;
  },

  // 페이지네이션 데이터 추가
  appendPaginatedData: (existing: any[] = [], incoming: any[]) => {
    return [...existing, ...incoming];
  },

  // 페이지네이션 데이터 교체
  replacePaginatedData: (existing: any[] = [], incoming: any[]) => {
    return incoming;
  },
};
