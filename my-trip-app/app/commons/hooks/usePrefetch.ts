import { useEffect } from 'react';
import { apolloClient } from '../graphql/apollo-client';
import { FETCH_TRAVELPRODUCTS_OF_THE_BEST_QUERY } from '../graphql/queries/product';

export function usePrefetchProducts() {
  useEffect(() => {
    // 컴포넌트가 마운트되면 즉시 데이터를 프리페치
    const prefetch = async () => {
      try {
        await apolloClient.query({
          query: FETCH_TRAVELPRODUCTS_OF_THE_BEST_QUERY,
          fetchPolicy: 'cache-first',
          errorPolicy: 'ignore', // 에러 무시하고 계속 진행
          context: {
            skipAuth: true
          }
        });
        console.log('✅ 베스트 상품 데이터 프리페치 완료');
      } catch (error) {
        console.log('⚠️ 프리페치 실패 (무시됨):', error);
      }
    };

    // 약간의 지연 후 프리페치 실행 (초기 렌더링 방해 방지)
    const timeoutId = setTimeout(prefetch, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);
}
