import { useState, useEffect, useCallback } from 'react';
import { fetchTravelproductsApi } from '../apis/product.api';

interface Product {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  price: string;
  tags: string[];
  bookmarkCount: number;
  host: string;
  hostAvatar: string;
}

export function useProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [isSoldout, setIsSoldout] = useState(false);

  const ITEMS_PER_PAGE = 8;

  // 이미지 URL 처리 함수
  const getImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return '/images/desktop/a.png';
    
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    if (imageUrl.includes('codecamp-file-storage')) {
      return `https://storage.googleapis.com/${imageUrl}`;
    }
    
    return imageUrl;
  };

  // 상품 데이터 변환 함수
  const transformProduct = useCallback((product: any): Product => {
    return {
      id: product._id || product.id || Math.random().toString(),
      title: product.name || '제목 없음',
      subtitle: product.remarks || '설명 없음',
      image: getImageUrl(product.images?.[0] || ''),
      price: `${(product.price || 0).toLocaleString()}원`,
      tags: product.tags || [],
      bookmarkCount: product.pickedCount || 0,
      host: product.seller?.name || '호스트 정보 없음',
      hostAvatar: getImageUrl(product.seller?.picture || '/images/mobile/profile/profile_01.png'),
    };
  }, []);

  // 상품 데이터 가져오기
  const fetchProducts = useCallback(async (searchTerm = '', soldout = false, currentPage = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 상품 목록 조회:', { page: currentPage, search: searchTerm, isSoldout: soldout });
      
      const travelProducts = await fetchTravelproductsApi(currentPage, searchTerm, soldout);
      
      if (travelProducts && Array.isArray(travelProducts)) {
        const transformedProducts = travelProducts.map(transformProduct);
        setProducts(transformedProducts);
        
        // 총 페이지 수 계산 (실제 API에서 totalCount를 제공한다면 그것을 사용)
        // 현재는 받아온 데이터 수로 추정
        const estimatedTotalPages = transformedProducts.length < ITEMS_PER_PAGE ? currentPage : currentPage + 1;
        setTotalPages(estimatedTotalPages);
        
        console.log('✅ 상품 목록 조회 성공:', transformedProducts.length, '개');
      } else {
        console.warn('⚠️ 상품 데이터가 배열이 아닙니다:', travelProducts);
        setProducts([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error('🚨 상품 목록 조회 실패:', err);
      setError(err instanceof Error ? err.message : '상품을 불러오는데 실패했습니다.');
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [transformProduct, ITEMS_PER_PAGE]);

  // 페이지 변경 핸들러
  const handlePageChange = useCallback((newPage: number) => {
    if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      fetchProducts(search, isSoldout, newPage);
    }
  }, [page, totalPages, search, isSoldout, fetchProducts]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchProducts(search, isSoldout, page);
  }, []);

  // 검색
  const handleSearch = useCallback((searchTerm: string) => {
    setSearch(searchTerm);
    setPage(1);
    fetchProducts(searchTerm, isSoldout, 1);
  }, [isSoldout, fetchProducts]);

  // 품절 상품 토글
  const handleSoldoutToggle = useCallback((soldout: boolean) => {
    setIsSoldout(soldout);
    setPage(1);
    fetchProducts(search, soldout, 1);
  }, [search, fetchProducts]);

  // 새로고침
  const refresh = useCallback(() => {
    setPage(1);
    fetchProducts(search, isSoldout, 1);
  }, [search, isSoldout, fetchProducts]);

  return {
    products,
    loading,
    error,
    page,
    totalPages,
    handlePageChange,
    handleSearch,
    handleSoldoutToggle,
    refresh,
  };
}