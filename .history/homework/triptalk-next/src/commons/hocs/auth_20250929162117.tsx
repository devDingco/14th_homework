import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export const withAuth = <T>(컴포넌트:T) => () => {
  const router = useRouter(); // 로그인 안한사람 막는 코드
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      alert('로그인 후 이용 가능합니다!!!');
      router.push('/boards/login');
    }
  }, []);
  return <컴포넌트 />;
};
