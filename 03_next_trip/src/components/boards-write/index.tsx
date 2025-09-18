import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import ImageUpload from '@/components/ImageUpload';
import InputBox from '@/components/common/InputBox';
import TextAreaBox from '@/components/common/TextAreaBox';
import { FETCH_BOARD, UPDATE_BOARD } from '@/apis/graphql/board';
import { useMutation, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { getInputPassword } from '@/utils/utils';
import {
  CreateBoardDocument,
  CreateBoardMutation,
  CreateBoardMutationVariables,
} from '@/types/gql/graphql';
// import CustomModal from '../Modal/CustomModal';
import PostCodeModal from '../Modal/PostCodeModal';
// import { getInputPassword } from '@/utils/utils';
// import { Board } from '@/types/gql/graphql';

type TFormProps = {
  isEdit: boolean;
};

const initBoardFormData = {
  writer: '',
  password: '',
  title: '',
  contents: '',
  youtubeUrl: 'https://www.youtube.com/watch?v=c2Tr4029H9w',
  boardAddress: {
    zipcode: '',
    address: '',
    addressDetail: '',
  },
};

type TAddress = {
  zipcode: string;
  address: string;
};

export default function BoardsWrite({ isEdit }: TFormProps) {
  const [boardFormData, setBoardFormData] = useState(initBoardFormData);
  const router = useRouter();
  const [contents, setContents] = useState<string>('');
  const [youtubeUrl, setYoutubeUrl] = useState<string>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { boardId } = useParams();

  const { data } = useQuery(FETCH_BOARD, {
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
  const onChangeYoutubeUrl = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setYoutubeUrl(e.target.value);
  };

  const onEditForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const inputPassword = getInputPassword();
      const result = await updateBoard({
        variables: {
          boardId: boardId,
          password: inputPassword,
          updateBoardInput: {
            // ...data,
            // title,
            // contents,
            // password,
            // writer,
            // youtubeUrl,
            // images: [
            //   'codecamp-file-storage/2024/1/10/IMG_9472.jpeg',
            //   'codecamp-file-storage/2024/10/25/donggle1.jpeg',
            // ],
          },
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
      // setWriter('');
      // setPassword('');
      // setTitle('');
      setContents('');
      setYoutubeUrl('');
    }
  };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const data = new FormData(e.target as HTMLFormElement).get('writer');
    // const newPost = {
    //   writer,
    //   password,
    //   title,
    //   contents,
    //   youtubeUrl,
    // };

    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            // ...newPost,
            title: boardFormData.title,
            contents,
            password: boardFormData.password,
            writer: boardFormData.writer,
            youtubeUrl,
            images: [
              'codecamp-file-storage/2024/1/10/IMG_9472.jpeg',
              'codecamp-file-storage/2024/10/25/donggle1.jpeg',
            ],
            boardAddress: {
              ...boardFormData.boardAddress,
            },
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
            />
            <input
              id='addressdetail'
              name='addressdetail'
              type='text'
              className='w-full flex-1 gap-2 rounded-lg px-4 py-3 outline outline-1 outline-gray-200'
              placeholder='상세주소'
              // onChange={onInputAddress}
              value={boardFormData.boardAddress.addressDetail}
            />
            {/* </div> */}
            <hr />
            <InputBox
              label='유튜브 링크'
              name='youtubeUrl'
              type='text'
              placeholder='링크를 입력해 주세요.'
              onChange={onChangeYoutubeUrl}
              defaultValue={data?.fetchBoard.youtubeUrl}
              required={false}
            />
            <hr />
            <div>
              <label className='flex w-full gap-1' htmlFor='photo'>
                <span>사진 첨부</span>
              </label>
              <div className='flex gap-4'>
                <ImageUpload />
                <ImageUpload />
              </div>
            </div>
          </div>
        </div>
        <div className='mb-20 flex w-full justify-end py-6'>
          <div className={'flex h-10 w-full gap-2'}>
            <button className='border-1 flex w-full items-center justify-center rounded-xl border border-gray-300 px-4 py-3'>
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
