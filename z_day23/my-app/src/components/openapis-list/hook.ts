"use client";

import { useState, useEffect } from "react";
import { IUseOpenapisList } from "./types";

export const useOpenapisList = (): IUseOpenapisList => {
  // loading의 초기값을 false로 변경하여 초기 데이터 로딩을 허용합니다.
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore] = useState(true);

  const fetchMoreImages = async () => {
    // 로딩 중이거나 에러가 있으면 함수를 호출하지 않습니다.
    if (loading || error) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchPromises = Array(6)
        .fill(null)
        .map(() => fetch("https://dog.ceo/api/breeds/image/random"));
      const responses = await Promise.all(fetchPromises);
      const dataPromises = responses.map((res) => {
        if (!res.ok) throw new Error("네트워크 응답 실패");
        return res.json();
      });
      const results = await Promise.all(dataPromises);
      const newImages = results.map((result) => result.message);
      setImages((prevImages) => [...prevImages, ...newImages]);
    } catch (err: any) {
      setError(
        "이미지를 가져오는 데 실패했습니다. 잠시 후 다시 시도해 주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (erroredImageUrl: string) => {
    setImages((prevImages) =>
      prevImages.filter((url) => url !== erroredImageUrl)
    );
    console.warn(`이미지 로딩 실패: ${erroredImageUrl}`);
  };

  useEffect(() => {
    fetchMoreImages();
  }, []);

  return { images, loading, error, hasMore, fetchMoreImages, handleImageError };
};
