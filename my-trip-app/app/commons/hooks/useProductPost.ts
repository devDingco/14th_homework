import { useState, useCallback } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import type { ProductFormData, ProductFormErrors } from "../../_types/product";

export function useProductPost() {
  const [formData, setFormData] = useState<ProductFormData>({
    productName: "",
    sellingPrice: "",
    productDescription: "",
    sellingPeriod: "",
    tags: "",
    zipCode: "",
    address: "",
    detailedAddress: "",
    referenceItem: "",
    latitude: "",
    longitude: "",
    photos: []
  });

  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [uploadedPhotos, setUploadedPhotos] = useState<(string | null)[]>([null, null, null, null, null]);

  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 에러 메시지 제거
    if (errors[name as keyof ProductFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: ProductFormErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = "상품명을 입력해주세요.";
    }

    if (!formData.sellingPrice.trim()) {
      newErrors.sellingPrice = "판매가격을 입력해주세요.";
    }

    if (!formData.productDescription.trim()) {
      newErrors.productDescription = "상품설명을 입력해주세요.";
    }

    if (!formData.sellingPeriod.trim()) {
      newErrors.sellingPeriod = "판매 가격을 입력해주세요.";
    }

    if (!formData.zipCode.trim() || !formData.address.trim()) {
      newErrors.address = "주소를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // 실제 API 호출 로직 구현
    }
  }, [formData, validateForm]);

  const handleCancel = useCallback(() => {
    // 취소 로직
    console.log("Form cancelled");
    // 실제로는 router.back() 또는 특정 페이지로 이동
  }, []);

  const handlePostcodeSearch = useCallback(() => {
    open({
      onComplete: (data: any) => {
        const zonecode = data.zonecode;
        const roadAddress = data.roadAddress || data.address || "";
        
        setFormData(prev => ({
          ...prev,
          zipCode: zonecode,
          address: roadAddress,
          // 실제로는 좌표 변환 API를 사용해야 함
          latitude: "37.5665", // 임시 값
          longitude: "126.9780" // 임시 값
        }));

        // 주소 관련 에러 제거
        if (errors.address) {
          setErrors(prev => ({
            ...prev,
            address: undefined
          }));
        }
      },
    });
  }, [open, errors.address]);

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      // 실제로는 파일 업로드 API를 사용해야 함
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedPhotos(prev => {
          const newPhotos = [...prev];
          newPhotos[index] = result;
          return newPhotos;
        });
      };
      reader.readAsDataURL(file);

      // formData의 photos 배열 업데이트
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, file]
      }));
    }
  }, []);

  const removePhoto = useCallback((index: number) => {
    setUploadedPhotos(prev => {
      const newPhotos = [...prev];
      newPhotos[index] = null;
      return newPhotos;
    });

    // formData의 photos 배열에서도 제거
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  }, []);

  return {
    formData,
    errors,
    uploadedPhotos,
    handleInputChange,
    handleSubmit,
    handleCancel,
    handlePostcodeSearch,
    handlePhotoUpload,
    removePhoto
  };
}
