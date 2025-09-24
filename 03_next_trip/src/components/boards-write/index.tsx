'use client';

import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import ImageUpload from './ImageUpload';
import InputBox from '@/components/common/InputBox';
import TextAreaBox from '@/components/common/TextAreaBox';
import { FETCH_BOARD, UPDATE_BOARD } from '@/apis/graphql/board';
import { useMutation, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { getInputPassword } from '@/utils/getInputPassword';
import {
  CreateBoardDocument,
  CreateBoardMutation,
  CreateBoardMutationVariables,
} from '@/types/gql/graphql';
import PostCodeModal from '../Modal/PostCodeModal';
import { TAddress, TData } from './types';

// import CustomModal from '../Modal/CustomModal';
// import { Board } from '@/types/gql/graphql';

const initBoardFormData = {
  writer: '',
  password: '',
  title: '',
  contents: '',
  images: ['', '', ''],
  youtubeUrl: '',
  boardAddress: {
    zipcode: '',
    address: '',
    addressDetail: '',
  },
};

type TFormProps = {
  isEdit: boolean;
};
export default function BoardsWrite({ isEdit }: TFormProps) {
  const router = useRouter();
  const [boardFormData, setBoardFormData] = useState(initBoardFormData);
  const [contents, setContents] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { boardId } = useParams();

  const { data } = useQuery<TData>(FETCH_BOARD, {
    variables: {
      boardId: boardId,
    },
  });

  const onChangeBoardFormData = (e: ChangeEvent<HTMLInputElement>) => {
    setBoardFormData({
      ...boardFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeImages = (idx: number, img: string) => {
    setBoardFormData((prev) => {
      const sortedImages = prev.images.map((el, index) =>
        index === idx ? img : el,
      );
      sortedImages.sort((a, b) => b.localeCompare(a));

      return {
        ...prev,
        images: sortedImages,
      };
    });
  };
  const onRemoveImages = (idx: number) => {
    setBoardFormData((prev) => {
      const sortedImages = prev.images.map((el, index) =>
        index === idx ? '' : el,
      );
      sortedImages.sort((a, b) => b.localeCompare(a));

      return {
        ...prev,
        images: sortedImages,
      };
    });
  };

  const onInputAddress = (address: TAddress) => {
    setBoardFormData({
      ...boardFormData,
      boardAddress: {
        // 기존 값 유지
        ...boardFormData.boardAddress,

        // 새로운 값 업데이트
        ...address,
      },
    });
  };

  const [createBoard] = useMutation<
    CreateBoardMutation,
    CreateBoardMutationVariables
  >(CreateBoardDocument);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const isSubmitCheck = () => {
    //
    if (
      initBoardFormData.writer.trim() &&
      initBoardFormData.password.trim() &&
      initBoardFormData.title.trim() &&
      contents.trim()
    ) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  };

  const onChangeContents = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setContents(e.target.value);
  };

  const onEditForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const inputPassword = getInputPassword();
      const result = await updateBoard({
        variables: {
          boardId: boardId,
          password: inputPassword,
          updateBoardInput: boardFormData,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD,
            variables: { boardId: boardId },
          },
        ],
        awaitRefetchQueries: true,
      });

      router.push(`/boards/${result.data?.updateBoard?._id}`);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setBoardFormData(initBoardFormData);
      setContents('');
    }
  };
  const onInputDetailAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setBoardFormData({
      ...boardFormData,
      boardAddress: {
        ...boardFormData.boardAddress,
        addressDetail: e.target.value,
      },
    });
  };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            ...boardFormData,
          },
        },
      });

      router.push(`/boards/${result.data?.createBoard?._id}`);
    } catch (error) {
      console.log(error);
      alert('에러가 발생하였습니다. 다시 시도해 주세요.');
    } finally {
      setBoardFormData(initBoardFormData);
    }
  };

  return (
    <>
      <h1 className='text-xl font-bold'>
        {!isEdit ? '게시물 등록' : '게시물 수정'}
      </h1>

      <form
        action='#'
        onSubmit={isEdit ? onEditForm : onSubmitForm}
        className='mx-5 mb-10 mt-6'
      >
        <div className='h-full w-full flex-1'>
          <div className='flex flex-col gap-4 desktop:flex-row'>
            <InputBox
              label='작성자'
              name='writer'
              type='text'
              placeholder='작성자 명을 입력해주세요.'
              onInput={onChangeBoardFormData}
              onChange={onChangeBoardFormData}
              required
              isInput={boardFormData.writer}
              isSubmitCheck={isSubmitCheck}
              defaultValue={data?.fetchBoard.writer}
              isEdit={isEdit}
            />
            <InputBox
              label='비밀번호'
              name='password'
              type='password'
              placeholder='비밀번호를 입력해 주세요.'
              onInput={onChangeBoardFormData}
              onChange={onChangeBoardFormData}
              required
              isInput={boardFormData.password}
              isSubmitCheck={isSubmitCheck}
              defaultValue={data?.fetchBoard.password}
              isEdit={isEdit}
            />
            <hr />
            <InputBox
              label='제목'
              name='title'
              type='text'
              placeholder='제목을 입력해 주세요.'
              onInput={onChangeBoardFormData}
              onChange={onChangeBoardFormData}
              required
              isInput={boardFormData.title}
              isSubmitCheck={isSubmitCheck}
              defaultValue={data?.fetchBoard.title}
            />
            <TextAreaBox
              label='내용'
              name='contents'
              placeholder='내용을 입력해 주세요.'
              onChange={onChangeContents}
              required
              isInput={contents}
              isSubmitCheck={isSubmitCheck}
              defaultValue={data?.fetchBoard.contents}
            />

            {/* <div className='flex w-full flex-col items-start justify-start gap-2'> */}
            <div className='flex gap-1 text-sm'>
              <label className='font-base font-semibold' htmlFor='address'>
                주소
              </label>
            </div>
            <div className='flex gap-2'>
              <input
                id='addressNum'
                name='addressNum'
                type='number'
                className='w-20 flex-1 gap-2 rounded-lg px-4 py-3 outline outline-1 outline-gray-200'
                placeholder='01234'
                value={boardFormData.boardAddress.zipcode}
                disabled
              />

              <PostCodeModal
                btnName='우편번호 검색'
                onInputAddress={onInputAddress}
              />
            </div>
            <input
              id='address'
              name='address'
              type='text'
              className='w-full flex-1 gap-2 rounded-lg px-4 py-3 outline outline-1 outline-gray-200'
              placeholder='주소를 입력해 주세요.'
              value={boardFormData.boardAddress.address}
              disabled
            />
            <input
              id='addressdetail'
              name='addressdetail'
              type='text'
              className='w-full flex-1 gap-2 rounded-lg px-4 py-3 outline outline-1 outline-gray-200'
              placeholder='상세주소'
              onChange={onInputDetailAddress}
              value={boardFormData.boardAddress.addressDetail}
            />
            {/* </div> */}
            <hr />
            <InputBox
              label='유튜브 링크'
              name='youtubeUrl'
              type='text'
              placeholder='링크를 입력해 주세요.'
              onInput={onChangeBoardFormData}
              onChange={onChangeBoardFormData}
              defaultValue={data?.fetchBoard.youtubeUrl}
              required={false}
            />
            <hr />
            <div>
              <label className='flex w-full gap-1' htmlFor='photo'>
                <span>사진 첨부</span>
              </label>
              {isEdit && (
                <div className='flex gap-4'>
                  {data?.fetchBoard.images.map((image, index) => {
                    return (
                      <ImageUpload
                        key={index}
                        image={image}
                        idx={index}
                        onChangeImages={onChangeImages}
                        onRemoveImages={onRemoveImages}
                      />
                    );
                  })}
                </div>
              )}
              {!isEdit && (
                <div className='flex gap-4'>
                  {boardFormData.images.map((image, index) => {
                    return (
                      <ImageUpload
                        key={index}
                        image={image}
                        idx={index}
                        onChangeImages={onChangeImages}
                        onRemoveImages={onRemoveImages}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='mb-20 flex w-full justify-end py-6'>
          <div className={'flex h-10 w-full gap-2'}>
            <button
              type='button'
              className='border-1 flex w-full items-center justify-center rounded-xl border border-gray-300 px-4 py-3'
              onClick={() => router.back()}
            >
              취소
            </button>
            <button
              className={`border-1 flex w-full items-center justify-center rounded-xl border border-gray-300 bg-gray-400 px-4 py-3 text-white ${
                isSubmit ? 'bg-[#2974E5] text-gray-300' : 'bg-yellow'
              }`}
            >
              {!isEdit ? '등록하기' : '수정하기'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
