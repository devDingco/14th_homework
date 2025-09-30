import { CreateBoardInput } from '@/commons/graphql/graphql';

import z from 'zod';
// 타입 O => 에디터 검사(빨간줄) :컴파일시점
export interface ISchema
  extends Pick<
    CreateBoardInput,
    'title' | 'writer' | 'password' | 'contents'
  > {}

export const schema = z.object({
  title: z.string().min(2, { message: '제목은 2자 이상 입력해 주세요' }),
  writer: z.string().optional(),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자리 이상 입력해 주세요' })
    .max(16, { message: '비밀번호는 최대 16자리로 입력해 주세요' }),
  contents: z.string().optional(),
});
