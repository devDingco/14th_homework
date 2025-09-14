import { ApolloError, useApolloClient } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import { FetchBoardDocument, FetchBoardQuery, FetchBoardQueryVariables } from "@/commons/gql/graphql";

const useBoardsDetailPage = () => {
    const client = useApolloClient();
    const router = useRouter()
    const param = useParams()

    const getBoardDetail = async () => {
        try {
            console.log('확인')
            const { data } = await client.query<FetchBoardQuery, FetchBoardQueryVariables>({
                query: FetchBoardDocument,
                variables: {
                    boardId: String(param.boardId),
                }
            })
            console.log(data)
            return data
        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }
    
    const goListHandler = () => {
        router.push('/boards')
    }

    const goUpdateHandler = () => {
        router.push(`/boards/${param.boardId}/edit`)
    }

    return {
        goListHandler,
        goUpdateHandler,
        getBoardDetail
    }
}

export default useBoardsDetailPage