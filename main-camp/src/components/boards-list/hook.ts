import { ApolloError, useApolloClient, useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { IFetchBoardsData } from "./type"
import { DELETE_BOARD, FETCH_BOARDS } from "./queries"
import { DeleteBoardDocument, DeleteBoardMutation, DeleteBoardMutationVariables, FetchBoardsDocument, FetchBoardsQuery, FetchBoardsQueryVariables } from "@/commons/gql/graphql"

const useBoardsListPage = () => {
    const client = useApolloClient();
    const router = useRouter()

    const [deleteBoardAPI] = useMutation<
        DeleteBoardMutation,
        DeleteBoardMutationVariables
    >(DeleteBoardDocument)

    // const boardsData: IFetchBoardsData
    // let boardsCount: IFetchBoardsCount

    const getBoardsList = async () => {
        try {
            const { data } = await client.query<FetchBoardsQuery, FetchBoardsQueryVariables>({
                query: FetchBoardsDocument,
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

    const goDetailHandler = (event: React.MouseEvent<HTMLLIElement>) => {
        router.push(`/boards/${event.currentTarget.dataset.key}`)
    }

    const onDeleteHanlder = async (event: React.MouseEvent<HTMLImageElement>) => {
        console.log(event.currentTarget.dataset.key)
        event.stopPropagation()
        try {
            const result = await deleteBoardAPI({
                variables: {
                    boardId : String(event.currentTarget.dataset.key)
                },
                refetchQueries: [
                    { query: FETCH_BOARDS, variables: { page: 1 } }
                ]
            })
            console.log("삭제한 게시글 ID: ",result.data?.deleteBoard)
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