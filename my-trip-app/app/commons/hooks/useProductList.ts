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
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isSoldout, setIsSoldout] = useState(false);

  // TravelProduct를 ProductListItem으로 변환하는 함수
  const transformProduct = useCallback((product: TravelProduct): ProductListItem => {
    return {
      id: product._id,
      title: product.name || "제목 없음",
      subtitle: product.contents?.substring(0, 50) + "..." || "설명 없음",
      price: product.price ? `${product.price.toLocaleString()} 원` : "가격 미정",
      bookmarkCount: product.pickedCount || 0,
      host: product.seller?.name || "판매자 정보 없음",
      tags: product.tags || [],
      image: product.images?.[0] || "/images/desktop/a.png", // 기본 이미지
      hostAvatar: "/images/mobile/profile/img.png" // 기본 아바타
    };
  }, []);

  // 상품 목록 가져오기
  const fetchProducts = useCallback(async (currentPage: number = 1, searchTerm: string = "", soldout: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 상품 목록 조회 시작:', { page: currentPage, search: searchTerm, isSoldout: soldout });
      
      const travelProducts = await fetchTravelproductsApi(currentPage, searchTerm, soldout);
      
      if (travelProducts && Array.isArray(travelProducts)) {
        const transformedProducts = travelProducts.map(transformProduct);
        setProducts(transformedProducts);
        console.log('✅ 상품 목록 조회 성공:', transformedProducts.length, '개');
      } else {
        console.warn('⚠️ 상품 데이터가 배열이 아닙니다:', travelProducts);
        setProducts([]);
      }
    } catch (err) {
      console.error('🚨 상품 목록 조회 실패:', err);
      setError(err instanceof Error ? err.message : '상품 목록을 불러오는데 실패했습니다.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [transformProduct]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchProducts(page, search, isSoldout);
  }, [fetchProducts, page, search, isSoldout]);

  // 페이지 변경
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  // 검색
  const handleSearch = useCallback((searchTerm: string) => {
    setSearch(searchTerm);
    setPage(1); // 검색 시 첫 페이지로 리셋
  }, []);

  // 품절 상품 포함/제외 토글
  const handleSoldoutToggle = useCallback(() => {
    setIsSoldout(prev => !prev);
    setPage(1); // 필터 변경 시 첫 페이지로 리셋
  }, []);

  // 새로고침
  const refresh = useCallback(() => {
    fetchProducts(page, search, isSoldout);
  }, [fetchProducts, page, search, isSoldout]);

  return {
    products,
    loading,
    error,
    page,
    search,
    isSoldout,
    handlePageChange,
    handleSearch,
    handleSoldoutToggle,
    refresh
  };
}
