import { MutationLoginUserArgs } from '@/commons/graphql/graphql';

// 타입 O => 에디터 검사(빨간줄) :컴파일시점
export interface ISchema
  extends Pick<MutationLoginUserArgs, 'email' | 'password'> {}
