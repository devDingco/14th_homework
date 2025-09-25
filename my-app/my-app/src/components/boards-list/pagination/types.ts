import { Exact, FetchBoardsQuery, InputMaybe } from "@/commons/gql/graphql";
import { ApolloQueryResult } from "@apollo/client";

export interface IPagination {
  page?: number;
  lastPage: number;
  refetch: (
    variables?:
      | Partial<Exact<{ page?: InputMaybe<number> | undefined }>>
      | undefined
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
  data?: FetchBoardsQuery | undefined;
}
// ?를 안 붙이면 무조건 넘겨야함!!
