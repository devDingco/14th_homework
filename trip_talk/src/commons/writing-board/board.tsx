'use client';

import './board.css';
import React, { useState, useRef, ChangeEvent, FormEvent, MouseEvent, useEffect } from 'react';
import TextInput from '@/commons/text-input/text-input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DaumPostcode, { useDaumPostcodePopup } from 'react-daum-postcode';
import { useCreateBoard, useUpdateBoard, useUploadFile, useUploadFiles, useGetBoard } from '@/hooks/useGraphQL';
import PasswordModal from '@/components/modal/passwordModal';

const scriptUrl = `https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`;

interface PostcodeData {
  zonecode: string;
  roadAddress: string;
}

interface BoardProps {
  type: 'new' | 'edit';
  boardId?: string;
}

export default function Board({ type, boardId }: BoardProps) {
  const router = useRouter();
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postCode, setPostCode] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [images, setImages] = useState<{ file: File | null; url: string }[]>([
    { file: null, url: '' },
    { file: null, url: '' },
    { file: null, url: '' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const open = useDaumPostcodePopup(scriptUrl);
  const [createBoard] = useCreateBoard();
  const [updateBoard] = useUpdateBoard();
  const [uploadFile] = useUploadFile();

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);

  // 수정 모드일 때 기존 데이터 로딩
  const { data: boardData, loading: boardLoading } = useGetBoard(boardId || '');

  // 수정 모드일 때 기존 데이터로 초기화
  useEffect(() => {
    if (type === 'edit' && boardId && boardData?.fetchBoard) {
      const board = boardData.fetchBoard;
      setAuthor(board.writer);
      setTitle(board.title);
      setContent(board.contents);
      setVideoUrl(board.youtubeUrl || '');

      // 기존 이미지들을 순서대로 배치
      const existingImages = board.images || [];
      setImages((prev) =>
        prev.map((img, index) => ({
          file: null,
          url: existingImages[index] || '',
        }))
      );

      if (board.boardAddress) {
        setPostCode(board.boardAddress.zipcode || '');
        setAddress(board.boardAddress.address || '');
        setAddressDetail(board.boardAddress.addressDetail || '');
      }
    }
  }, [type, boardId, boardData]);

  // 필수 필드가 모두 채워졌는지 확인 (수정 모드에서는 비밀번호가 선택사항)
  const isFormValid =
    type === 'new'
      ? author.trim() !== '' && password.trim() !== '' && title.trim() !== '' && content.trim() !== ''
      : title.trim() !== '' && content.trim() !== '';

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      setImages((prev) => prev.map((img, i) => (i === index ? { file, url: '' } : img)));
    }
  };

  const triggerFileInput = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.map((img, i) => (i === index ? { file: null, url: '' } : img)));
  };

  // 이미지 URL을 절대 URL로 변환하는 함수
  const getImageUrl = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
      return url;
    }
    // 상대 경로인 경우 절대 URL로 변환
    return `https://storage.googleapis.com/${url}`;
  };

  const handlePostCode = () => {
    open({
      onComplete: (data: PostcodeData) => {
        setPostCode(data.zonecode);
        setAddress(data.roadAddress);
      },
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === 'new' && (!author || !password || !content || !title)) return;
    if (type === 'edit' && (!content || !title)) return;
    if (isSubmitting) return;

    // 수정 모드일 때는 비밀번호 모달을 띄움
    if (type === 'edit') {
      setShowPasswordModal(true);
      return;
    }

    // 새 게시글 등록은 바로 진행
    try {
      await executeSubmit();
    } catch (error: any) {
      if (error.message !== '이미지 업로드 취소') {
        alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  // 이미지 업로드 처리
  const uploadImages = async () => {
    const uploadedUrls: string[] = [];
    let hasError = false;

    for (let i = 0; i < images.length; i++) {
      const imageData = images[i];
      if (imageData.file) {
        try {
          const result = await uploadFile({ variables: { file: imageData.file } });
          if (result.data?.uploadFile?.url) {
            uploadedUrls.push(result.data.uploadFile.url);
          } else {
            hasError = true;
          }
        } catch (error) {
          hasError = true;
        }
      } else if (imageData.url) {
        // 기존 이미지 URL 유지
        uploadedUrls.push(imageData.url);
      }
    }

    if (hasError) {
      const shouldContinue = confirm('일부 이미지 업로드에 실패했습니다. 계속 진행하시겠습니까?');
      if (!shouldContinue) throw new Error('이미지 업로드 취소');
    }

    return uploadedUrls;
  };

  // 게시글 데이터 생성
  const createBoardData = (imageUrls: string[]) => ({
    title,
    contents: content,
    images: imageUrls,
    youtubeUrl: videoUrl || undefined,
    boardAddress:
      postCode || address || addressDetail
        ? {
            zipcode: postCode || undefined,
            address: address || undefined,
            addressDetail: addressDetail || undefined,
          }
        : undefined,
  });

  // 새 게시글 생성
  const createNewBoard = async (imageUrls: string[]) => {
    const createBoardInput = {
      writer: author,
      password: password,
      ...createBoardData(imageUrls),
    };

    const result = await createBoard({ variables: { createBoardInput } });
    if (result.data?.createBoard) {
      alert('게시글이 성공적으로 등록되었습니다.');
      router.push('/');
    }
  };

  // 게시글 수정
  const updateExistingBoard = async (imageUrls: string[], editPassword: string) => {
    const updateBoardInput = createBoardData(imageUrls);

    const result = await updateBoard({
      variables: {
        boardId: boardId!,
        password: editPassword,
        updateBoardInput,
      },
    });

    // GraphQL 에러가 있는지 확인
    if (result.errors && result.errors.length > 0) {
      const error = new Error(result.errors[0].message);
      throw error;
    }

    if (result.data?.updateBoard) {
      alert('게시글이 성공적으로 수정되었습니다.');
      router.push(`/board/${boardId}`);
    }
  };

  // 메인 실행 함수
  const executeSubmit = async (editPassword?: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const imageUrls = await uploadImages();

      if (type === 'new') {
        await createNewBoard(imageUrls);
      } else {
        await updateExistingBoard(imageUrls, editPassword!);
      }
    } catch (error: any) {
      // 이미지 업로드 취소가 아닌 경우에만 에러를 다시 던짐
      if (error.message !== '이미지 업로드 취소') {
        throw error; // 에러를 다시 던져서 handlePasswordConfirm에서 처리
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordConfirm = async (inputPassword: string) => {
    setPasswordError('');

    try {
      await executeSubmit(inputPassword);
      // 성공했을 때만 모달 닫기
      setShowPasswordModal(false);
    } catch (error: any) {
      // GraphQL 에러 메시지 추출
      const errorMessage = error.message || error.graphQLErrors?.[0]?.message || '';

      // 비밀번호 오류인 경우 모달을 열린 상태로 유지하고 에러 메시지 표시
      if (errorMessage.includes('비밀번호') || errorMessage.includes('password') || errorMessage.includes('Password')) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        // 다른 에러인 경우 모달 닫고 일반 에러 처리
        setShowPasswordModal(false);
        alert('게시글 수정에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    setPasswordError('');
    setIsSubmitting(false);
  };

  // 로딩 중일 때 표시
  if (type === 'edit' && boardLoading) {
    return (
      <div className="container">
        <div className="board_title b_20_28">게시물 수정</div>
        <div style={{ textAlign: 'center', padding: '40px 0' }}>로딩 중...</div>
      </div>
    );
  }

  // 수정 모드에서 데이터가 없을 때
  if (type === 'edit' && !boardLoading && !boardData?.fetchBoard) {
    return (
      <div className="container">
        <div className="board_title b_20_28">게시물 수정</div>
        <div style={{ textAlign: 'center', padding: '40px 0' }}>게시물을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="container board_wrapper">
      <div className="board_title b_20_28">{type === 'new' ? '게시물 등록' : '게시물 수정'}</div>
      <form className="board_form" onSubmit={handleSubmit}>
        <div className="board_form_input_wrapper">
          <div className="board_form_input_item">
            <div className="board_form_input_item_title">
              <label className="board_form_label me_16_24">
                작성자 <span>*</span>
              </label>
            </div>
            <input
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={type === 'edit'}
              className={`text_input ${type === 'edit' && 'disabled'} r_16_24`}
            />
          </div>
          <div className="board_form_input_item">
            <div className="board_form_input_item_title">
              <label className="board_form_label me_16_24">
                비밀번호 <span>*</span>
              </label>
            </div>
            <input
              placeholder="비밀번호를 입력해 주세요."
              value={type === 'edit' ? '********' : password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={type === 'edit'}
              className={`text_input ${type === 'edit' && 'disabled'} r_16_24`}
            />
          </div>
        </div>
        <div className="board_form_input_wrapper">
          <div className="board_form_input_item">
            <div className="board_form_input_item_title">
              <label className="board_form_label me_16_24">
                제목<span>*</span>
              </label>
            </div>
            <TextInput placeholder="제목을 입력해 주세요." value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>
        <div className="board_form_input_wrapper">
          <div className="board_form_input_item">
            <div className="board_form_input_item_title">
              <label className="board_form_label me_16_24">
                내용<span>*</span>
              </label>
            </div>
            <textarea
              className="board_form_textarea"
              placeholder="내용을 입력해 주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <div className="board_form_input_wrapper">
          <div className="board_form_input_item">
            <div className="board_form_input_item_title">
              <label className="board_form_label me_16_24">주소</label>
            </div>
            <div className="board_postCode_wrapper">
              <input
                type="text"
                placeholder="01234"
                className="board_postCode_input"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
              />
              <button type="button" className="board_postCode_button sb_18_24" onClick={handlePostCode}>
                우편번호 검색
              </button>
            </div>
            <TextInput
              placeholder="주소를 입력해 주세요."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextInput
              placeholder="상세주소"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
            />
          </div>
        </div>
        <div className="board_form_input_wrapper">
          <div className="board_form_input_item">
            <div className="board_form_input_item_title">
              <label className="board_form_label me_16_24">유튜브 링크</label>
            </div>
            <TextInput
              placeholder="링크를 입력해 주세요."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
        </div>
        <div className="board_form_input_item">
          <div className="board_form_input_item_title">
            <label className="board_form_label me_16_24">사진 첨부</label>
          </div>
          <div className="board_form_photo_wrapper_section">
            {images.map((imageData, index) => (
              <div key={index}>
                <input
                  type="file"
                  ref={index === 0 ? fileInputRef1 : index === 1 ? fileInputRef2 : fileInputRef3}
                  className="board_form_file_input"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, index)}
                />
                <div
                  className="board_form_photo_wrapper"
                  onClick={() =>
                    triggerFileInput(index === 0 ? fileInputRef1 : index === 1 ? fileInputRef2 : fileInputRef3)
                  }
                >
                  {imageData.file || imageData.url ? (
                    <>
                      <Image
                        src={imageData.file ? URL.createObjectURL(imageData.file) : getImageUrl(imageData.url)}
                        alt={`업로드된 이미지 ${index + 1}`}
                        width={160}
                        height={160}
                        className="board_form_photo_preview"
                      />
                      <button
                        type="button"
                        className="board_form_photo_remove"
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                      >
                        <Image src={'/icons/close.png'} alt="photo" width={16} height={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <Image src={'/icons/add.png'} alt="photo" width={40} height={40} />
                      <div className="board_form_photo_text r_16_24">클릭해서 사진 업로드</div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="board_form_button_wrapper">
          <div className="board_form_button cancel sb_18_24" onClick={() => router.back()}>
            취소
          </div>
          <button type="submit" className="board_form_button sb_18_24" disabled={!isFormValid || isSubmitting}>
            {isSubmitting ? (type === 'new' ? '등록 중...' : '수정 중...') : type === 'new' ? '등록하기' : '수정하기'}
          </button>
        </div>
      </form>

      {/* 비밀번호 확인 모달 */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={handlePasswordModalClose}
        onConfirm={handlePasswordConfirm}
        isLoading={isSubmitting}
        error={passwordError}
      />
    </div>
  );
}
