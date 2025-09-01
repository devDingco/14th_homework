import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <h1>Nextjs 첫 페이지 입니다.</h1>
      <Link href='/boards/new'>New Board</Link>
      <Link href='/boards/detail'>Board Detail</Link>
    </>
  );
}
