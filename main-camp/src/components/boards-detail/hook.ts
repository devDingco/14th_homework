import { ApolloError, useApolloClient } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import { FETCH_BOARD } from "./queries"

const useBoardsDetailPage = () => {
    const client = useApolloClient();
    const router = useRouter()
    const param = useParams()
    
    const getBoardDetail = async () => {
        try {
            const { data } = await client.query({
                query: FETCH_BOARD,
                variables: {
                    boardId: param.boardId,
                }                
            })
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