import {MutationLoginUserArgs} from '@/commons/graphql/graphql'

export interface ISchema extends Pick<MutationLoginUserArgs,'email'
|'password'>