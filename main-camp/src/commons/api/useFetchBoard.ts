import { ApolloError, useQuery } from "@apollo/client";
import { FetchBoardDocument, FetchBoardQuery, FetchBoardQueryVariables } from "../gql/graphql";

interface IUseFetchBoard {
    boardId: string | string[]
}

const useFetchBoard = (props: IUseFetchBoard) => {
    console.log('useFectchBoard 진입?')
    let getData
    try {
        const { data, loading, error, refetch } = useQuery<
            FetchBoardQuery,
            FetchBoardQueryVariables
        >(FetchBoardDocument, {
            variables: {
                boardId: String(props.boardId) 
            },
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
        board: getData?.data,
        loading: getData?.loading,
        error: getData?.error,
        refetch: getData?.refetch,
    };
}

export default useFetchBoard