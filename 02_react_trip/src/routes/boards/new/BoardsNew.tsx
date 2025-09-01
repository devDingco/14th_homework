import { useState, type ChangeEvent, type FormEvent } from 'react';
// import Header from '@/components/Header';
import ImageUpload from '../../../components/ImageUpload';
import InputBox from '../../../components/InputBox';
import TextAreaBox from '../../../components/TextAreaBox';
import Header from '../../../components/Header';

export default function BoardsNew() {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [youtubeLink, setYoutubeLink] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  // interface ChangeEvent {
  //   target: {
  //     value: string | number;
  //   };
  // }

  const isSubmitCheck = () => {
    // console.log(userName.trim(), password.trim(), title.trim(), content.trim());
    if (userName.trim() && password.trim() && title.trim() && content.trim()) {
      alert(`게시글 등록이 가능한 상태입니다!`);
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setContent(e.target.value);
  };
  const onChangeYoutubeLink = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setYoutubeLink(e.target.value);
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const data = new FormData(e.target as HTMLFormElement).get('username');
    const newPost = {
      userName,
      password,
      title,
      content,
      youtubeLink,
    };

    console.log(newPost);
  };

  return (
    <section className='h-full w-full flex  justify-center flex-col items-center gap-10'>
      <Header />
      <main className='w-full flex flex-col gap-16px p-16px h-full w-full max-w-7xl'>
        <h1 className='text-xl font-bold'>게시물 등록</h1>
        <div className='h-10'></div>
        <form action='#' onSubmit={onSubmitForm}>
          <div className='flex-1 h-full w-full'>
            <div className='flex gap-10'>
              <InputBox
                lable='작성자'
                name='username'
                type='text'
                placeholder='작성자 명을 입력해주세요.'
                onChange={onChangeUsername}
                required
                isInput={userName}
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
            <hr className='w-[1280px] h-[.5px] bg-[##E4E4E4]' />
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
            <hr className='w-[1280px] h-[.5px] bg-[##E4E4E4]' />
            <div className='h-10'></div>
            <TextAreaBox
              lable='내용'
              name='content'
              placeholder='내용을 입력해 주세요.'
              onChange={onChangeContent}
              required
              isInput={content}
              isSubmitCheck={isSubmitCheck}
            />
            <div className='h-10'></div>
            {/*  */}
            <div className='flex flex-col gap-2 w-full justify-start items-start'>
              <div className='flex gap-1 text-sm'>
                <label className='font-base font-semibold' htmlFor='address'>
                  주소
                </label>
                {/* {required ? <span className="text-[#f66a6a]">*</span> : ''} */}
              </div>
              <div className='flex gap-2'>
                <input
                  id='address'
                  name='address'
                  type='number'
                  className='flex-1 px-4 py-3 rounded-lg outline outline-1 outline-gray-200 w-full gap-2'
                  placeholder='01234'
                />
                <button className='py-3 px-4 border border-1 bory-gary-200 rounded-xl'>
                  우편번호 검색
                </button>
              </div>
              <input
                id='address'
                name='address'
                type='text'
                className='flex-1 px-4 py-3 rounded-lg outline outline-1 outline-gray-200 w-full gap-2'
                placeholder='주소를 입력해 주세요.'
              />
              <input
                id='address'
                name='address'
                type='text'
                className='flex-1 px-4 py-3 rounded-lg outline outline-1 outline-gray-200 w-full gap-2'
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
              name='youtubeLink'
              type='text'
              placeholder='링크를 입력해 주세요.'
              onChange={onChangeYoutubeLink}
            />
            <div className='h-10'></div>
            <hr className='w-[1280px] h-[.5px] bg-[##E4E4E4]' />
            <div className='h-10'></div>
            사진첨부
            <div className='flex gap-4'>
              <ImageUpload />
              <ImageUpload />
              <ImageUpload />
            </div>
          </div>
          <div className='py-10 flex justify-end'>
            <div className='flex gap-4'>
              <button className='py-3 px-4 border border-1 border-gary-200 rounded-xl'>
                취소
              </button>
              <button
                className={`py-3 px-4 border border-1 border-gary-200 rounded-xl ${
                  isSubmit ? 'bg-[#2974E5] text-white' : 'bg-yellow'
                }`}
              >
                등록하기
              </button>
            </div>
          </div>
        </form>
      </main>
    </section>
  );
}
