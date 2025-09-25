'use client';

import { FETCH_BOARDS_OF_THE_BEST } from './queries';
import { profile_g } from '@/assets/icons/icons';
import { Board } from '@/types/gql/graphql';
import { formatDate } from '@/utils/formatDate';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { MdFavoriteBorder } from 'react-icons/md';

export default function HotBoard() {
  const { data } = useQuery(FETCH_BOARDS_OF_THE_BEST);
  console.log(data && data.fetchBoardsOfTheBest);

  return (
    <div className='scrollbar-hide flex w-full min-w-80 flex-row gap-4 overflow-x-scroll'>
      {/* <div className='inline-flex items-center justify-start gap-4 self-stretch'> */}
      <div className='flex h-32 w-full flex-row items-start justify-start gap-2 rounded-xl'>
        {data &&
          data?.fetchBoardsOfTheBest?.map((board: Board) => (
            <Link
              href={`/boards/${board._id}`}
              key={board._id}
              className='flex w-full flex-row gap-2'
            >
              {board?.images?.[0] && (
                <div className='relative h-32 w-24 rounded'>
                  <Image
                    className='absolute left-0 top-0 h-32 w-24 rounded'
                    height={128}
                    width={96}
                    src={
                      board?.images?.[0] && board?.images.length > 0
                        ? `https://storage.googleapis.com/${board.images?.[0]}`
                        : 'https://storage.googleapis.com/codecamp-file-storage/2025/9/11/colley_post_3584_title_a64acc75-8a46-4b3d-85c3-02c9ffce63b2.png'
                    }
                    alt='triptalk'
                  />
                </div>
              )}

              <div className='inline-flex w-44 flex-col items-end justify-between self-stretch'>
                <div className='flex flex-col items-start justify-start gap-2 self-stretch'>
                  <div className="justify-start self-stretch font-['Pretendard_Variable'] text-sm font-semibold leading-tight text-gray-900">
                    {board.title}
                  </div>
                  <div
                    data-arrow='false'
                    data-show-name='true'
                    data-size='m'
                    className='inline-flex items-center justify-start gap-1'
                  >
                    <div data-property-1='g' className='relative h-6 w-6'>
                      <Image
                        width={6}
                        height={6}
                        className='absolute left-0 top-0 h-6 w-6 rounded-full'
                        src={profile_g}
                        alt='profile'
                      />
                    </div>
                    <div className="justify-start font-['Pretendard_Variable'] text-sm font-light leading-tight text-gray-700">
                      {board.writer}
                    </div>
                  </div>
                </div>
                <div className='inline-flex items-center justify-between self-stretch'>
                  <div className='flex items-center justify-start gap-1'>
                    <div className='flex flex-row items-center justify-center gap-1 text-[#f66a6a]'>
                      <MdFavoriteBorder className='h-6 w-6' />
                      {board.likeCount}
                    </div>
                  </div>
                  <div className="justify-start font-['Pretendard_Variable'] text-sm font-normal leading-tight text-gray-600">
                    {formatDate(board.createdAt)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {/* </div> */}
    </div>
  );
}
