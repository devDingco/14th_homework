import { useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { UPDATE_BOARD, FETCH_BOARD, UPLOAD_FILE } from './queries';
import { FetchBoardQuery, FetchBoardQueryVariables } from '@/commons/graphql/graphql';
import { Errors, BoardVariables } from './types';
import { useAlertModal } from '@/commons/components/modal';
import {
  CreateBoardDocument,
  CreateBoardMutation,
  CreateBoardMutationVariables,
} from '@/commons/graphql/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { ISchema, IUpdateSchema, schema, updateSchema } from './schema';

interface BoardAddressInput {
  zipcode?: string;
  address?: string;
  addressDetail?: string;
}

interface CreateBoardInputType {
  writer: string;
  title: string;
  contents: string;
  password: string;
  images: string[];
  youtubeUrl?: string;
  boardAddress?: BoardAddressInput;
}

interface UpdateBoardInputType {
  title: string;
  contents: string;
  images?: string[];
  youtubeUrl?: string;
  boardAddress?: BoardAddressInput;
}

export default function useBoardsWriteAdvanced(props: BoardVariables) {
  const router = useRouter();
  const params = useParams();
  const { showAlert, AlertModalComponent } = useAlertModal();

  // react-hook-form 설정 - 등록/수정 모드에 따라 다른 스키마 사용
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValid },
    watch,
    setValue,
    getValues,
  } = useForm<ISchema | IUpdateSchema>({
    resolver: zodResolver(props.isEdit ? updateSchema : schema),
    mode: 'onChange',
    defaultValues: {
      writer: props.data?.fetchBoard?.writer || '',
      password: '',
      title: props.data?.fetchBoard?.title || '',
      contents: props.data?.fetchBoard?.contents || '',
      addressDetail: (() => {
        const board = props.data?.fetchBoard as Record<string, unknown> | undefined;
        const addr = board?.boardAddress as BoardAddressInput | undefined;
        return addr?.addressDetail || '';
      })(),
      youtubeUrl: (() => {
        const board = props.data?.fetchBoard as Record<string, unknown> | undefined;
        return (board?.youtubeUrl as string | undefined) || '';
      })(),
    },
  });

  const fileRef = useRef<(HTMLInputElement | null)[]>([]);
  const setFileRef = (index: number) => (el: HTMLInputElement | null) => {
    fileRef.current[index] = el;
  };

  const [imageUrl, setImageUrl] = useState<string[]>(() => {
    const board = props.data?.fetchBoard as Record<string, unknown> | undefined;
    const imageData = board?.images ?? [];
    if (Array.isArray(imageData) && imageData.length) {
      const slots = ['', '', ''];
      for (let i = 0; i < Math.min(3, imageData.length); i++) {
        slots[i] = (imageData[i] as string) ?? '';
      }
      return slots;
    }
    return ['', '', ''];
  });

  // FileReader를 사용하기 위한 파일 저장 state
  const [files, setFiles] = useState<(File | undefined)[]>(['', '', ''].map(() => undefined));

  const [uploadFile] = useMutation(UPLOAD_FILE);

  const board = props.data?.fetchBoard as Record<string, unknown> | undefined;
  const boardAddress = board?.boardAddress as BoardAddressInput | undefined;

  const [zipcode, setZipcode] = useState<string>(boardAddress?.zipcode || '');
  const [address, setAddress] = useState<string>(boardAddress?.address || '');

  // 데이터가 로드된 후 state 업데이트
  useEffect(() => {
    if (props.data?.fetchBoard) {
      const fetchedBoard = props.data.fetchBoard as Record<string, unknown>;
      console.log('데이터 로드됨:', fetchedBoard);

      const fetchedBoardAddress = fetchedBoard.boardAddress as BoardAddressInput | undefined;
      if (fetchedBoardAddress) {
        setZipcode(fetchedBoardAddress.zipcode || '');
        setAddress(fetchedBoardAddress.address || '');
        setValue('addressDetail', fetchedBoardAddress.addressDetail || '');
      }

      if (fetchedBoard.youtubeUrl) {
        setValue('youtubeUrl', fetchedBoard.youtubeUrl as string);
      }

      setValue('writer', (fetchedBoard.writer as string) || '');
      setValue('title', (fetchedBoard.title as string) || '');
      setValue('contents', (fetchedBoard.contents as string) || '');
    }
  }, [props.data, setValue]);

  const [CreateBoardApiRequire] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(
    CreateBoardDocument
  );

  const onClickSubmit = handleSubmit(async (data) => {
    // 등록 모드에서만 호출되므로 ISchema 타입으로 간주
    const formData = data as ISchema;

    // submit 시점에 파일들을 서버에 업로드 (Promise.all로 병렬 처리)
    const uploadedImageUrls: string[] = [];
    try {
      const validFiles = files.filter((f): f is File => f !== undefined);
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

    // 주소 정보가 모두 비어있으면 boardAddress를 보내지 않음
    const createBoardInput: CreateBoardInputType = {
      writer: formData.writer,
      title: formData.title,
      contents: formData.contents,
      password: formData.password,
      images: uploadedImageUrls,
    };

    // 유튜브 URL이 있으면 추가
    if (formData.youtubeUrl && formData.youtubeUrl.trim()) {
      createBoardInput.youtubeUrl = formData.youtubeUrl;
    }

    // 주소 정보가 하나라도 있으면 boardAddress 추가
    if (zipcode || address || formData.addressDetail) {
      createBoardInput.boardAddress = {};
      if (zipcode) createBoardInput.boardAddress.zipcode = zipcode;
      if (address) createBoardInput.boardAddress.address = address;
      if (formData.addressDetail)
        createBoardInput.boardAddress.addressDetail = formData.addressDetail;
    }

    try {
      const result = await CreateBoardApiRequire({
        variables: {
          createBoardInput,
        },
      });
      router.push(`/boards/${result.data?.createBoard?._id}`);
    } catch (error) {
      console.error(error);
      showAlert('게시글 등록에 실패했습니다.');
    }
  });

  // 게시글수정API요청함수
  const [boardUpdateApiRequire] = useMutation(UPDATE_BOARD);

  const onclickUpdate = handleSubmit(async (data) => {
    // 수정 모드에서 호출되므로 IUpdateSchema 타입으로 간주
    const formData = data as IUpdateSchema;

    // 비밀번호 검증
    const checkPassword = prompt('비밀번호를 입력해주세요');
    if (!checkPassword) {
      showAlert('비밀번호를 입력해주세요.');
      return;
    }

    const updateBoardInput: UpdateBoardInputType = {
      title: '',
      contents: '',
    };

    const fetchedBoard = props.data?.fetchBoard as Record<string, unknown> | undefined;
    const fetchedBoardAddress = fetchedBoard?.boardAddress as BoardAddressInput | undefined;

    // 현재 값 또는 기존 값 사용
    updateBoardInput.title =
      formData.title.trim() || (fetchedBoard?.title as string | undefined) || '';
    updateBoardInput.contents =
      formData.contents.trim() || (fetchedBoard?.contents as string | undefined) || '';

    // 이미지 처리: 새 파일이 있으면 업로드, 없으면 기존 URL 사용 (순서 유지)
    const finalImageUrls: (string | null)[] = Array(imageUrl.length).fill(null);
    try {
      // 업로드가 필요한 파일들만 필터링
      const filesToUpload: Array<{ index: number; file: File }> = [];

      for (let i = 0; i < imageUrl.length; i++) {
        const imageUrlItem = imageUrl[i];
        const file = files[i];

        if (file) {
          // 새 파일이 선택된 경우 업로드 목록에 추가
          filesToUpload.push({ index: i, file });
        } else if (
          imageUrlItem &&
          !imageUrlItem.startsWith('data:') &&
          !imageUrlItem.startsWith('blob:')
        ) {
          // 기존 서버 URL인 경우 그대로 사용
          finalImageUrls[i] = imageUrlItem;
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
      const filteredUrls = finalImageUrls.filter((url): url is string => url !== null);
      if (filteredUrls.length > 0) {
        updateBoardInput.images = filteredUrls;
      }
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      showAlert('파일 업로드에 실패했습니다.');
      return;
    }

    // 유튜브 URL 처리
    const currentYoutubeUrl =
      formData.youtubeUrl || (fetchedBoard?.youtubeUrl as string | undefined) || '';
    if (currentYoutubeUrl.trim()) {
      updateBoardInput.youtubeUrl = currentYoutubeUrl;
    }

    // 주소 정보 처리
    const currentZipcode = zipcode || fetchedBoardAddress?.zipcode || '';
    const currentAddress = address || fetchedBoardAddress?.address || '';
    const currentAddressDetail = formData.addressDetail || fetchedBoardAddress?.addressDetail || '';

    if (currentZipcode || currentAddress || currentAddressDetail) {
      updateBoardInput.boardAddress = {};
      if (currentZipcode) updateBoardInput.boardAddress.zipcode = currentZipcode;
      if (currentAddress) updateBoardInput.boardAddress.address = currentAddress;
      if (currentAddressDetail) updateBoardInput.boardAddress.addressDetail = currentAddressDetail;
    }

    try {
      await boardUpdateApiRequire({
        variables: {
          updateBoardInput,
          password: checkPassword,
          boardId: params.boardId,
        },
        update: (cache, { data }) => {
          if (data?.updateBoard) {
            // 캐시에서 기존 데이터 읽기
            const existingData = cache.readQuery<FetchBoardQuery, FetchBoardQueryVariables>({
              query: FETCH_BOARD,
              variables: { boardId: String(params.boardId) },
            });

            if (existingData?.fetchBoard) {
              // 캐시 업데이트: mutation 응답과 기존 데이터를 병합
              cache.writeQuery<FetchBoardQuery, FetchBoardQueryVariables>({
                query: FETCH_BOARD,
                variables: { boardId: String(params.boardId) },
                data: {
                  fetchBoard: {
                    ...existingData.fetchBoard,
                    ...data.updateBoard,
                    // createdAt은 mutation 응답에 없으므로 기존 값 유지
                    createdAt: existingData.fetchBoard.createdAt,
                  },
                },
              });
            }
          }
        },
      });

      showAlert('게시글이 수정되었습니다.');
      router.push(`/boards/${params.boardId}`);
    } catch (error) {
      console.error(error);
      showAlert('비밀번호가 일치하지 않습니다!');
    }
  });

  // react-hook-form의 에러를 기존 형식으로 변환
  const error: Errors = {
    writer: formErrors.writer?.message,
    password: formErrors.password?.message,
    title: formErrors.title?.message,
    contents: formErrors.contents?.message,
    youtubeUrl: formErrors.youtubeUrl?.message,
  };

  const onClickImage = (index: number) => () => {
    // fileRef.current?.click();
    // console.log(fileRef.current[index])
    fileRef.current[index]?.click();
  };

  // 이미지 크기 Validation
  const checkValidationFile = (file?: File) => {
    if (typeof file === 'undefined') {
      alert('파일 없음');
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('파일 용량 제한을 초과했습니다.(5MB)');
      return false;
    }

    if (!file.type.includes('jpeg') && !file.type.includes('png')) {
      alert('jpeg 또는 png 파일만 업로드 가능');
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
    fileReader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        // 미리보기용 임시 URL (base64)로 설정
        setImageUrl((prev) => {
          const next = [...prev];
          if (index < 3) {
            next[index] = e.target?.result as string;
          }
          return next;
        });
        setFiles((prev) => {
          const next = [...prev];
          if (index < 3) {
            next[index] = file;
          }
          return next;
        });
      }
    };
    fileReader.onerror = () => {
      showAlert('파일을 읽는 중 오류가 발생했습니다.');
      if (event.target) event.target.value = '';
    };
  };

  const deleteImage = (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImageUrl((prev) => {
      const next = [...prev];
      next[index] = '';
      return next;
    });
    setFiles((prev) => {
      const next = [...prev];
      next[index] = undefined;
      return next;
    });
    const input = fileRef.current[index];
    if (input) input.value = '';
  };

  // react-hook-form의 isValid를 활용한 간단한 검증
  const checkRegister = (): boolean => {
    // Zod 스키마 검증 결과를 기반으로 판단
    return isValid;
  };

  //    const checkSubmit = [writer, password, title, content].every((v) => v.trim().length > 0);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    console.log(data);
    setZipcode(data.zonecode);
    setAddress(data.address);
    setIsModalOpen(false);
  };

  return {
    setFileRef,
    imageUrl,
    register,
    onClickImage,
    onChangeFile,
    deleteImage,
    onclickUpdate,
    onClickSubmit,
    error,
    checkRegister,
    isModalOpen,
    showModal,
    handleOk,
    handleCancel,
    handleComplete,
    zipcode,
    address,
    AlertModalComponent,
  };
}
