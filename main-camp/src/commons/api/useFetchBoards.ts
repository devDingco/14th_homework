import { ApolloError, useQuery } from "@apollo/client";
import { FetchBoardsDocument, FetchBoardsQuery, FetchBoardsQueryVariables } from "../gql/graphql";
import { IUseFetchBoards } from "./type";

const useFetchBoards = (props?: IUseFetchBoards) => {
    console.log("fetchBoards 실행")
    let getData
    try {
        const { data, loading, error, refetch } = useQuery<
            FetchBoardsQuery,
            FetchBoardsQueryVariables
        >(FetchBoardsDocument, {
            variables: {
                page: props?.page ?? 1
            },
            fetchPolicy: "cache-only",
        })
        getData = { data, loading, error, refetch } 
    } catch(e: unknown) {
        if (e instanceof ApolloError) {
            e.graphQLErrors.forEach((e) => {
                alert(`${e.message}`)
            })
        }
    }

    return {
        boards: getData?.data?.fetchBoards,
        boardsLoading: getData?.loading,
        boardsError: getData?.error,
        boardsRefetch: getData?.refetch,
    };
}

export default useFetchBoards