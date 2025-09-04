'use client';
import { FETCH_BOARDS } from '@/apis/graphql/board';
import { useQuery } from '@apollo/client';
import Board from './Board';
import { type TBoard } from '@/types';

export default function BoardList() {
  const { data, loading, error } = useQuery(FETCH_BOARDS, {
    variables: { page: 1 },
  });

  console.log(data);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mb-10 flex px-5'>
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
        <ul className='flex flex-col gap-4'>
          {data?.fetchBoards.map((board: TBoard) => (
            <Board key={board._id} {...board} />
          ))}
        </ul>
        <div className='inline-flex items-center justify-center gap-2 self-stretch'>
          <div
            data-property-1="leftright 아이콘 버튼 'enable'"
            data-size='s'
            className='flex items-center justify-start gap-2'
          >
            <div className='relative h-6 w-6 overflow-hidden'>
              <div className='bg-Gray-Gray-800 absolute left-[14.98px] top-[17.58px] h-3 w-1.5 origin-top-left rotate-180' />
            </div>
            <div className='flex items-center justify-start gap-4'>
              <div className='inline-flex h-6 w-6 flex-col items-center justify-center gap-2.5 rounded-lg bg-zinc-100 p-2.5'>
                <div className='text-Gray-Gray-600 w-6 justify-start text-center text-sm font-normal leading-tight'>
                  1
                </div>
              </div>
              <div className='inline-flex h-6 w-6 flex-col items-center justify-center gap-2.5 rounded-lg p-2.5'>
                <div className='text-Gray-B w-6 justify-start text-center text-sm font-medium leading-tight'>
                  2
                </div>
              </div>
              <div className='inline-flex h-6 w-6 flex-col items-center justify-center gap-2.5 rounded-lg p-2.5'>
                <div className='text-Gray-Gray-600 w-6 justify-start text-center text-sm font-normal leading-tight'>
                  3
                </div>
              </div>
              <div className='inline-flex h-6 w-6 flex-col items-center justify-center gap-2.5 rounded-lg p-2.5'>
                <div className='text-Gray-Gray-600 w-6 justify-start text-center text-sm font-normal leading-tight'>
                  4
                </div>
              </div>
              <div className='inline-flex h-6 w-6 flex-col items-center justify-center gap-2.5 rounded-lg p-2.5'>
                <div className='text-Gray-Gray-600 w-6 justify-start text-center text-sm font-normal leading-tight'>
                  5
                </div>
              </div>
            </div>
            <div className='relative h-6 w-6 overflow-hidden'>
              <div className='bg-Gray-Gray-800 absolute left-[8.43px] top-[6.43px] h-3 w-1.5' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
