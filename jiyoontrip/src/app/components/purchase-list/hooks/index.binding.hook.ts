"use client";

import { useQuery } from "@tanstack/react-query";
import {
  FetchTravelproductsDocument,
  FetchTravelproductsOfTheBestDocument,
  FetchTravelproductsQuery,
  FetchTravelproductsOfTheBestQuery,
} from "@/commons/graphql/graphql";
import { print } from "graphql";
import { useAccessTokenStore } from "@/app/commons/stores/store";

const GRAPHQL_ENDPOINT = "https://main-practice.codebootcamp.co.kr/graphql";

async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  accessToken?: string
): Promise<T> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0]?.message || "GraphQL error");
  }

  return result.data;
}

export default function usePurchaseListBinding() {
  const { accessToken } = useAccessTokenStore();

  // 베스트 여행상품 조회
  const {
    data: bestProductsData,
    isLoading: isLoadingBest,
    error: errorBest,
  } = useQuery<FetchTravelproductsOfTheBestQuery>({
    queryKey: ["fetchTravelproductsOfTheBest"],
    queryFn: async () => {
      const queryString = print(FetchTravelproductsOfTheBestDocument);
      return fetchGraphQL<FetchTravelproductsOfTheBestQuery>(
        queryString,
        undefined,
        accessToken
      );
    },
  });

  // 여행상품 목록 조회
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useQuery<FetchTravelproductsQuery>({
    queryKey: ["fetchTravelproducts"],
    queryFn: async () => {
      const queryString = print(FetchTravelproductsDocument);
      return fetchGraphQL<FetchTravelproductsQuery>(
        queryString,
        undefined,
        accessToken
      );
    },
  });

  // 가격 포맷팅 함수 (천 단위 콤마)
  const formatPrice = (price?: number | null): string => {
    if (!price) return "0";
    return price.toLocaleString("ko-KR");
  };

  // 이미지 URL 처리 함수
  const processImageUrl = (imageUrl?: string | null): string => {
    // 입력값이 없거나 빈 문자열인 경우: 빈 문자열 반환
    if (!imageUrl || imageUrl.trim() === "") {
      return "";
    }

    // 입력값이 http:// 또는 https://로 시작하는 경우: 그대로 반환
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }

    // 그 외의 경우: GCS 경로로 간주하여 https://storage.googleapis.com/${입력값} 형식으로 반환
    return `https://storage.googleapis.com/${imageUrl}`;
  };

  return {
    bestProducts: bestProductsData?.fetchTravelproductsOfTheBest || [],
    products: productsData?.fetchTravelproducts || [],
    isLoadingBest,
    isLoadingProducts,
    errorBest,
    errorProducts,
    formatPrice,
    processImageUrl,
  };
}

