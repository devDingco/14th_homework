'use client';
import Board from './Board';
import { type TBoard } from '@/types';
import Pagination from '@/components/Board/pagination/Pagination';
import { usePagination } from './pagination/hook';

export default function BoardList() {
  const {
    startPage,
    page,
    setPage,
    maxPage,
    data,
    loading,
    error,
    onPrevPage,
    onNextPage,
  } = usePagination();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mb-20 flex w-full px-5'>
      <div className='flex w-full flex-col justify-start gap-4 self-stretch rounded-2xl bg-white p-4 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.08)]'>
        <div className='inline-flex items-center justify-start gap-1 self-stretch px-2 py-1'>
          <div className='flex w-10 items-center justify-center gap-2.5'>
            <div className='justify-start text-xs font-medium leading-tight text-gray-900'>
              번호
            </div>
          </div>
          <div className='flex flex-1 items-center justify-center gap-2.5'>
            <div className='flex-1 justify-start text-xs font-medium leading-tight text-gray-900'>
              상품 명
            </div>
          </div>
          <div className='flex w-12 items-center justify-center gap-2.5'>
            <div className='justify-start text-xs font-medium leading-tight text-gray-900'>
              작성자
            </div>
          </div>
          <div className='flex w-16 items-center justify-center gap-2.5'>
            <div className='justify-start text-xs font-medium leading-tight text-gray-900'>
              날짜
            </div>
          </div>
        </div>
        <ul className='flex w-full flex-col gap-4'>
          {data?.fetchBoards.map((board: TBoard) => (
            <Board key={board._id} {...board} />
          ))}
        </ul>
        <Pagination
          startPage={startPage}
          page={page}
          setPage={setPage}
          maxPage={maxPage}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
        />
      </div>
    </div>
  );
}
