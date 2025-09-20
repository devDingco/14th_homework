import { profile_a } from '@/assets/icons/icons';
import { BoardComment } from '@/types/gql/graphql';
import { Rate } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import CommentForm from '../comment-write';
import { MdClear, MdOutlineCreate } from 'react-icons/md';

export default function CommentListItem({
  comment,
}: {
  comment: BoardComment;
}) {
  const { writer, contents, createdAt, rating } = comment;
  const [isEdit, setIsEdit] = useState(false);

  const onToggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <>
      {/* EDIT */}
      {isEdit && (
        <CommentForm
          isEdit={isEdit}
          onToggleEdit={onToggleEdit}
          comment={comment}
        />
      )}

      {/* READ */}
      {!isEdit && (
        <div className='mb-10'>
          <div className='mb-2 flex flex-col items-start gap-2'>
            <span className='flex w-full items-center justify-between text-sm leading-tight text-gray-500'>
              {/*  */}
              <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                  <Image src={profile_a} alt='profile' />
                  <p className='whitespace-pre text-left'>{writer}</p>
                  <Rate disabled defaultValue={rating} />
                </div>
              </div>
              {!isEdit && (
                <div className='flex gap-2'>
                  <MdOutlineCreate onClick={onToggleEdit} />
                  <MdClear />
                </div>
              )}
            </span>
            <p className='text-base text-gray-800'>{contents}</p>
            <span className='text-xs font-normal leading-tight text-gray-500'>
              {new Date(createdAt).toLocaleDateString('ko-KR')}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
