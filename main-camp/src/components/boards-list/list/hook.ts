import { useRouter } from "next/navigation"
import useDeleteBoard from "@/commons/api/mutation/useDeleteBoard"
import { useIsEdit } from "@/commons/provider/isEditProvider"

interface IUseBoardsListPage {
    setBoardsData: React.Dispatch<React.SetStateAction<any>>
}

const useBoardsListPage = () => {
    const router = useRouter()
    const { setIsEdit } = useIsEdit()
    const { postDeleteBoard } = useDeleteBoard()

    const onDeleteHanlder = async (event: React.MouseEvent<HTMLImageElement>) => {
        event.stopPropagation()
        await postDeleteBoard(String(event.currentTarget.dataset.key))
    }

    const goDetailHandler = (event: React.MouseEvent<HTMLLIElement>) => {
        setIsEdit(true)
        router.push(`/boards/${event.currentTarget.dataset.key}`)
    }

    return {
        goDetailHandler,
        onDeleteHanlder
    }
}

export default useBoardsListPage