import { FetchBoardQuery } from '@/commons/graphql/graphql';

// export interface BoardVariables {
//   isEdit?: boolean;
//   data?: {
//     fetchBoard: {
//       writer: string;
//       title: string;
//       contents: string;
//       createdAt: string;
//       updatedAt: string;
//     };
//   };
// }

export interface BoardVariables {
  data?: FetchBoardQuery;
  isEdit: boolean;
}

export type Errors = {
  writer?: string;
  password?: string;
  title?: string;
  contents?: string;
};
