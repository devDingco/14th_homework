'use client';

// import img1 from '@/assets/images/bf8d80f3268fd56c18f3d708b2130bf315ff5ef8.jpg';
import video1 from '@/assets/images/54a36b7f016934c8179e2369db49c7bb1ef8a9e2.jpg';
import Image from 'next/image';

import {
  Ioutline_bad,
  Ioutline_edit,
  Ioutline_good,
  Ioutline_menu,
  profile_a,
} from '@/assets/icons/icons';
import { useQuery } from '@apollo/client';
import { FETCH_BOARD } from '@/apis/graphql/board';
import { useParams } from 'next/navigation';
import { formatDate } from '@/utils/utils';
import Link from 'next/link';
// import { Suspense } from 'react';

export default function BoardsDetailPage() {
  const { boardId } = useParams();

  const { data, loading, error } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: boardId,
    },
  });

  if (loading) return <p className='text-7xl'>로딩중...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <section className='flex h-full w-full flex-col items-center justify-center gap-10 py-10'>
      <main className='p-16px flex h-full w-full max-w-7xl flex-col gap-6'>
        <header className='h-18 text-2xl'>{data?.fetchBoard.title}</header>

        {/* ===== 2 ===== */}
        <div className='flex flex-col gap-4'>
          <div className='flex w-full justify-between'>
            <div className='flex gap-1'>
              <Image src={profile_a} alt='profile' />
              <span>{data?.fetchBoard.writer}</span>
            </div>
            <span>
              {data?.fetchBoard.updatedAt
                ? formatDate(data?.fetchBoard.updatedAt)
                : '-'}
            </span>
          </div>

          <hr className='my-4 inline-block h-1' />

          <div className='flex justify-end gap-2'>
            <span>link</span>
            <span>location</span>
          </div>
        </div>

        {/* ===== 3 이미지 ===== */}
        {data?.fetchBoard.images[0] || (
          <Image
            className='max-w-100'
            width={800}
            height={800}
            // src={img1}
            src={`http://storage.googleapis.com/codecamp-file-storage/2024/10/25/donggle1.jpeg`}
            alt='dw'
          />
        )}
        {data?.fetchBoard.images[0] && (
          <Image
            className='max-w-100'
            width={800}
            height={800}
            // src={img1}
            src={`http://storage.googleapis.com/${data?.fetchBoard.images[0]}`}
            alt='dw'
          />
        )}

        {/* ===== 4 텍스트 ===== */}
        <p className='whitespace-pre'>{data?.fetchBoard.contents}</p>

        {/* ===== 5 비디오 ===== */}
        <div className='flex justify-center'>
          <Image className='max-w-[822px]' src={video1} alt='dw' />
        </div>

        {/* ===== 6 아이콘 ===== */}
        <div className='flex justify-center'>
          <div className='flex gap-6'>
            {/* heart - bad */}
            <div className='flex flex-col items-center justify-center gap-1'>
              <Image className='h-6 w-6' src={Ioutline_bad} alt='outline_bad' />
              <div>24</div>
            </div>
            {/* heart - good */}
            <div className='flex flex-col items-center justify-center gap-1 text-red-500'>
              <Image
                className='h-6 w-6'
                src={Ioutline_good}
                alt='outline_good'
              />
              <div>12</div>
            </div>
          </div>
        </div>

        {/* ===== 6 버튼 ===== */}
        <div className='flex justify-center text-xs'>
          <div className='flex gap-6'>
            <button className='flex h-10 w-[105px] items-center gap-2 rounded-lg border px-2 py-3'>
              <Image src={Ioutline_menu} alt='outline_menu' />
              <span>목록으로</span>
            </button>
            <button className='flex h-10 w-[105px] items-center gap-2 rounded-lg border px-2 py-3'>
              <Image src={Ioutline_edit} alt='outline_edit' />
              {/* <button>수정하기</button> */}
              <Link href={`/boards/${boardId}/edit`}>수정하기</Link>
            </button>
          </div>
        </div>
        {/* </div> */}
      </main>
    </section>
  );
}
