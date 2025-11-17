import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { CREATE_TRAVELPRODUCT } from "@/graphql/mutations/product";
import { ProductWriteFormValues } from "../schema";

interface UseProductWriteFormSubmitReturn {
  onSubmit: (data: ProductWriteFormValues) => Promise<void>;
  data: unknown;
  loading: boolean;
  error: unknown;
}

export default function useProductWriteFormSubmit(): UseProductWriteFormSubmitReturn {
  // 0. 세팅
  // 0-1. 라우터
  const router = useRouter();

  // 1. API 요청 세팅
  // 1-1. 상품 등록 API
  const [createTravelproduct, { data, loading, error }] = useMutation(CREATE_TRAVELPRODUCT);

  // 2. 등록하기 함수
  // 2-1. 상품 등록하기
  const onSubmit = async (formData: ProductWriteFormValues) => {
    try {
      // tags를 배열로 변환 (쉼표로 구분)
      const tagsArray = formData.tags
        ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [];

      // price를 숫자로 변환
      const priceNumber = parseInt(formData.price, 10);

      // lat, lng 값 추출
      const lat = formData.lat ? parseFloat(formData.lat) : undefined;
      const lng = formData.lng ? parseFloat(formData.lng) : undefined;

      // travelproductAddress 구조 생성
      const travelproductAddress = {
        address: formData.productAddress.address,
        addressDetail: formData.productAddress.addressDetail || "",
        zipcode: formData.productAddress.zipcode,
        lat,
        lng,
      };

      // GraphQL mutation 실행
      const result = await createTravelproduct({
        variables: {
          createTravelproductInput: {
            name: formData.name,
            remarks: formData.remarks,
            contents: formData.contents,
            price: priceNumber,
            tags: tagsArray.length > 0 ? tagsArray : undefined,
            travelproductAddress,
            images: undefined, // 이미지는 추후 구현
          },
        },
      });

      // 성공 시 상세 페이지로 이동
      if (result.data?.createTravelproduct?._id) {
        const productId = result.data.createTravelproduct._id;
        router.push(`/products/${productId}`);
      }
    } catch (err) {
      // 에러 처리
      const showErrorModal = () =>
        Modal.error({
          title: "상품 등록에 실패하였습니다.",
          content: (err as Error)?.message ?? "상품 등록에 실패하였습니다.",
        });
      showErrorModal();
    }
  };

  return {
    onSubmit,
    data,
    loading,
    error,
  };
}
