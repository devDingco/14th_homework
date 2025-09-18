'use client';

import { MdOutlineEdit } from 'react-icons/md';
import { MdMenu } from 'react-icons/md';
import ReactPlayer from 'react-player';

import { MdLink, MdOutlineLocationOn } from 'react-icons/md';
import { MdOutlineHeartBroken, MdFavoriteBorder } from 'react-icons/md';

import Image from 'next/image';

import { profile_a } from '@/assets/icons/icons';

import { formatDate } from '@/utils/utils';
import Link from 'next/link';
// import { IBoardDetail } from '@/types/BoardDetail';
import TooltipComponent from '../common/TooltipComponent';
import CommentList from './comment-list';
import CommentForm from '@/components/boards-detail/comment-write';
import { useBoardDetailHook } from './hook';

// export default function BoardDetail({ data, boardId }: IBoardDetail) {
export default function BoardDetail() {
  const { data, error, loading, boardId } = useBoardDetailHook();

  console.log(data && data);

  if (loading) return <p className='flex-grow text-4xl'>로딩중...</p>;
  if (error) return <p className='text-7xl'>에러가 발생했습니다</p>;

  return (
    <main className='flex h-full w-full flex-col items-center justify-center gap-10 px-5 py-10'>
      <section className='p-16px flex h-full w-full max-w-7xl flex-col gap-6'>
        <header className='h-18 w-fit text-2xl font-bold text-black'>
          {data?.fetchBoard?.title}
        </header>

        {/* ===== 2 ===== */}
        <div className='flex flex-col gap-4'>
          <div className='flex w-full justify-between'>
            <div className='flex gap-1'>
              <Image src={profile_a} alt='profile' />
              <span>{data?.fetchBoard?.writer}</span>
            </div>
            {data?.fetchBoard?.updatedAt &&
              formatDate(data?.fetchBoard?.updatedAt)}
          </div>

          <hr className='my-4 inline-block h-1' />

          <div className='flex justify-end gap-2'>
            <MdLink className='h-6 w-6' />
            {/* <TooltipComponent
              text={data?.fetchBoard?.boardAddress?.address ?? ''}
            > */}
            <TooltipComponent text='주소를 등록하지 않았습니다.'>
              <MdOutlineLocationOn className='h-6 w-6' />
            </TooltipComponent>
          </div>
        </div>

        {/* ===== 3 이미지 ===== */}
        {data?.fetchBoard?.images &&
          data?.fetchBoard?.images.map((el, index) => (
            <Image
              key={index}
              className='max-w-100'
              width={360}
              height={360}
              // src={img1}
              src={`http://storage.googleapis.com/${el}`}
              alt='dw'
            />
          ))}

        {/* ===== 4 텍스트 ===== */}
        <p className='w-full whitespace-pre-wrap break-words leading-relaxed text-gray-700'>
          {data?.fetchBoard?.contents}
        </p>

        {/* ===== 5 비디오 ===== */}
        {data?.fetchBoard?.youtubeUrl && (
          <ReactPlayer
            src={data?.fetchBoard?.youtubeUrl}
            width='100%'
            height='180px'
            playing={false}
            muted={true}
            loop={true}
            controls={true}
          />
        )}

        {/* ===== 6 아이콘 ===== */}
        <div className='flex justify-center'>
          <div className='flex gap-6'>
            {/* heart - bad */}
            <div className='flex flex-col items-center justify-center gap-1'>
              <MdOutlineHeartBroken className='h-6 w-6 font-light' />
              {/* <Image className='h-6 w-6' src={Ioutline_bad} alt='outline_bad' /> */}
              <div>24</div>
            </div>
            {/* heart - good */}
            <div className='flex flex-col items-center justify-center gap-1 text-[#f66a6a]'>
              <MdFavoriteBorder className='h-6 w-6' />
              <div>12</div>
            </div>
          </div>
        </div>

        {/* ===== 6 버튼 ===== */}
        <div className='flex justify-center text-xs'>
          <div className='flex gap-6'>
            <button className='flex h-10 w-[105px] items-center justify-center gap-2 rounded-lg px-2 py-3 outline outline-1'>
              <MdMenu />
              <span>목록으로</span>
            </button>
            <button className='flex h-10 w-[105px] items-center justify-center gap-2 rounded-lg px-2 py-3 outline outline-1'>
              <MdOutlineEdit />
              {/* <button>수정하기</button> */}
              <Link href={`/boards/${boardId}/edit`}>수정하기</Link>
            </button>
          </div>
        </div>
        {/* </div> */}
      </section>

      {/* 댓글 section */}
      <section className='flex w-full flex-col gap-6'>
        <CommentForm />
        <CommentList boardId={boardId} />
      </section>
    </main>
  );
}
