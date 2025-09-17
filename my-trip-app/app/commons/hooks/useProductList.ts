"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchTravelproductsApi } from "../apis/product.api";
import type { TravelProduct } from "../../_types/product";

export interface ProductListItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  bookmarkCount: number;
  host: string;
  tags: string[];
  image: string;
  hostAvatar: string;
}

export function useProductList() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isSoldout, setIsSoldout] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // 페이지당 아이템 수 (4개씩 2줄 = 8개)
  const ITEMS_PER_PAGE = 8;

  // TravelProduct를 ProductListItem으로 변환하는 함수
  const transformProduct = useCallback((product: TravelProduct): ProductListItem => {
    // 이미지 경로 처리 함수
    const getImageUrl = (imageUrl?: string) => {
      if (!imageUrl) return "/images/desktop/a.png";
      
      // 이미 http/https로 시작하는 경우 그대로 사용
      if (imageUrl.startsWith("http")) return imageUrl;
      
      // codecamp-file-storage 경로인 경우 Google Storage URL로 변환
      const cleanPath = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
      return `https://storage.googleapis.com/${cleanPath}`;
    };

    return {
      id: product._id,
      title: product.name || "제목 없음",
      subtitle: product.contents?.substring(0, 50) + "..." || "설명 없음",
      price: product.price ? `${product.price.toLocaleString()} 원` : "가격 미정",
      bookmarkCount: product.pickedCount || 0,
      host: product.seller?.name || "판매자 정보 없음",
      tags: product.tags || [],
      image: getImageUrl(product.images?.[0]),
      hostAvatar: "/images/mobile/profile/img.png" // 기본 아바타
    };
  }, []);

  // 초기 상품 목록 가져오기
  const fetchProducts = useCallback(async (searchTerm: string = "", soldout: boolean = false, resetProducts: boolean = true) => {
    try {
      if (resetProducts) {
        setLoading(true);
        setProducts([]);
        setPage(1);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      
      const currentPage = resetProducts ? 1 : page;
      console.log('🔍 상품 목록 조회 시작:', { page: currentPage, search: searchTerm, isSoldout: soldout });
      
      const travelProducts = await fetchTravelproductsApi(currentPage, searchTerm, soldout);
      
      if (travelProducts && Array.isArray(travelProducts)) {
        const transformedProducts = travelProducts.map(transformProduct);
        
        if (resetProducts) {
          setProducts(transformedProducts);
        } else {
          setProducts(prev => [...prev, ...transformedProducts]);
        }
        
        // hasMore 상태 업데이트 (받아온 데이터가 ITEMS_PER_PAGE보다 적으면 더 이상 없음)
        setHasMore(transformedProducts.length >= ITEMS_PER_PAGE);
        
        console.log('✅ 상품 목록 조회 성공:', transformedProducts.length, '개');
      } else {
        console.warn('⚠️ 상품 데이터가 배열이 아닙니다:', travelProducts);
        if (resetProducts) {
          setProducts([]);
        }
        setHasMore(false);
      }
    } catch (err) {
      console.error('🚨 상품 목록 조회 실패:', err);
      setError(err instanceof Error ? err.message : '상품 목록을 불러오는데 실패했습니다.');
      if (resetProducts) {
        setProducts([]);
      }
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [transformProduct, page, ITEMS_PER_PAGE]);

  // 더 많은 상품 로드 (무한스크롤용)
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    
    const nextPage = page + 1;
    setPage(nextPage);
    
    try {
      setLoadingMore(true);
      setError(null);
      
      console.log('🔍 추가 상품 로드:', { page: nextPage, search, isSoldout });
      
      const travelProducts = await fetchTravelproductsApi(nextPage, search, isSoldout);
      
      if (travelProducts && Array.isArray(travelProducts)) {
        const transformedProducts = travelProducts.map(transformProduct);
        setProducts(prev => [...prev, ...transformedProducts]);
        
        // hasMore 상태 업데이트
        setHasMore(transformedProducts.length >= ITEMS_PER_PAGE);
        
        console.log('✅ 추가 상품 로드 성공:', transformedProducts.length, '개');
      } else {
        console.warn('⚠️ 추가 상품 데이터가 배열이 아닙니다:', travelProducts);
        setHasMore(false);
      }
    } catch (err) {
      console.error('🚨 추가 상품 로드 실패:', err);
      setError(err instanceof Error ? err.message : '추가 상품을 불러오는데 실패했습니다.');
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page, search, isSoldout, transformProduct, ITEMS_PER_PAGE]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchProducts(search, isSoldout, true);
  }, [search, isSoldout, fetchProducts]);

  // 검색
  const handleSearch = useCallback((searchTerm: string) => {
    setSearch(searchTerm);
    setPage(1);
    setHasMore(true);
  }, []);

  // 품절 상품 포함/제외 토글
  const handleSoldoutToggle = useCallback(() => {
    setIsSoldout(prev => !prev);
    setPage(1);
    setHasMore(true);
  }, []);

  // 새로고침
  const refresh = useCallback(() => {
    setPage(1);
    setHasMore(true);
    fetchProducts(search, isSoldout, true);
  }, [search, isSoldout, fetchProducts]);

  return {
    products,
    loading,
    loadingMore,
    error,
    hasMore,
    page,
    search,
    isSoldout,
    loadMore,
    handleSearch,
    handleSoldoutToggle,
    refresh
  };
}
