import { useState, useCallback } from "react";
import { createBoardApi, uploadFileApi } from "../apis/board.api";
import type { CreateBoardInput } from "../graphql/__generated__/graphql";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useAuth } from "./useAuth";
import type { BoardFormData } from "../../_types/board";

export function useBoardPost() {
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState<BoardFormData>({
    writer: "",
    password: "",
    title: "",
    content: "",
    youtubeUrl: "",
    zipcode: "",
    address: "",
    detailAddress: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [createdBoardId, setCreatedBoardId] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<(string | null)[]>([null, null, null]);

  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

  const updateFormData = useCallback((field: keyof BoardFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const openPostcode = useCallback(() => {
    open({
      onComplete: (data: any) => {
        const zonecode = data.zonecode;
        const roadAddress = data.roadAddress || data.address || "";
        setFormData(prev => ({
          ...prev,
          zipcode: zonecode,
          address: roadAddress
        }));
      },
    });
  }, [open]);

  const validateForm = useCallback((): Record<string, string> => {
    const nextErrors: Record<string, string> = {};
    if (!isLoggedIn) {
      nextErrors.writer = "로그인이 필요합니다.";
      return nextErrors;
    }
    if (!formData.writer.trim()) nextErrors.writer = "필수입력 사항 입니다.";
    if (!formData.password.trim()) nextErrors.password = "필수입력 사항 입니다.";
    if (!formData.title.trim()) nextErrors.title = "필수입력 사항 입니다.";
    if (!formData.content.trim()) nextErrors.content = "필수입력 사항 입니다.";
    return nextErrors;
  }, [formData, isLoggedIn]);

  const buildCreateBoardInput = useCallback((): CreateBoardInput => {
    const hasAddress = !!(formData.zipcode || formData.address || formData.detailAddress);
    return {
      writer: formData.writer,
      password: formData.password,
      title: formData.title,
      contents: formData.content,
      youtubeUrl: formData.youtubeUrl || undefined,
      images: imageUrls.filter((v): v is string => !!v),
      ...(hasAddress
        ? {
            boardAddress: {
              zipcode: formData.zipcode || undefined,
              address: formData.address || undefined,
              addressDetail: formData.detailAddress || undefined,
            },
          }
        : {}),
    };
  }, [formData, imageUrls]);

  const handleSubmit = useCallback(async (): Promise<void> => {
    const nextErrors = validateForm();
    setErrors(nextErrors);
    setApiError("");
    if (Object.keys(nextErrors).length !== 0) return;

    const input = buildCreateBoardInput();

    try {
      setIsSubmitting(true);
      const created = await createBoardApi(input);
      if (!created || !created._id) {
        setApiError("등록에 실패했어요. 잠시 후 다시 시도해 주세요.");
        return;
      }
      setCreatedBoardId(created._id);
      setIsModalOpen(true);
    } catch (error) {
      setApiError("에러가 발생했어요. 네트워크 상태를 확인해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, buildCreateBoardInput]);
  
  const onChangeFile = useCallback((index: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEl = e.currentTarget;
    const file = inputEl.files?.[0];
    if (!file) return;
    try {
      setApiError("");
      const uploaded = await uploadFileApi(file);
      const url = uploaded?.url ?? null;
      if (url) {
        setImageUrls((prev) => {
          const next = [...prev];
          next[index] = url;
          return next;
        });
      }
    } catch {
      setApiError("이미지 업로드에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      inputEl.value = "";
    }
  }, []);

  const removeImage = useCallback((index: number) => {
    setImageUrls((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }, []);

  return {
    formData,
    errors,
    isModalOpen,
    isSubmitting,
    apiError,
    createdBoardId,
    imageUrls,
    updateFormData,
    handleSubmit,
    onChangeFile,
    removeImage,
    openPostcode,
    setIsModalOpen
  };
}
