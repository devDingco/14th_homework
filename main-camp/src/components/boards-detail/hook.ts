import { useQuery } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import { FETCH_BOARD } from "./queries"

const useBoardsDetailPage = () => {
    const router = useRouter()
    const params = useParams()
    
    let fetchBoard
    try {
        fetchBoard = useQuery(FETCH_BOARD, {
            variables: {
                boardId: params.boardId
            }
        }).data
    } catch(e) {
        console.log(e)
    }
    
    const goListHandler = () => {
        router.push('/boards')
    }

    const goUpdateHandler = () => {
        router.push(`/boards/${params.boardId}/edit`)
    }

    return {
        goListHandler,
        goUpdateHandler,
        fetchBoard
    }
}

export default useBoardsDetailPage