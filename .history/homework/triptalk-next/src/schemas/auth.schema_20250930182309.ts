import {
  CreateBoardInput,
  MutationLoginUserArgs,
} from '@/commons/graphql/graphql';
import z from 'zod';
// 타입 O => 에디터 검사(빨간줄) :컴파일시점
export interface ISchema
  extends Pick<
    CreateBoardInput,
    'title' | 'writer' | 'password' | 'contents'
  > {}

export const schema = z.object({
  title: z.string().min(2, { message: '' }),
});
