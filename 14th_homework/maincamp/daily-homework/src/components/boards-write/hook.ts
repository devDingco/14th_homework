import { useMutation, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useState, useEffect, useMemo, useRef } from 'react';

import { CREATE_BOARD, UPDATE_BOARD, FETCH_BOARD, UPLOAD_FILE } from './queries';
import { Errors, BoardVariables, FormData } from './types';
import { useAlertModal } from '@/commons/components/modal';
import {
  CreateBoardDocument,
  CreateBoardMutation,
  CreateBoardMutationVariables,
  FetchBoardDocument,
  FetchBoardQuery,
  FetchBoardQueryVariables,
} from '@/commons/graphql/graphql';

export default function useBoardsWriteAdvanced(props: BoardVariables) {
  const router = useRouter();
  const params = useParams();
  const { showAlert, AlertModalComponent } = useAlertModal();

  // 통합 state
  const [formData, setFormData] = useState<FormData>({
    writer: props.data?.fetchBoard?.writer || '',
    title: props.data?.fetchBoard?.title || '',
    contents: props.data?.fetchBoard?.contents || '',
  });

  const fileRef = useRef<(HTMLInputElement | null)[]>([]);
  const setFileRef = (index: number) => (el: HTMLInputElement | null) => {
    fileRef.current[index] = el;
  };

  const [imageUrl, setImageUrl] = useState<string[]>(() => {
    const imageData = (props.data?.fetchBoard as any)?.images ?? [];
    if (Array.isArray(imageData) && imageData.length) {
      const slots = ['', '', ''];
      for (let i = 0; i < Math.min(3, imageData.length); i++) {
        slots[i] = imageData[i] ?? '';
      }
      return slots;
    }
    return ['', '', ''];
  });

  const [uploadFile] = useMutation(UPLOAD_FILE);

  const [password, setPassword] = useState<string>('');

  const [zipcode, setZipcode] = useState<string>(
    (props.data?.fetchBoard as any)?.boardAddress?.zipcode || ''
  );
  const [address, setAddress] = useState<string>(
    (props.data?.fetchBoard as any)?.boardAddress?.address || ''
  );
  const [addressDetail, setAddressDetail] = useState<string>(
    (props.data?.fetchBoard as any)?.boardAddress?.addressDetail || ''
  );

  const [youtubeUrl, setYoutubeUrl] = useState<string>(
    (props.data?.fetchBoard as any)?.youtubeUrl || ''
  );

  // 데이터가 로드된 후 state 업데이트
  useEffect(() => {
    if (props.data?.fetchBoard) {
      const board = props.data.fetchBoard as any;
      console.log('데이터 로드됨:', board);

      if (board.boardAddress) {
        setZipcode(board.boardAddress.zipcode || '');
        setAddress(board.boardAddress.address || '');
        setAddressDetail(board.boardAddress.addressDetail || '');
      }

      if (board.youtubeUrl) {
        setYoutubeUrl(board.youtubeUrl);
      }
    }
  }, [props.data]);

  const [CreateBoardApiRequire] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(
    CreateBoardDocument
  );

  const onClickSubmit = async () => {
    if (!checkRegister()) {
      return;
    }
    // 주소 정보가 모두 비어있으면 boardAddress를 보내지 않음
    const createBoardInput: any = {
      writer: formData.writer,
      title: formData.title,
      contents: formData.contents,
      password,
      images: imageUrl,
    };

    // 유튜브 URL이 있으면 추가
    if (youtubeUrl.trim()) {
      createBoardInput.youtubeUrl = youtubeUrl;
    }

    // 주소 정보가 하나라도 있으면 boardAddress 추가
    if (zipcode || address || addressDetail) {
      createBoardInput.boardAddress = {};
      if (zipcode) createBoardInput.boardAddress.zipcode = zipcode;
      if (address) createBoardInput.boardAddress.address = address;
      if (addressDetail) createBoardInput.boardAddress.addressDetail = addressDetail;
    }

    const result = await CreateBoardApiRequire({
      variables: {
        createBoardInput,
      },
    });
    // console.log(result);
    router.push(`/boards/${result.data?.createBoard?._id}`);
  };

  // 게시글수정API요청함수
  const [boardReviseApiRequire] = useMutation(UPDATE_BOARD);

  const onclickUpdate = async () => {
    // 필수 입력값 검증
    if (!checkRegister()) {
      return;
    }

    // 비밀번호 검증
    const checkPassword = prompt('비밀번호를 입력해주세요');
    if (!checkPassword) {
      showAlert('비밀번호를 입력해주세요.');
      return;
    }

    const updateBoardInput: {
      title: string;
      contents: string;
      images?: string[];
      youtubeUrl?: string;
      boardAddress?: {
        zipcode?: string;
        address?: string;
        addressDetail?: string;
      };
    } = {
      title: '',
      contents: '',
    };

    // 현재 값 또는 기존 값 사용
    updateBoardInput.title = formData.title.trim() || props.data?.fetchBoard?.title || '';
    updateBoardInput.contents = formData.contents.trim() || props.data?.fetchBoard?.contents || '';

    // 이미지 처리 
    const currentImages = imageUrl.filter((img) => img.trim() !== '');
    if (currentImages.length > 0) {
      updateBoardInput.images = currentImages;
    }

    // 유튜브 URL 처리
    const currentYoutubeUrl = youtubeUrl || (props.data?.fetchBoard as any)?.youtubeUrl || '';
    if (currentYoutubeUrl.trim()) {
      updateBoardInput.youtubeUrl = currentYoutubeUrl;
    }

    // 주소 정보 처리
    const currentZipcode = zipcode || (props.data?.fetchBoard as any)?.boardAddress?.zipcode || '';
    const currentAddress = address || (props.data?.fetchBoard as any)?.boardAddress?.address || '';
    const currentAddressDetail =
      addressDetail || (props.data?.fetchBoard as any)?.boardAddress?.addressDetail || '';

    if (currentZipcode || currentAddress || currentAddressDetail) {
      updateBoardInput.boardAddress = {};
      if (currentZipcode) updateBoardInput.boardAddress.zipcode = currentZipcode;
      if (currentAddress) updateBoardInput.boardAddress.address = currentAddress;
      if (currentAddressDetail) updateBoardInput.boardAddress.addressDetail = currentAddressDetail;
    }

    try {
      const result = await boardReviseApiRequire({
        variables: {
          updateBoardInput,
          password: checkPassword,
          boardId: params.boardId,
        },
        refetchQueries: [{ query: FETCH_BOARD, variables: { boardId: params.boardId } }],
      });

      showAlert('게시글이 수정되었습니다.');
      router.push(`/boards/${params.boardId}`);
    } catch (error) {
      console.error(error);
      showAlert('비밀번호가 일치하지 않습니다!');
    }
  };

  const [error, setErrors] = useState<Errors>({});

  const onChangeInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const field = event.target.id as keyof FormData;
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

    if (error[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, writer: event.target.value }));
    if (error.writer) setErrors((prev) => ({ ...prev, writer: '' }));
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, title: event.target.value }));
    if (error.title) setErrors((prev) => ({ ...prev, title: '' }));
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, contents: event.target.value }));
    if (error.contents) setErrors((prev) => ({ ...prev, contents: '' }));
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (error.password) setErrors((prev) => ({ ...prev, password: '' }));
  };

  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(event.target.value);
  };

  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
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

  const onChangeFile = (index: number) => async (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.files);
    const file = event.target.files?.[0];
    // console.log(file);
    // console.log("123123")
    const isValid = checkValidationFile(file);
    // console.log(isValid)
    if (!isValid) return;

    const result = await uploadFile({ variables: { file } });
    console.log('업로드 파일 이후 result확인: ', result.data.uploadFile.url);

    const url = result.data?.uploadFile?.url ?? '';

    setImageUrl((prev) => {
      const next = [...prev];
      next[index] = url;
      return next;
    });

    // 초기화
    event.target.value = '';
  };

  const deleteImage = (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImageUrl((prev) => {
      const next = [...prev];
      next[index] = '';
      return next;
    });
    const input = fileRef.current[index];
    if (input) input.value = '';
  };

  const checkRegister = (): boolean => {
    const e: Errors = {};
    // 수정 모드가 아닌 경우에만 작성자, 비밀번호 검증
    if (!props.isEdit) {
      if (!formData.writer.trim()) e.writer = '필수입력 사항 입니다.';
      if (!password.trim()) e.password = '필수입력 사항 입니다.';
      // 등록 모드에서는 제목과 내용도 필수
      if (!formData.title.trim()) e.title = '필수입력 사항 입니다.';
      if (!formData.contents.trim()) e.contents = '필수입력 사항 입니다.';
    } else {
      // 수정 모드에서는 기존 데이터가 있으므로 빈 값이어도 허용
      // 하지만 사용자가 입력한 값이 공백만 있다면 검증
      const currentTitle = formData.title.trim() || props.data?.fetchBoard?.title || '';
      const currentContent = formData.contents.trim() || props.data?.fetchBoard?.contents || '';

      if (!currentTitle) e.title = '필수입력 사항 입니다.';
      if (!currentContent) e.contents = '필수입력 사항 입니다.';
    }

    setErrors(e);

    const ok = Object.keys(e).length === 0;
    // if (!ok) {
    //   alert('에러가 발생하였습니다. 다시 시도해 주세요');
    // }
    return ok;
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
    formData,
    fileRef,
    setFileRef,
    imageUrl,
    onChangeInput,
    onChangeWriter,
    onChangePassword,
    onChangeTitle,
    onChangeContents,
    onChangeAddressDetail,
    onChangeYoutubeUrl,
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
    addressDetail,
    youtubeUrl,
    AlertModalComponent,
  };
}
