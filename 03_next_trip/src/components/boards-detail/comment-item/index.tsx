import { profile_a } from '@/assets/icons/icons';
import { BoardComment } from '@/types/gql/graphql';
import { Rate } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import CommentForm from '../comment-write';

export default function CommentItem({
  writer,
  rating,
  contents,
  createdAt,
}: BoardComment) {
  const [isEdit, setIsEdit] = useState(false);

  const onToggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <>
      <button onClick={onToggleEdit}>{isEdit ? '완료' : '수정'}</button>
      {isEdit && <CommentForm />}
      {!isEdit && (
        <div className='mb-10'>
          <div className='mb-2 flex flex-col items-start gap-2'>
            <span className='flex gap-1 text-sm font-bold leading-tight text-gray-800'>
              <div className='flex gap-2'>
                <Image src={profile_a} alt='profile' />
                <p className='whitespace-pre text-left'>{writer}</p>
              </div>
              <Rate disabled defaultValue={rating} />
              {/* <div>
                  <span>작성</span>
                  <span>X</span>
                </div> */}
            </span>
            <p>{contents}</p>
            <span className='text-xs font-normal leading-tight text-gray-500'>
              {new Date(createdAt).toLocaleDateString('ko-KR')}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
