'use client';

import { LOGO } from '@/assets/icons/icons';
import InputBox from '@/components/commons/InputBox';
import { useMutation } from '@apollo/client';
// import InputBox from '@/components/common/InputBox';
import Image from 'next/image';
import { useState } from 'react';
import { CREATE_USER, LOGIN_USER } from './queries';
import { useAccessTokenStore } from '@/store/accessTokenStore';

export default function Authform({
  onToggleOpen,
}: {
  onToggleOpen?: () => void;
}) {
  const [switchSign, setswitchSign] = useState('signIn');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [passwordCheck, setpasswordCheck] = useState('');
  const [loginFailed, setloginFailed] = useState(false);
  const { setAccessToken } = useAccessTokenStore();

  const [createUser] = useMutation(CREATE_USER);

  const onSubmitSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    console.log(name, email, password, passwordCheck);

    try {
      await createUser({
        variables: {
          createUserInput: {
            name,
            email,
            password,
          },
        },
      });
      alert('회원가입이 완료되었습니다. 로그인 해주세요.');
      setswitchSign('signIn');
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      console.log(error);
    }
  };

  const [loginUser] = useMutation(LOGIN_USER);

  const onSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      });
      console.log(result.data?.loginUser.accessToken);
      setAccessToken(result.data?.loginUser.accessToken || '');
      onToggleOpen?.();
    } catch (error) {
      setloginFailed(true);
      // if (error instanceof Error) alert(error.message);
      console.log(error);
    }
  };

  const onClickSwitch = () => {
    if (switchSign === 'signIn') {
      setswitchSign('signUp');
    } else {
      setswitchSign('signIn');
    }
  };

  return (
    <form
      onSubmit={switchSign === 'signIn' ? onSubmitLogin : onSubmitSignup}
      className='flex h-screen w-full flex-col items-center justify-center gap-6'
    >
      <div className='flex w-full flex-col items-center gap-6'>
        <Image className='h-[80px] w-[120px]' src={LOGO} alt='Logo' />
        <div className="justify-start text-center font-['Pretendard_Variable'] text-base font-semibold leading-normal text-black">
          트립트립에 오신걸 환영합니다.
        </div>
      </div>

      <div className='flex w-full flex-col items-center'>
        <div className="justify-start text-center font-['Pretendard_Variable'] text-xs font-medium leading-tight text-gray-800">
          {switchSign === 'signIn'
            ? '트립트립에 로그인 하세요.'
            : '회원가입을 위해 아래 빈칸을 모두 채워 주세요.'}
        </div>
      </div>

      {switchSign === 'signUp' && (
        <div className='mt-10 flex w-full max-w-sm flex-col gap-3 px-5'>
          <InputBox
            label='이름'
            name='name'
            type='text'
            placeholder='이름을 입력해 주세요.'
            required
            isInput={name}
            value={name}
            onChange={(e) => setname(e.target.value)}
            loginFailed={loginFailed}
          />
          <InputBox
            label='이메일'
            name='email'
            type='email'
            placeholder='이메일을 입력해 주세요.'
            required
            isInput={email}
            value={email}
            onChange={(e) => setemail(e.target.value)}
            loginFailed={loginFailed}
          />
          <InputBox
            label='비밀번호'
            name='password'
            type='password'
            placeholder='비밀번호를 입력해 주세요.'
            required
            isInput={password}
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            loginFailed={loginFailed}
          />
          <InputBox
            label='비밀번호 확인'
            name='passwordCheck'
            type='password'
            placeholder='비밀번호를 한번 더 입력해 주세요.'
            required
            isInput={passwordCheck}
            value={passwordCheck}
            onChange={(e) => setpasswordCheck(e.target.value)}
            loginFailed={loginFailed}
          />
        </div>
      )}

      {switchSign === 'signIn' && (
        <div className='mt-10 flex w-full max-w-sm flex-col gap-3 px-5'>
          <InputBox
            name='email'
            type='email'
            placeholder='이메일을 입력해 주세요.'
            required
            isInput={email}
            value={email}
            onChange={(e) => setemail(e.target.value)}
            loginFailed={loginFailed}
          />
          <InputBox
            name='password'
            type='password'
            placeholder='비밀번호를 입력해 주세요.'
            required
            isInput={password}
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            loginFailed={loginFailed}
          />
          {loginFailed && (
            <span className='text-red-500'>
              아이디 또는 비밀번호를 확인해 주세요.
            </span>
          )}
        </div>
      )}

      <div className='mt-5 flex w-full max-w-sm flex-col gap-4 px-5'>
        {switchSign === 'signIn' && (
          <button className='w-full rounded-md bg-blue-500 py-2 text-white'>
            로그인
          </button>
        )}
        {switchSign === 'signUp' && (
          <button className='w-full rounded-md bg-blue-500 py-2 text-white'>
            회원가입
          </button>
        )}
        <button
          type='button'
          onClick={onClickSwitch}
          className='w-full rounded-md text-gray-700'
        >
          {switchSign === 'signIn' ? '회원가입' : '로그인'}
        </button>
      </div>
    </form>
  );
}
