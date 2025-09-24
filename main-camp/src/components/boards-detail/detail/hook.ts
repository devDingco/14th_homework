import { useIsEdit } from "@/commons/provider/isEditProvider"
import { useParams, useRouter } from "next/navigation"

const useBoardsDetailPage = () => {
    const router = useRouter()
    const param = useParams()
    const { setIsEdit } = useIsEdit()

    const goListHandler = () => {
        router.push('/boards')
    }

    const goUpdateHandler = () => {
        setIsEdit(true)
        router.push(`/boards/${param.boardId}/edit`)
    }

    return {
        goListHandler,
        goUpdateHandler
    }
}

export default useBoardsDetailPage