import { useRouter, useParams } from 'next/navigation';
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { UPLOAD_FILE } from '@/components/boards-write/queries';
import { CREATE_TRAVELPRODUCT, UPDATE_TRAVELPRODUCT } from './queries';
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

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(props.data?.imageUrl || '');
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

    if (!imageUrl) {
      showAlert('사진을 첨부해 주세요.');
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

      const result = await createTravelproduct({
        variables: {
          createTravelproductInput: {
            name: formData.name,
            remarks: formData.summary, // summary -> remarks
            contents: formData.description, // description -> contents
            price: Number(formData.price.replace(/,/g, '')),
            images: imageUrl ? [imageUrl] : undefined,
            tags: tagsArray.length > 0 ? tagsArray : undefined,
            travelproductAddress: Object.keys(travelproductAddress).some(
              (key) => travelproductAddress[key as keyof typeof travelproductAddress] !== undefined
            )
              ? travelproductAddress
              : undefined,
          },
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

      const result = await updateTravelproduct({
        variables: {
          travelproductId: params.id,
          updateTravelproductInput: {
            name: formData.name,
            remarks: formData.summary, // summary -> remarks
            contents: formData.description, // description -> contents
            price: Number(formData.price.replace(/,/g, '')),
            images: imageUrl ? [imageUrl] : undefined,
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

  const onClickImage = () => {
    fileRef.current?.click();
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

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const isValid = checkValidationFile(file);
    if (!isValid) return;

    try {
      const result = await uploadFile({ variables: { file } });
      const url = result.data?.uploadFile?.url ?? '';
      setImageUrl(url);
      event.target.value = '';
    } catch (error) {
      console.error(error);
      showAlert('파일 업로드에 실패했습니다.');
    }
  };

  const deleteImage = () => {
    setImageUrl('');
    if (fileRef.current) fileRef.current.value = '';
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
    imageUrl,
    zipcode,
    address,
    setValue,
    isModalOpen,
    showModal,
    handleOk,
    handleCancel,
    handleComplete,
    fileRef,
    price,
    handlePriceChange,
    AlertModalComponent,
  };
}
