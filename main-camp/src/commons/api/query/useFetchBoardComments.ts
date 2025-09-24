import { ApolloError, useQuery } from "@apollo/client";
import { FetchBoardCommentsDocument, FetchBoardCommentsQuery, FetchBoardCommentsQueryVariables } from "../../gql/graphql";
import { IUseFetchBoardComments } from "../type";

const useFetchBoardComments = (props: IUseFetchBoardComments) => {
    let getData
    try {
        const { data, loading, error, refetch, fetchMore } = useQuery<
            FetchBoardCommentsQuery,
            FetchBoardCommentsQueryVariables
        >(FetchBoardCommentsDocument, {
            variables: {
                page: props?.page ?? 1,
                boardId: String(props.boardId)
            },
            fetchPolicy: "cache-and-network",
        })
        getData = { data, loading, error, refetch, fetchMore } 
    } catch(e: unknown) {
        if (e instanceof ApolloError) {
            e.graphQLErrors.forEach((e) => {
                alert(`${e.message}`)
            })
        }
    }

    console.log('댓글 fetchBaordComments 확인: ',getData?.data?.fetchBoardComments)
    return {
        boardComments: getData?.data?.fetchBoardComments,
        boardCommentsLoading: getData?.loading,
        boardCommentsError: getData?.error,
        boardCommentsRefetch: getData?.refetch,
        boardCommentsFetchMore: getData?.fetchMore
    };
}

export default useFetchBoardComments