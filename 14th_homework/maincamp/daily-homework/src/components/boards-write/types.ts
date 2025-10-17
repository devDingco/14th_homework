import { FetchBoardQuery } from '@/commons/graphql/graphql';

export interface BoardVariables {
  data?: FetchBoardQuery;
  isEdit: boolean;
}

export interface FormData {
  writer: string;
  title: string;
  contents: string;
}

export type Errors = {
  writer?: string;
  password?: string;
  title?: string;
  contents?: string;
  images?: string;
  youtubeUrl?: string;
};
