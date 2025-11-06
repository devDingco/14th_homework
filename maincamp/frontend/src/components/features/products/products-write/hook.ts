import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Address } from "react-daum-postcode";
import { EditorState } from "lexical";
import { $getRoot } from "lexical";
import { productWriteSchema, ProductWriteFormValues } from "./schema";

export default function useProductWriteForm() {
  // 0. 세팅
  // 0-1. 라우터
  const router = useRouter();

  // 0-2. state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. useForm 세팅
  // 1-1. useForm 초기값세팅
  const methods = useForm<ProductWriteFormValues>({
    defaultValues: {
      name: "",
      remarks: "",
      contents: "",
      price: "",
      tags: "",
      productAddress: {
        zipcode: "",
        address: "",
        addressDetail: "",
      },
      lat: "",
      lng: "",
    },
    resolver: zodResolver(productWriteSchema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState, setValue, watch } = methods;

  // 2. 함수
  // 2-1. 주소 검색 모달 토글
  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // 2-2. 주소 검색 완료 핸들러
  const handleComplete = (data: Address) => {
    setValue("productAddress.zipcode", data.zonecode, { shouldValidate: true });
    setValue("productAddress.address", data.address, { shouldValidate: true });
    // 임시로 좌표 설정 (실제로는 주소를 좌표로 변환하는 API 사용)
    setValue("lat", "37.5665", { shouldValidate: true });
    setValue("lng", "126.9780", { shouldValidate: true });
    setIsModalOpen(false);
  };

  // 2-3. Lexical 에디터 내용 변경 핸들러
  const handleEditorChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();
      setValue("contents", textContent, { shouldValidate: true });
    });
  };

  // 2-4. 취소 버튼 핸들러
  const onClickCancel = () => {
    router.back();
  };

  // 2-5. 등록 버튼 핸들러
  const onClickSubmit = (data: ProductWriteFormValues) => {
    console.log("Form Data:", data);
    // TODO: API 호출하여 상품 등록
    alert("상품이 등록되었습니다.");
  };

  return {
    register,
    handleSubmit,
    formState,
    setValue,
    watch,
    isModalOpen,
    onToggleModal,
    handleComplete,
    handleEditorChange,
    onClickCancel,
    onClickSubmit,
  };
}

