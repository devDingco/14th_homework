import { useQuery } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import { FETCH_BOARD } from "./queries"

const useBoardsDetailPage = () => {
    const router = useRouter()
    const params = useParams()

    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: params.boardId
        }
    })
    console.log(data)
    
    const goListHandler = () => {
        router.push('/boards')
    }

    const goUpdateHandler = () => {
        router.push(`/boards/${params.boardId}/edit`)
    }

    return {
        goListHandler,
        goUpdateHandler,
        data
    }
}

export default useBoardsDetailPage