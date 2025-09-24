import { useRouter } from "next/navigation"
import useDeleteBoard from "@/commons/api/mutation/useDeleteBoard"

interface IUseBoardsListPage {
    setBoardsData: React.Dispatch<React.SetStateAction<any>>
}

const useBoardsListPage = () => {
    const router = useRouter()
    const { postDeleteBoard } = useDeleteBoard()

    const onDeleteHanlder = (event: React.MouseEvent<HTMLImageElement>) => {
        event.stopPropagation()
        postDeleteBoard(String(event.currentTarget.dataset.key))
    }

    const goDetailHandler = (event: React.MouseEvent<HTMLLIElement>) => {
        router.push(`/boards/${event.currentTarget.dataset.key}`)
    }

    return {
        goDetailHandler,
        onDeleteHanlder
    }
}

export default useBoardsListPage