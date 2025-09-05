'use client';

import { Ioutline_delete } from '@/assets/icons/icons';
import { type TBoard } from '@/types';
import { formatDate } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { DELETE_BOARD, FETCH_BOARDS } from '@/apis/graphql/board';

export default function Board({
  _id,
  writer,
  title,
  updatedAt,
}: Partial<TBoard>) {
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const result = await deleteBoard({
        variables: {
          boardId: _id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARDS,
            variables: { page: 1 },
          },
        ],
        awaitRefetchQueries: true,
      });
      console.log(result);
      alert('삭제가 완료되었습니다!');
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    //
    // <li className='flex h-9 w-72 gap-2 border-b p-2'>
    <Link href={`/boards/${_id}`}>
      <div className='group flex h-9 w-full items-center justify-start gap-1 rounded-lg border p-2 outline outline-1 outline-offset-[-1px] outline-gray-50'>
        <div className='flex w-10 items-center justify-center gap-2.5'>
          <span className='flex-1 justify-start text-center text-xs font-light leading-tight text-gray-500'>
            # 번호
          </span>
        </div>
        <div className='flex flex-1 flex-wrap content-center items-center justify-start gap-2'>
          <span className='w-4 flex-1 justify-start text-xs font-medium leading-tight text-zinc-900'>
            {title}
          </span>
        </div>
        <div className='flex w-12 items-center justify-center gap-2.5'>
          <span className='flex-1 justify-start text-center text-xs font-light leading-tight text-gray-800'>
            {writer}
          </span>
        </div>
        <div className='flex w-16 items-center justify-center gap-2.5'>
          <span className='flex-1 justify-start text-center text-xs font-light leading-tight text-gray-500'>
            {updatedAt ? formatDate(updatedAt) : '-'}
          </span>
        </div>
        <button className='hidden group-hover:block' onClick={onClickDelete}>
          <Image
            className='h-6 w-6'
            width={6}
            height={6}
            src={Ioutline_delete}
            alt=''
          />
        </button>
      </div>
    </Link>
  );
}
