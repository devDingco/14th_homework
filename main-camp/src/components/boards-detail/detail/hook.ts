import { useParams, useRouter } from "next/navigation"

const useBoardsDetailPage = () => {
    const router = useRouter()
    const param = useParams()
    
    const goListHandler = () => {
        router.push('/boards')
    }

    const goUpdateHandler = () => {
        router.push(`/boards/${param.boardId}/edit`)
    }

    return {
        goListHandler,
        goUpdateHandler
    }
}

export default useBoardsDetailPage