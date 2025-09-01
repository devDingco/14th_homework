import { Link } from 'react-router';

export default function TestPage() {
  return (
    <main className='flex h-screen justify-center items-center'>
      <div className='flex flex-col text-7xl'>
        <h1>TestPage</h1>
        <br />
        <Link to='/boards/new'>PAGE: 새글페이지</Link>
        <Link to='/boards/detail'>PAGE: 상세페이지</Link>
      </div>
    </main>
  );
}
