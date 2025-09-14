import { useState, useEffect, useCallback } from "react";
import { updateBoardApi, uploadFileApi } from "../apis/board.api";
import type { UpdateBoardInput } from "../graphql/__generated__/graphql";
import { useDaumPostcodePopup } from "react-daum-postcode";
import type { BoardEditFormData } from "../../_types/board";

export function useBoardEdit(id: string, initialData: any) {
  const [formData, setFormData] = useState<BoardEditFormData>({
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
  const [imageUrls, setImageUrls] = useState<(string | null)[]>([null, null, null]);

  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setFormData({
        password: "",
        title: initialData.title || "",
        content: initialData.contents || "",
        youtubeUrl: initialData.youtubeUrl || "",
        zipcode: initialData.boardAddress?.zipcode || "",
        address: initialData.boardAddress?.address || "",
        detailAddress: initialData.boardAddress?.addressDetail || "",
      });
      
      // 이미지 설정
      const images = initialData.images || [];
      const newImageUrls: (string | null)[] = [null, null, null];
      images.forEach((img: string, index: number) => {
        if (index < 3) {
          newImageUrls[index] = img;
        }
      });
      setImageUrls(newImageUrls);
    }
  }, [initialData]);

  const updateFormData = useCallback((field: keyof BoardEditFormData, value: string) => {
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
    if (!formData.password.trim()) nextErrors.password = "비밀번호를 입력해 주세요.";
    if (!formData.title.trim()) nextErrors.title = "필수입력 사항 입니다.";
    if (!formData.content.trim()) nextErrors.content = "필수입력 사항 입니다.";
    return nextErrors;
  }, [formData]);

  const buildUpdateBoardInput = useCallback((): UpdateBoardInput => {
    const hasAddress = !!(formData.zipcode || formData.address || formData.detailAddress);
    return {
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

    const input = buildUpdateBoardInput();

    try {
      setIsSubmitting(true);
      const updated = await updateBoardApi(id, formData.password, input);
      if (!updated || !updated._id) {
        setApiError("수정에 실패했어요. 잠시 후 다시 시도해 주세요.");
        return;
      }
      setIsModalOpen(true);
    } catch (error) {
      setApiError("에러가 발생했어요. 비밀번호를 확인해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }, [id, formData.password, validateForm, buildUpdateBoardInput]);
  
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
    imageUrls,
    updateFormData,
    handleSubmit,
    onChangeFile,
    removeImage,
    openPostcode,
    setIsModalOpen
  };
}
