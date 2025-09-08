import { useState, type ChangeEvent, type FormEvent } from 'react';
import ImageUpload from '@/components/ImageUpload';
import InputBox from '@/components/common/InputBox';
import TextAreaBox from '@/components/common/TextAreaBox';
import { CREATE_BOARD, FETCH_BOARD, UPDATE_BOARD } from '@/apis/graphql/board';
import { useMutation, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { getInputPassword } from '@/utils/utils';
// import { getInputPassword } from '@/utils/utils';

type TFormProps = {
  isEdit: boolean;
};

// const boardForm = {
//   writer: '',
//   password: '',
//   title: '',
//   contents: '',
//   youtubeUrl: '',
// };

export default function BoardForm({ isEdit }: TFormProps) {
  const router = useRouter();
  const [writer, setWriter] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { boardId } = useParams();
  console.log(boardId);

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: boardId,
    },
  });

  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const isSubmitCheck = () => {
    //
    if (writer.trim() && password.trim() && title.trim() && contents.trim()) {
      // alert(`게시글 등록이 가능한 상태입니다!`);
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  };

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
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
      console.log(inputPassword);
      const result = await updateBoard({
        variables: {
          boardId: boardId,
          password: inputPassword,
          updateBoardInput: {
            // ...data,
            title,
            contents,
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
      setWriter('');
      setPassword('');
      setTitle('');
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
            title,
            contents,
            password,
            writer,
            youtubeUrl,
            images: [
              'codecamp-file-storage/2024/1/10/IMG_9472.jpeg',
              'codecamp-file-storage/2024/10/25/donggle1.jpeg',
            ],
          },
        },
      });

      router.push(`/boards/${result.data?.createBoard?._id}`);
    } catch (error) {
      console.log(error);
      alert('에러가 발생하였습니다. 다시 시도해 주세요.');
    } finally {
      setWriter('');
      setPassword('');
      setTitle('');
      setContents('');
      setYoutubeUrl('');
    }
  };

  return (
    <>
      <h1 className='text-xl font-bold'>
        {!isEdit ? '게시물 등록' : '게시물 수정'}
      </h1>
      <div className='h-10'></div>
      <form
        action='#'
        onSubmit={isEdit ? onEditForm : onSubmitForm}
        className='mx-5 mb-10 mt-6'
      >
        <div className='h-full w-full flex-1'>
          <div className='flex flex-col gap-10 desktop:flex-row'>
            <InputBox
              lable='작성자'
              name='writer'
              type='text'
              placeholder='작성자 명을 입력해주세요.'
              onChange={onChangeWriter}
              required
              isInput={writer}
              isSubmitCheck={isSubmitCheck}
              defaultValue={data?.fetchBoard.writer}
              isEdit={isEdit}
            />
            <InputBox
              lable='비밀번호'
              name='password'
              type='password'
              placeholder='비밀번호를 입력해 주세요.'
              onChange={onChangePassword}
              required
              isInput={password}
              isSubmitCheck={isSubmitCheck}
              defaultValue={data?.fetchBoard.password}
              isEdit={isEdit}
            />
          </div>
          {/* <RequiredInput /> */}
          <div className='h-10'></div>
          {/* <hr className='h-[.5px] w-[1280px] bg-[##E4E4E4]' /> */}
          {/* <hr className='h-[.5px] w-full bg-[##E4E4E4]' /> */}
          <div className='h-10'></div>
          <InputBox
            lable='제목'
            name='title'
            type='text'
            placeholder='제목을 입력해 주세요.'
            onChange={onChangeTitle}
            required
            isInput={title}
            isSubmitCheck={isSubmitCheck}
            defaultValue={data?.fetchBoard.title}
          />
          <div className='h-10'></div>
          {/* <hr className='h-[.5px] w-[1280px] bg-[##E4E4E4]' /> */}
          {/* <hr className='h-[.5px] w-full bg-[##E4E4E4]' /> */}
          <div className='h-10'></div>
          <TextAreaBox
            lable='내용'
            name='contents'
            placeholder='내용을 입력해 주세요.'
            onChange={onChangeContents}
            required
            isInput={contents}
            isSubmitCheck={isSubmitCheck}
            defaultValue={data?.fetchBoard.contents}
          />
          <div className='h-10'></div>
          {/*  */}
          <div className='flex w-full flex-col items-start justify-start gap-2'>
            <div className='flex gap-1 text-sm'>
              <label className='font-base font-semibold' htmlFor='address'>
                주소
              </label>
              {/* {required ? <span className="text-[#f66a6a]">*</span> : ''} */}
            </div>
            <div className='flex gap-2'>
              <input
                id='addressNum'
                name='addressNum'
                type='number'
                className='w-full flex-1 gap-2 rounded-lg px-4 py-3 outline outline-1 outline-gray-200'
                placeholder='01234'
              />
              <button className='border-1 bory-gary-200 rounded-xl border px-4 py-3'>
                우편번호 검색
              </button>
            </div>
            <input
              id='address'
              name='address'
              type='text'
              className='w-full flex-1 gap-2 rounded-lg px-4 py-3 outline outline-1 outline-gray-200'
              placeholder='주소를 입력해 주세요.'
            />
            <input
              id='addressdetail'
              name='addressdetail'
              type='text'
              className='w-full flex-1 gap-2 rounded-lg px-4 py-3 outline outline-1 outline-gray-200'
              placeholder='상세주소'
            />
            {/* {isInput ? <div></div> : <RequiredInput />} */}
            {/* <input placeholder={`${placeholder} 입력해 주세요.`}></input> */}
          </div>
          {/*  */}
          {/* <TextAreaBox lable="주소" placeholder="주소를 입력해 주세요." /> */}
          <div className='h-10'></div>
          <div className='h-10'></div>
          <InputBox
            lable='유튜브 링크'
            name='youtubeUrl'
            type='text'
            placeholder='링크를 입력해 주세요.'
            onChange={onChangeYoutubeUrl}
            defaultValue={data?.fetchBoard.youtubeUrl}
          />
          <div className='h-10'></div>
          {/* <hr className='h-[.5px] w-[1280px] bg-[##E4E4E4]' /> */}
          <hr className='h-[.5px] w-full bg-[##E4E4E4]' />
          {/* <hr className='h-[.5px] w-full bg-red-500' /> */}
          <div className='h-10'></div>
          사진첨부
          <div className='flex gap-4'>
            <ImageUpload />
            {/* <ImageUpload /> */}
            {/* <ImageUpload /> */}
          </div>
        </div>
        <div className='flex justify-end py-10'>
          <div className='flex gap-4'>
            <button className='border-1 border-gary-200 rounded-xl border px-4 py-3'>
              취소
            </button>
            {!isEdit ? (
              <button
                className={`border-1 border-gary-200 rounded-xl border px-4 py-3 ${
                  isSubmit ? 'bg-[#2974E5] text-white' : 'bg-yellow'
                }`}
              >
                등록하기
              </button>
            ) : (
              <button
                className={`border-1 border-gary-200 rounded-xl border px-4 py-3 ${
                  isSubmit ? 'bg-[#2974E5] text-white' : 'bg-yellow'
                }`}
              >
                수정하기
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
