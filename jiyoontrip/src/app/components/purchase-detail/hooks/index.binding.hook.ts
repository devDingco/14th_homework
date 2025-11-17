"use client";

import { useQuery } from "@tanstack/react-query";
import {
  FetchTravelproductDocument,
  FetchTravelproductQuery,
} from "@/commons/graphql/graphql";
import { print } from "graphql";
import { useAccessTokenStore } from "@/app/commons/stores/store";
import { useParams } from "next/navigation";

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

export default function usePurchaseDetailBinding() {
  const { accessToken } = useAccessTokenStore();
  const params = useParams();
  const travelproductId = params?.id as string;

  // 여행상품 상세 조회
  const {
    data: travelproductData,
    isLoading,
    error,
  } = useQuery<FetchTravelproductQuery>({
    queryKey: ["fetchTravelproduct", travelproductId],
    queryFn: async () => {
      if (!travelproductId) {
        throw new Error("Travelproduct ID is required");
      }
      const queryString = print(FetchTravelproductDocument);
      return fetchGraphQL<FetchTravelproductQuery>(
        queryString,
        { travelproductId },
        accessToken
      );
    },
    enabled: !!travelproductId,
  });

  // 가격 포맷팅 함수 (천 단위 콤마)
  const formatPrice = (price?: number | null): string => {
    if (!price) return "0";
    return price.toLocaleString("ko-KR");
  };

  // 태그 포맷팅 함수 (# 접두사 추가)
  const formatTags = (tags?: Array<string> | null): string => {
    if (!tags || tags.length === 0) return "";
    return tags.map((tag) => `#${tag}`).join(" ");
  };

  return {
    travelproduct: travelproductData?.fetchTravelproduct,
    isLoading,
    error,
    formatPrice,
    formatTags,
  };
}

