import { useRouter, useParams } from 'next/navigation';
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { UPLOAD_FILE } from '@/components/boards-write/queries';
import { CREATE_TRAVELPRODUCT, UPDATE_TRAVELPRODUCT } from './queries';
import { FETCH_TRAVELPRODUCTS } from '@/components/accommodation-list/list/queries';
import {
  FetchTravelproductsQuery,
  FetchTravelproductsQueryVariables,
} from '@/commons/graphql/graphql';
import { useAlertModal } from '@/commons/components/modal';
import {
  AccommodationSellVariables,
  Errors,
  sellSchema,
  updateSellSchema,
  ISellSchema,
  IUpdateSellSchema,
} from './types';

export default function useAccommodationSell(props: AccommodationSellVariables) {
  const router = useRouter();
  const params = useParams();
  const { showAlert, AlertModalComponent } = useAlertModal();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValid },
    setValue,
    watch,
  } = useForm<ISellSchema | IUpdateSellSchema>({
    resolver: zodResolver(props.isEdit ? updateSellSchema : sellSchema),
    mode: 'onChange',
    defaultValues: {
      name: props.data?.name || '',
      summary: props.data?.summary || '',
      description: props.data?.description || '',
      price: props.data?.price
        ? String(props.data.price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : '',
      tags: props.data?.tags || '',
      zipcode: props.data?.zipcode || '',
      address: props.data?.address || '',
      addressDetail: props.data?.addressDetail || '',
      lat: props.data?.lat || '',
      lng: props.data?.lng || '',
    },
  });

  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 초기 이미지 URL 배열을 8개로 고정
  const getInitialImageUrls = (): string[] => {
    const initial: string[] = Array(8).fill('');
    if (props.data?.images && Array.isArray(props.data.images)) {
      props.data.images.slice(0, 8).forEach((url: string, index: number) => {
        initial[index] = url;
      });
    } else if (props.data?.imageUrl) {
      initial[0] = props.data.imageUrl;
    }
    return initial;
  };

  const [imageUrls, setImageUrls] = useState<string[]>(getInitialImageUrls());
  const [files, setFiles] = useState<(File | undefined)[]>(Array(8).fill(undefined));
  const [zipcode, setZipcode] = useState<string>(props.data?.zipcode || '');
  const [address, setAddress] = useState<string>(props.data?.address || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [createTravelproduct] = useMutation(CREATE_TRAVELPRODUCT);
  const [updateTravelproduct] = useMutation(UPDATE_TRAVELPRODUCT);

  // 주소 변경 시 위도/경도 자동 설정 (실제로는 주소 검색 API를 사용해야 함)
  useEffect(() => {
    if (address && zipcode) {
      // TODO: 실제 주소 검색 API 연동
      // 예시로 빈 값 설정
      setValue('lat', '');
      setValue('lng', '');
    }
  }, [address, zipcode, setValue]);

  // 가격 포맷팅 (천단위 콤마)
  const formatPrice = (value: string) => {
    const numValue = value.replace(/,/g, '');
    if (!numValue) return '';
    return numValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 가격 입력 핸들러
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPrice(e.target.value);
    setValue('price', formatted);
  };

  const price = watch('price');

  const onClickSubmit = handleSubmit(async (data) => {
    const formData = data as ISellSchema;

    // 파일이 없으면 에러 처리
    const validFiles = files.filter((f): f is File => f !== undefined);
    if (validFiles.length === 0) {
      showAlert('사진을 첨부해 주세요.');
      return;
    }

    // submit 시점에 파일들을 서버에 업로드 (Promise.all로 병렬 처리)
    const uploadedImageUrls: string[] = [];
    try {
      if (validFiles.length > 0) {
        // 모든 파일을 병렬로 업로드
        const uploadPromises = validFiles.map((file) => uploadFile({ variables: { file } }));
        const results = await Promise.all(uploadPromises);

        // 업로드 결과에서 URL 추출
        for (const result of results) {
          if (result.data?.uploadFile?.url) {
            uploadedImageUrls.push(result.data.uploadFile.url);
          }
        }
      }
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      showAlert('파일 업로드에 실패했습니다.');
      return;
    }

    if (uploadedImageUrls.length === 0) {
      showAlert('파일 업로드에 실패했습니다.');
      return;
    }

    try {
      // tags를 배열로 변환 (쉼표로 구분된 문자열을 배열로)
      const tagsArray = formData.tags
        ? formData.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [];

      // 주소 정보 구성
      const travelproductAddress = {
        zipcode: formData.zipcode || undefined,
        address: formData.address || undefined,
        addressDetail: formData.addressDetail || undefined,
        lat: formData.lat ? parseFloat(formData.lat) : undefined,
        lng: formData.lng ? parseFloat(formData.lng) : undefined,
      };

      // 가격이 32-bit signed integer 범위를 초과하는지 확인
      const priceValue = Number(formData.price.replace(/,/g, ''));
      if (priceValue > 2147483647) {
        showAlert('가격은 2,147,483,647원 이하여야 합니다.');
        return;
      }

      const result = await createTravelproduct({
        variables: {
          createTravelproductInput: {
            name: formData.name,
            remarks: formData.summary, // summary -> remarks
            contents: formData.description, // description -> contents
            price: priceValue,
            images: uploadedImageUrls.length > 0 ? uploadedImageUrls : undefined,
            tags: tagsArray.length > 0 ? tagsArray : undefined,
            travelproductAddress: Object.keys(travelproductAddress).some(
              (key) => travelproductAddress[key as keyof typeof travelproductAddress] !== undefined
            )
              ? travelproductAddress
              : undefined,
          },
        },
        update: (cache, { data }) => {
          if (data?.createTravelproduct) {
            // 캐시에서 기존 목록 데이터 읽기
            const existingData = cache.readQuery<
              FetchTravelproductsQuery,
              FetchTravelproductsQueryVariables
            >({
              query: FETCH_TRAVELPRODUCTS,
              variables: {
                page: 1,
                isSoldout: false,
              },
            });

            if (existingData?.fetchTravelproducts) {
              // 새로 생성된 상품을 목록 앞에 추가
              const newProduct = {
                ...data.createTravelproduct,
                pickedCount: 0, // 새 상품이므로 초기값
                seller: null, // seller 정보는 서버에서 가져와야 하므로 null
              };

              // 캐시 업데이트: 새 상품을 배열 앞에 추가
              cache.writeQuery<FetchTravelproductsQuery, FetchTravelproductsQueryVariables>({
                query: FETCH_TRAVELPRODUCTS,
                variables: {
                  page: 1,
                  isSoldout: false,
                },
                data: {
                  fetchTravelproducts: [newProduct, ...existingData.fetchTravelproducts],
                },
              });
            }
          }
        },
      });

      if (result.data?.createTravelproduct) {
        showAlert('숙박권이 등록되었습니다.');
        router.push('/accommodation-main');
      }
    } catch (error) {
      console.error('여행 상품 등록 실패:', error);
      showAlert('여행 상품 등록에 실패했습니다.');
    }
  });

  const onClickUpdate = handleSubmit(async (data) => {
    const formData = data as IUpdateSellSchema;

    if (!params?.id || typeof params.id !== 'string') {
      showAlert('상품 ID를 찾을 수 없습니다.');
      return;
    }

    // 수정 모드에서는 새 파일이 있을 때만 업로드, 없으면 기존 이미지 사용 (순서 유지)
    const finalImageUrls: (string | null)[] = Array(imageUrls.length).fill(null);
    let filteredUrls: string[] = [];

    try {
      // 업로드가 필요한 파일들만 필터링
      const filesToUpload: Array<{ index: number; file: File }> = [];

      for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];
        const file = files[i];

        if (file) {
          // 새 파일이 선택된 경우 업로드 목록에 추가
          filesToUpload.push({ index: i, file });
        } else if (imageUrl && !imageUrl.startsWith('data:') && !imageUrl.startsWith('blob:')) {
          // 기존 서버 URL인 경우 그대로 사용
          finalImageUrls[i] = imageUrl;
        }
      }

      // 새 파일들을 병렬로 업로드
      if (filesToUpload.length > 0) {
        const uploadPromises = filesToUpload.map(({ file }) => uploadFile({ variables: { file } }));
        const uploadResults = await Promise.all(uploadPromises);

        // 업로드 결과를 원래 인덱스 위치에 저장 (순서 유지)
        filesToUpload.forEach(({ index }, i) => {
          const result = uploadResults[i];
          if (result.data?.uploadFile?.url) {
            finalImageUrls[index] = result.data.uploadFile.url;
          }
        });
      }

      // null 값 제거하여 최종 배열 생성
      filteredUrls = finalImageUrls.filter((url): url is string => url !== null);
      if (filteredUrls.length === 0) {
        showAlert('사진을 첨부해 주세요.');
        return;
      }
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      showAlert('파일 업로드에 실패했습니다.');
      return;
    }

    try {
      // tags를 배열로 변환 (쉼표로 구분된 문자열을 배열로)
      const tagsArray = formData.tags
        ? formData.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [];

      // 주소 정보 구성
      const travelproductAddress = {
        zipcode: formData.zipcode || undefined,
        address: formData.address || undefined,
        addressDetail: formData.addressDetail || undefined,
        lat: formData.lat ? parseFloat(formData.lat) : undefined,
        lng: formData.lng ? parseFloat(formData.lng) : undefined,
      };

      // 가격이 32-bit signed integer 범위를 초과하는지 확인
      const priceValue = Number(formData.price.replace(/,/g, ''));
      if (priceValue > 2147483647) {
        showAlert('가격은 2,147,483,647원 이하여야 합니다.');
        return;
      }

      const result = await updateTravelproduct({
        variables: {
          travelproductId: params.id,
          updateTravelproductInput: {
            name: formData.name,
            remarks: formData.summary, // summary -> remarks
            contents: formData.description, // description -> contents
            price: priceValue,
            images: filteredUrls.length > 0 ? filteredUrls : undefined,
            tags: tagsArray.length > 0 ? tagsArray : undefined,
            travelproductAddress: Object.keys(travelproductAddress).some(
              (key) => travelproductAddress[key as keyof typeof travelproductAddress] !== undefined
            )
              ? travelproductAddress
              : undefined,
          },
        },
      });

      if (result.data?.updateTravelproduct) {
        showAlert('숙박권이 수정되었습니다.');
        router.push(`/accommodation-main/detail/${params.id}`);
      }
    } catch (error) {
      console.error('여행 상품 수정 실패:', error);
      showAlert('여행 상품 수정에 실패했습니다.');
    }
  });

  const onClickImage = (index: number) => {
    fileRefs.current[index]?.click();
  };

  const checkValidationFile = (file?: File) => {
    if (typeof file === 'undefined') {
      showAlert('파일을 선택해 주세요.');
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      showAlert('파일 용량 제한을 초과했습니다.(5MB)');
      return false;
    }

    if (!file.type.includes('jpeg') && !file.type.includes('png')) {
      showAlert('jpeg 또는 png 파일만 업로드 가능합니다.');
      return false;
    }
    return true;
  };

  const onChangeFile = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const isValid = checkValidationFile(file);
    if (!isValid) {
      // 파일 입력 초기화
      if (event.target) event.target.value = '';
      return;
    }

    if (!file) return;

    // FileReader를 사용하여 미리보기용 임시 URL 생성 (base64)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        // 미리보기용 임시 URL (base64)로 설정
        setImageUrls((prev) => {
          const newUrls = [...prev];
          if (index < 8) {
            newUrls[index] = event.target?.result as string;
          }
          return newUrls;
        });
        setFiles((prev) => {
          const newFiles = [...prev];
          if (index < 8) {
            newFiles[index] = file;
          }
          return newFiles;
        });
      }
    };
    fileReader.onerror = () => {
      showAlert('파일을 읽는 중 오류가 발생했습니다.');
      if (event.target) event.target.value = '';
    };
  };

  const deleteImage = (index: number) => {
    if (index >= 8) return;
    setImageUrls((prev) => {
      const newUrls = [...prev];
      newUrls[index] = '';
      return newUrls;
    });
    setFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = undefined;
      return newFiles;
    });
    if (fileRefs.current[index]) {
      fileRefs.current[index]!.value = '';
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  interface DaumPostcodeData {
    zonecode: string;
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
  }

  const handleComplete = (data: DaumPostcodeData) => {
    setZipcode(data.zonecode);
    setAddress(data.address);
    setValue('zipcode', data.zonecode);
    setValue('address', data.address);
    setIsModalOpen(false);
  };

  const error: Errors = {
    name: formErrors.name?.message,
    summary: formErrors.summary?.message,
    description: formErrors.description?.message,
    price: formErrors.price?.message,
    tags: formErrors.tags?.message,
    zipcode: formErrors.zipcode?.message,
    address: formErrors.address?.message,
    addressDetail: formErrors.addressDetail?.message,
    lat: formErrors.lat?.message,
    lng: formErrors.lng?.message,
  };

  return {
    register,
    onClickSubmit,
    onClickUpdate,
    onClickImage,
    onChangeFile,
    deleteImage,
    error,
    isValid,
    imageUrls,
    zipcode,
    address,
    setValue,
    isModalOpen,
    showModal,
    handleOk,
    handleCancel,
    handleComplete,
    fileRefs,
    price,
    handlePriceChange,
    AlertModalComponent,
  };
}
