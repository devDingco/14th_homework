'use client';
import {
  BoardComment,
  CreateBoardCommentDocument,
  // CreateBoardCommentMutation,
  // CreateBoardCommentMutationVariables,
} from '@/types/gql/graphql';
import { useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { MdChatBubbleOutline } from 'react-icons/md';
import InputBox from '@/components/common/InputBox';

import { Rate } from 'antd';
import { FETCH_BOARD_COMMENTS } from '@/apis/graphql/boardComment.gql';

const initComment = {
  writer: '',
  password: '',
  contents: '',
  rating: 3,
};

type CommentFormProps = {
  isEdit?: boolean;
  comment?: BoardComment;
  onToggleEdit?: () => void;
};

export default function CommentForm({
  isEdit,
  comment,
  onToggleEdit,
}: CommentFormProps) {
  const [commentForm, setCommentForm] = useState({ ...initComment });
  const { boardId } = useParams();
  const [rating, setRating] = useState(initComment.rating);

  const onChangeCommentData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCommentForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const [createBoardComment] = useMutation<
  //   CreateBoardCommentMutation,
  //   CreateBoardCommentMutationVariables
  // >(CreateBoardCommentDocument);

  useEffect(() => {
    if (isEdit && comment) {
      setCommentForm({
        writer: comment.writer || 'USER01',
        password: '',
        contents: comment.contents,
        rating: comment.rating,
      });
      setRating(comment.rating);
    }
  }, [isEdit, comment]);

  const [createBoardComment] = useMutation(CreateBoardCommentDocument);

  const onHandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(boardId);
      const result = await createBoardComment({
        variables: {
          createBoardCommentInput: { ...commentForm, rating },
          boardId: String(boardId),
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: String(boardId), page: 1 },
          },
        ],
        awaitRefetchQueries: true,
      });
      console.log(result);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setCommentForm({ ...initComment });
      setRating(3);
    }
  };

  console.log(isEdit);
  console.log(comment);

  return (
    <div className='flex w-full flex-col items-start gap-10'>
      <div className='flex w-full flex-col items-start gap-2'>
        <div className='flex w-full items-center gap-2'>
          <MdChatBubbleOutline />
          <div className='text-base font-semibold leading-normal text-black'>
            댓글
          </div>
        </div>
        <form
          className='flex w-full flex-col items-end justify-center gap-4'
          onSubmit={onHandleSubmit}
        >
          <div className='flex w-full items-center gap-2'>
            <Rate onChange={setRating} value={rating} />
          </div>
          <div className='flex w-full flex-col gap-4'>
            <InputBox
              label='작성자'
              name='writer'
              type='text'
              placeholder='작성자'
              value={commentForm.writer}
              isInput={commentForm.writer}
              onChange={onChangeCommentData}
              required
            />
            <InputBox
              label='비밀번호'
              name='password'
              type='password'
              placeholder='비밀번호'
              value={commentForm.password}
              isInput={commentForm.password}
              onChange={onChangeCommentData}
              required
            />
          </div>
          <div className='relative w-full'>
            <textarea
              onChange={onChangeCommentData}
              rows={4}
              name='contents'
              value={commentForm.contents}
              className='flex h-36 w-full flex-col items-start rounded-lg px-4 py-3 text-base font-normal leading-normal text-gray-400 outline outline-1 outline-offset-[-1px] outline-gray-300'
              placeholder='댓글을 입력해 주세요.'
            />
            <div className='absolute bottom-4 right-4 text-base font-medium leading-normal text-gray-400'>
              0/100
            </div>
          </div>
          {isEdit && (
            <button
              className='h-12 w-[76px] items-center gap-2 rounded-lg bg-white px-3 py-2 text-center text-sm font-semibold leading-normal text-black'
              onClick={onToggleEdit}
            >
              취소
            </button>
          )}
          <button className='h-12 w-[76px] items-center gap-2 rounded-lg bg-black px-3 py-2 text-center text-sm font-semibold leading-normal text-white'>
            댓글 등록
          </button>
        </form>
      </div>
    </div>
  );
}
