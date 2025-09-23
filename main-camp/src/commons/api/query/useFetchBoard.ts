import { ApolloError, useQuery } from "@apollo/client";
import { FetchBoardDocument, FetchBoardQuery, FetchBoardQueryVariables } from "../../gql/graphql";
import { IUseFetchBoard } from "../type";

const useFetchBoard = (props: IUseFetchBoard) => {
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
        boardDetail: getData?.data?.fetchBoard,
        boardLoading: getData?.loading,
        boardError: getData?.error,
        boardRefetch: getData?.refetch,
    };
}

export default useFetchBoard