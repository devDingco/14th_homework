"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { useAccessTokenStore } from "@/app/commons/stores/store";
import { useModalStore } from "@/app/commons/stores/store";
import { ROUTES } from "@/app/commons/constants/url";
import { checkValidationFile } from "@/app/commons/libraries/file-validaton";
import { CREATE_TRAVELPRODUCT_QUERY, UPLOAD_FILE_QUERY } from "../queries";

interface FormData {
  productName: string;
  summary: string;
  description: string;
  price: string;
  tags?: string;
  zipcode?: string;
  address?: string;
  addressDetail?: string;
  lat?: string;
  lng?: string;
  images?: string[];
}

interface UsePurchaseWriteBindingProps {
  form: UseFormReturn<FormData>;
}

// GraphQL 요청을 위한 fetch 함수
async function graphqlRequest<T>(
  query: string,
  variables: Record<string, unknown>,
  accessToken?: string
): Promise<T> {
  const response = await fetch("http://main-practice.codebootcamp.co.kr/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: JSON.stringify({ query, variables }),
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

// 파일 업로드를 위한 fetch 함수
async function uploadFileRequest(
  file: File,
  accessToken?: string
): Promise<{ uploadFile: { url: string } }> {
  const formData = new FormData();
  formData.append(
    "operations",
    JSON.stringify({
      query: UPLOAD_FILE_QUERY,
      variables: { file: null },
    })
  );
  formData.append("map", JSON.stringify({ "0": ["variables.file"] }));
  formData.append("0", file);

  const response = await fetch("http://main-practice.codebootcamp.co.kr/graphql", {
    method: "POST",
    headers: {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`File upload failed: ${response.statusText}`);
  }

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0]?.message || "Upload error");
  }

  return result.data;
}

export default function usePurchaseWriteBinding({
  form,
}: UsePurchaseWriteBindingProps) {
  const router = useRouter();
  const { accessToken } = useAccessTokenStore();
  const { openModal, closeModal } = useModalStore();
  const { register, handleSubmit, setValue, watch, formState } = form;
  const watchedImages = watch("images");
  const formImages = useMemo(() => watchedImages || [], [watchedImages]);
  const [images, setImages] = useState<string[]>(formImages);

  // form의 images와 동기화
  useEffect(() => {
    setImages(formImages);
  }, [formImages]);

  // 파일 업로드 뮤테이션
  const uploadFileMutation = useMutation({
    mutationFn: async (file: File) => {
      const result = await uploadFileRequest(file, accessToken);
      return result.uploadFile.url;
    },
  });

  // 상품 생성 뮤테이션
  const createTravelproductMutation = useMutation({
    mutationFn: async (input: {
      createTravelproductInput: {
        name: string;
        remarks: string;
        contents: string;
        price: number;
        tags?: string[];
        images?: string[];
        travelproductAddress?: {
          zipcode?: string;
          address?: string;
          addressDetail?: string;
          lat?: number;
          lng?: number;
        };
      };
    }) => {
      const result = await graphqlRequest<{
        createTravelproduct: { _id: string };
      }>(CREATE_TRAVELPRODUCT_QUERY, input, accessToken);
      return result.createTravelproduct;
    },
    onSuccess: (data) => {
      router.push(ROUTES.PURCHASE.DETAIL(data._id));
    },
    onError: (error) => {
      alert(error.message || "상품 등록에 실패했습니다.");
    },
  });

  // 이미지 업로드 핸들러
  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isValid = checkValidationFile(file);
    if (!isValid) return;

    try {
      const url = await uploadFileMutation.mutateAsync(file);
      const newImages = [...images, url];
      setImages(newImages);
      setValue("images", newImages);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  // 이미지 삭제 핸들러
  const handleImageDelete = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setValue("images", newImages);
  };

  // 폼 제출 핸들러
  const onSubmit = handleSubmit(async (formData: FormData) => {
    // 태그 문자열을 배열로 변환
    const tagsArray = formData.tags
      ? formData.tags.split(/[,\s]+/).filter((tag) => tag.trim() !== "")
      : undefined;

    // 가격을 숫자로 변환
    const price = Number(formData.price);

    // 주소 정보 구성
    const travelproductAddress =
      formData.zipcode || formData.address
        ? {
            zipcode: formData.zipcode || undefined,
            address: formData.address || undefined,
            addressDetail: formData.addressDetail || undefined,
            lat: formData.lat ? Number(formData.lat) : undefined,
            lng: formData.lng ? Number(formData.lng) : undefined,
          }
        : undefined;

    await createTravelproductMutation.mutateAsync({
      createTravelproductInput: {
        name: formData.productName,
        remarks: formData.summary,
        contents: formData.description,
        price,
        tags: tagsArray,
        images: images.length > 0 ? images : undefined,
        travelproductAddress: travelproductAddress || undefined,
      },
    });
  });

  // 취소 핸들러
  const handleCancel = () => {
    openModal(
      <div
        data-testid="modal-cancel-confirm"
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          maxWidth: "90%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ marginBottom: "20px" }}>
          <p>작성 중인 내용이 사라집니다. 정말 취소하시겠습니까?</p>
        </div>
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button
            onClick={() => {
              closeModal();
            }}
            data-testid="modal-cancel-no"
            style={{
              padding: "8px 16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            아니오
          </button>
          <button
            onClick={() => {
              closeModal();
              router.push(ROUTES.PURCHASE.LIST);
            }}
            data-testid="modal-cancel-yes"
            style={{
              padding: "8px 16px",
              border: "1px solid #000",
              borderRadius: "4px",
              backgroundColor: "#000",
              color: "white",
              cursor: "pointer",
            }}
          >
            예
          </button>
        </div>
      </div>
    );
  };

  return {
    register,
    formState,
    onSubmit,
    images,
    handleImageUpload,
    handleImageDelete,
    handleCancel,
    isLoading: createTravelproductMutation.isPending || uploadFileMutation.isPending,
  };
}

