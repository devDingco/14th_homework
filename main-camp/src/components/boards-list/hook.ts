import { useMutation, useQuery } from "@apollo/client"
import { useRouter } from "next/navigation"
import { IFetchBoardsData } from "./type"
import { DELETE_BOARD, FETCH_BOARDS } from "./queries"

const useBoardsListPage = () => {
    const router = useRouter()

    const [deleteBoard] = useMutation(DELETE_BOARD)

    // const boardsData: IFetchBoardsData
    // let boardsCount: IFetchBoardsCount

    const boardsData: IFetchBoardsData = useQuery(FETCH_BOARDS, {
        variables: {
            // 하드코딩
            page: 1
        }
    }).data

    // boardsCount = useQuery(FETCH_BOARDS_COUNT).data
    
    console.log(boardsData?.fetchBoards)
    // console.log(boardsCount?.fetchBoardsCount)

    const goDetailHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        router.push(`/boards/${event.currentTarget.dataset.key}`)
    }

    const onDeleteHanlder = async (event: React.MouseEvent<HTMLImageElement>) => {
        console.log(event.currentTarget.dataset.key)
        
        try {
            const result = await deleteBoard({
                variables: {
                    boardId : event.currentTarget.dataset.key
                },
                refetchQueries: [
                    { query: FETCH_BOARDS, variables: { page: 1 } }
                ]
            })
            console.log("삭제한 게시글 ID: ",result.data.deleteBoard)
            alert("게시글이 삭제되었습니다!")
        } catch(e) {
            console.log(e)
        }
    }

    return {
        goDetailHandler,
        onDeleteHanlder,
        boardsData
    }
}

export default useBoardsListPage