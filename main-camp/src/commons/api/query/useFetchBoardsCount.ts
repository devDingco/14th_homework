import { FetchBoardsCountDocument, FetchBoardsCountQuery, FetchBoardsCountQueryVariables } from "@/commons/gql/graphql"
import { ApolloError, useQuery } from "@apollo/client"

const useFetchBoardsCount = () => {
    let getData
    try {
        const { data, loading, error, refetch } = useQuery<
            FetchBoardsCountQuery,
            FetchBoardsCountQueryVariables
        >(FetchBoardsCountDocument, {
            fetchPolicy: "cache-and-network",
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
        boardsCount: getData?.data?.fetchBoardsCount,
        boardsCountLoading: getData?.loading,
        boardsCountError: getData?.error,
        boardsCountRefetch: getData?.refetch,
    };
}

export default useFetchBoardsCount