import { FetchBoardDetailQuery } from "@/commons/gql/graphql";

export interface IUseBoardsDetail {
  data?: FetchBoardDetailQuery; //undefined 가능성 반영
  formatDate: (isoString: string) => string;
  handleRouter: () => void;
}