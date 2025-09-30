import { FetchBoardCommentsQuery } from "@/commons/gql/graphql";

export interface ICommentListItem {
  data?: FetchBoardCommentsQuery | undefined;
}

//   _id: string;
//     writer: string;
//     rating: number;
//     contents: string;
//     createdAt: string;
