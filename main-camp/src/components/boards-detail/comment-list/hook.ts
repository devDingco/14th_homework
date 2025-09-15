import { FetchBoardCommentsDocument, FetchBoardCommentsQuery, FetchBoardCommentsQueryVariables } from "@/commons/gql/graphql"
import { ApolloError, useApolloClient } from "@apollo/client"
import { useParams } from "next/navigation"

interface IUseBoardCommentList {
    setComments: React.Dispatch<React.SetStateAction<any>>
}

const useBoardCommentList = (props: IUseBoardCommentList) => {
    const client = useApolloClient()
    const param = useParams()

    const getBoardComments = async () => {
        try {
            const { data } = await client.query<FetchBoardCommentsQuery, FetchBoardCommentsQueryVariables>({
                query: FetchBoardCommentsDocument,
                variables: {
                    // 하드코딩
                    page: 1,
                    boardId: String(param.boardId)
                },
                fetchPolicy: "network-only"
            })
            props.setComments(data.fetchBoardComments)
            return data
        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }

    return {
        getBoardComments
    }
}

export default useBoardCommentList