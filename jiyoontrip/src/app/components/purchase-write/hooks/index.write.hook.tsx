"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { ChangeEvent, useState, useEffect, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { useAccessTokenStore } from "@/app/commons/stores/store";
import { useModalStore } from "@/app/commons/stores/store";
import { ROUTES } from "@/app/commons/constants/url";
import { checkValidationFile } from "@/app/commons/libraries/file-validaton";
import {
  CREATE_TRAVELPRODUCT_QUERY,
  UPDATE_TRAVELPRODUCT_QUERY,
  UPLOAD_FILE_QUERY,
} from "../queries";

const GRAPHQL_ENDPOINT = "https://main-practice.codebootcamp.co.kr/graphql";

const FETCH_TRAVELPRODUCT_QUERY = `
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      pickedCount
      images
      tags
      travelproductAddress {
        _id
        address
        addressDetail
        zipcode
        lat
        lng
      }
      seller {
        _id
        name
        picture
      }
      buyer {
        _id
        name
        picture
      }
      createdAt
      updatedAt
      soldAt
      deletedAt
    }
  }
`;

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
  editorRef?: React.MutableRefObject<unknown>;
}

// GraphQL 요청을 위한 fetch 함수
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

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
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
  editorRef,
}: UsePurchaseWriteBindingProps) {
  const router = useRouter();
  const params = useParams();
  const { accessToken } = useAccessTokenStore();
  const { openModal, closeModal } = useModalStore();
  const { register, handleSubmit, reset, formState } = form;

  // URL 파라미터에서 travelproductId 확인
  const travelproductId = params?.id as string | undefined;
  const isEditMode = !!travelproductId;

  // 이미지 상태 관리
  const [previewImages, setPreviewImages] = useState<string[]>([]); // FileReader로 생성한 임시 URL
  const [uploadedImages, setUploadedImages] = useState<string[]>([]); // 새로 업로드된 이미지
  const [existingImages, setExistingImages] = useState<string[]>([]); // 수정 모드일 때 기존 이미지
  const [deletedImages, setDeletedImages] = useState<number[]>([]); // 삭제된 기존 이미지 인덱스

  // 최종 images 배열: uploadedImages + existingImages (deletedImages에 없는 것만)
  const images = useMemo(() => {
    const existingFiltered = existingImages.filter(
      (_, index) => !deletedImages.includes(index)
    );
    return [...uploadedImages, ...existingFiltered];
  }, [uploadedImages, existingImages, deletedImages]);

  // 기존 데이터 로드 (수정 모드)
  const { data: travelproductData, isLoading: isLoadingData } = useQuery({
    queryKey: ["fetchTravelproduct", travelproductId],
    queryFn: async () => {
      if (!travelproductId) return null;
      const result = await fetchGraphQL<{
        fetchTravelproduct: {
          _id: string;
          name: string;
          remarks: string;
          contents: string;
          price?: number;
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
      }>(FETCH_TRAVELPRODUCT_QUERY, { travelproductId }, accessToken);
      return result.fetchTravelproduct;
    },
    enabled: isEditMode && !!travelproductId,
  });

  // 기존 데이터로 폼 초기화
  useEffect(() => {
    if (travelproductData && isEditMode) {
      // 폼 필드 매핑
      reset({
        productName: travelproductData.name || "",
        summary: travelproductData.remarks || "",
        description: travelproductData.contents || "",
        price: travelproductData.price?.toString() || "",
        tags: travelproductData.tags?.join(", ") || "",
        zipcode: travelproductData.travelproductAddress?.zipcode || "",
        address: travelproductData.travelproductAddress?.address || "",
        addressDetail: travelproductData.travelproductAddress?.addressDetail || "",
        lat: travelproductData.travelproductAddress?.lat?.toString() || "",
        lng: travelproductData.travelproductAddress?.lng?.toString() || "",
        images: travelproductData.images || [],
      });

      // SunEditor에 내용 설정
      if (editorRef?.current && travelproductData.contents) {
        const sunEditor = editorRef.current as {
          setContents: (content: string) => void;
        };
        if (sunEditor.setContents) {
          sunEditor.setContents(travelproductData.contents);
        }
      }

      // 기존 이미지 설정
      if (travelproductData.images && travelproductData.images.length > 0) {
        setExistingImages(travelproductData.images);
      }
    }
  }, [travelproductData, isEditMode, reset, editorRef]);

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
      const result = await fetchGraphQL<{
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

  // 상품 수정 뮤테이션
  const updateTravelproductMutation = useMutation({
    mutationFn: async (input: {
      updateTravelproductInput: {
        name?: string;
        remarks?: string;
        contents?: string;
        price?: number;
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
      travelproductId: string;
    }) => {
      const result = await fetchGraphQL<{
        updateTravelproduct: { _id: string };
      }>(UPDATE_TRAVELPRODUCT_QUERY, input, accessToken);
      return result.updateTravelproduct;
    },
    onSuccess: (data) => {
      router.push(ROUTES.PURCHASE.DETAIL(data._id));
    },
    onError: (error) => {
      alert(error.message || "상품 수정에 실패했습니다.");
    },
  });

  // 이미지 업로드 핸들러 (FileReader 사용)
  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isValid = checkValidationFile(file);
    if (!isValid) return;

    // FileReader로 임시 미리보기 URL 생성 (Promise로 래핑)
    const tempUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setPreviewImages((prev) => [...prev, url]);
        resolve(url);
      };
      reader.readAsDataURL(file);
    });

    // 파일 업로드
    try {
      const url = await uploadFileMutation.mutateAsync(file);
      // 업로드 성공 시 uploadedImages에 추가
      setUploadedImages((prev) => [...prev, url]);
      // previewImages에서 해당 임시 URL 제거
      setPreviewImages((prev) => prev.filter((img) => img !== tempUrl));
    } catch (error) {
      console.error("Image upload failed:", error);
      // 업로드 실패 시 previewImages에서 임시 URL 제거
      setPreviewImages((prev) => prev.filter((img) => img !== tempUrl));
    }

    // input 초기화
    event.target.value = "";
  };

  // 이미지 삭제 핸들러
  const handleImageDelete = (index: number) => {
    // displayImages 배열에서의 인덱스를 기준으로 삭제
    const displayImagesArray = [...previewImages, ...images];
    const targetImage = displayImagesArray[index];

    if (previewImages.includes(targetImage)) {
      // previewImages에 있는 경우 (임시 미리보기)
      setPreviewImages((prev) => prev.filter((img) => img !== targetImage));
    } else if (uploadedImages.includes(targetImage)) {
      // uploadedImages에 있는 경우
      setUploadedImages((prev) => prev.filter((img) => img !== targetImage));
    } else if (existingImages.includes(targetImage)) {
      // existingImages에 있는 경우
      const existingIndex = existingImages.indexOf(targetImage);
      setDeletedImages((prev) => {
        if (prev.includes(existingIndex)) return prev;
        return [...prev, existingIndex];
      });
    }
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

    // images 배열 구성
    const finalImages = images.length > 0 ? images : undefined;

    if (isEditMode && travelproductId) {
      // 수정 모드
      await updateTravelproductMutation.mutateAsync({
        updateTravelproductInput: {
          name: formData.productName,
          remarks: formData.summary,
          contents: formData.description,
          price,
          tags: tagsArray,
          images: finalImages,
          travelproductAddress: travelproductAddress || undefined,
        },
        travelproductId,
      });
    } else {
      // 등록 모드
      await createTravelproductMutation.mutateAsync({
        createTravelproductInput: {
          name: formData.productName,
          remarks: formData.summary,
          contents: formData.description,
          price,
          tags: tagsArray,
          images: finalImages,
          travelproductAddress: travelproductAddress || undefined,
        },
      });
    }
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
              if (isEditMode && travelproductId) {
                router.push(ROUTES.PURCHASE.DETAIL(travelproductId));
              } else {
                router.push(ROUTES.PURCHASE.LIST);
              }
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

  // 미리보기용 이미지 배열 (previewImages + images)
  const displayImages = useMemo(() => {
    return [...previewImages, ...images];
  }, [previewImages, images]);

  return {
    register,
    formState,
    onSubmit,
    images: displayImages,
    handleImageUpload,
    handleImageDelete,
    handleCancel,
    isLoading:
      createTravelproductMutation.isPending ||
      updateTravelproductMutation.isPending ||
      uploadFileMutation.isPending,
    isEditMode,
    isLoadingData,
  };
}
