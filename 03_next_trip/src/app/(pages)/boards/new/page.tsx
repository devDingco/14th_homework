'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import ImageUpload from '@/components/ImageUpload';
import InputBox from '@/components/InputBox';
import TextAreaBox from '@/components/TextAreaBox';
import { CREATE_BOARD } from '@/apis/graphql/board';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

export default function BoardsNewPage() {
  const router = useRouter();
  const [writer, setWriter] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [createBoard] = useMutation(CREATE_BOARD);

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
    <main className='gap-16px p-16px flex h-full w-full max-w-7xl flex-col'>
      <h1 className='text-xl font-bold'>게시물 등록</h1>
      <div className='h-10'></div>
      <form action='#' onSubmit={onSubmitForm}>
        <div className='h-full w-full flex-1'>
          <div className='flex gap-10'>
            <InputBox
              lable='작성자'
              name='writer'
              type='text'
              placeholder='작성자 명을 입력해주세요.'
              onChange={onChangeWriter}
              required
              isInput={writer}
              isSubmitCheck={isSubmitCheck}
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
            />
          </div>
          {/* <RequiredInput /> */}
          <div className='h-10'></div>
          <hr className='h-[.5px] w-[1280px] bg-[##E4E4E4]' />
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
          />
          <div className='h-10'></div>
          <hr className='h-[.5px] w-[1280px] bg-[##E4E4E4]' />
          <div className='h-10'></div>
          <TextAreaBox
            lable='내용'
            name='contents'
            placeholder='내용을 입력해 주세요.'
            onChange={onChangeContents}
            required
            isInput={contents}
            isSubmitCheck={isSubmitCheck}
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
          />
          <div className='h-10'></div>
          <hr className='h-[.5px] w-[1280px] bg-[##E4E4E4]' />
          <div className='h-10'></div>
          사진첨부
          <div className='flex gap-4'>
            <ImageUpload />
            <ImageUpload />
            <ImageUpload />
          </div>
        </div>
        <div className='flex justify-end py-10'>
          <div className='flex gap-4'>
            <button className='border-1 border-gary-200 rounded-xl border px-4 py-3'>
              취소
            </button>
            <button
              className={`border-1 border-gary-200 rounded-xl border px-4 py-3 ${
                isSubmit ? 'bg-[#2974E5] text-white' : 'bg-yellow'
              }`}
            >
              등록하기
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
