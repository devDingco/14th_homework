import { ApolloError, useApolloClient, useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { IFetchBoardsData } from "./type"
import { DELETE_BOARD, FETCH_BOARDS } from "./queries"

const useBoardsListPage = () => {
    const client = useApolloClient();
    const router = useRouter()

    const [deleteBoard] = useMutation(DELETE_BOARD)

    // const boardsData: IFetchBoardsData
    // let boardsCount: IFetchBoardsCount

    const getBoardsList = async () => {
        try {
            const { data } = await client.query({
                query: FETCH_BOARDS,
                variables: {
                    // 하드코딩
                    page: 1
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
    
    // boardsCount = useQuery(FETCH_BOARDS_COUNT).data
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
        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }

    return {
        goDetailHandler,
        onDeleteHanlder,
        getBoardsList
    }
}

export default useBoardsListPage