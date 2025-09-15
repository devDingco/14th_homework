import { DeleteBoardCommentDocument, DeleteBoardCommentMutation, DeleteBoardCommentMutationVariables, FetchBoardCommentsDocument, FetchBoardCommentsQuery, FetchBoardCommentsQueryVariables } from "@/commons/gql/graphql"
import { ApolloError, useApolloClient, useMutation } from "@apollo/client"
import { useParams } from "next/navigation"

interface IUseBoardCommentList {
    setComments: React.Dispatch<React.SetStateAction<any>>
}

const useBoardCommentList = (props?: IUseBoardCommentList) => {
    const client = useApolloClient()
    const param = useParams()

    const [deleteBoardCommentAPI] = useMutation<
        DeleteBoardCommentMutation,
        DeleteBoardCommentMutationVariables
    >(DeleteBoardCommentDocument)

    const getBoardComments = async () => {
        try {
            const { data } = await client.query<FetchBoardCommentsQuery, FetchBoardCommentsQueryVariables>({
                query: FetchBoardCommentsDocument,
                variables: {
                    // 하드코딩
                    page: 1,
                    boardId: String(param.boardId)
                },
                fetchPolicy: "network-only"
            })
            props!.setComments(data.fetchBoardComments)
            return data
        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }

    const updateBoardComments = async (event: React.MouseEvent<HTMLImageElement>) => {
        event.stopPropagation()
        alert('아직 구현이 안 됐습니다 :)')
        // const updateBoardCommentPw = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요")
        // console.log('업데이트 댓글 Id: ', event.currentTarget.dataset.key)
        // console.log('비밀번호 : ', updateBoardCommentPw)
    }

    const deleteBoardComments = async (event: React.MouseEvent<HTMLImageElement>) => {
        event.stopPropagation()
        const deleteBoardCommentPw = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요")
        console.log('삭제 댓글 Id: ', event.currentTarget.dataset.key)
        console.log('비밀번호 : ', deleteBoardCommentPw)

        try {
            const result = await deleteBoardCommentAPI({
                variables: {
                    boardCommentId : String(event.currentTarget.dataset.key),
                    password: deleteBoardCommentPw
                }
            })
            console.log("삭제한 게시글 ID: ",result.data?.deleteBoardComment)

        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }

    return {
        getBoardComments,
        updateBoardComments,
        deleteBoardComments
    }
}

export default useBoardCommentList