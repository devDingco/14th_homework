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
  const [search, setSearch] = useState("");
  const [isSoldout, setIsSoldout] = useState(false);

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

  // 상품 목록 가져오기
  const fetchProducts = useCallback(async (searchTerm: string = "", soldout: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 상품 목록 조회 시작:', { search: searchTerm, isSoldout: soldout });
      
      // Apollo Client 사용
      const travelProducts = await fetchTravelproductsApi(1, searchTerm, soldout);
      
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
    fetchProducts(search, isSoldout);
  }, [search, isSoldout, fetchProducts]);

  // 검색
  const handleSearch = useCallback((searchTerm: string) => {
    setSearch(searchTerm);
  }, []);

  // 품절 상품 포함/제외 토글
  const handleSoldoutToggle = useCallback(() => {
    setIsSoldout(prev => !prev);
  }, []);

  // 새로고침
  const refresh = useCallback(() => {
    fetchProducts(search, isSoldout);
  }, [search, isSoldout, fetchProducts]);

  return {
    products,
    loading,
    error,
    search,
    isSoldout,
    handleSearch,
    handleSoldoutToggle,
    refresh
  };
}