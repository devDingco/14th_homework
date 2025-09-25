import useDeleteBoardComment from "@/commons/api/mutation/useDeleteBoardComment"
import { useIsModal } from "@/commons/provider/isModalProvider"
import { useParams } from "next/navigation"
import { useState } from "react"
import { IBoardsCommentList } from "./type"
import { FetchBoardCommentsQuery } from "@/commons/gql/graphql"

const useBoardCommentList = () => {
    const param = useParams()
    const [hasMore, setHasMore] = useState<boolean>(true);
    const { postDeleteBoardComment } = useDeleteBoardComment()
    const { setIsWarningModal } = useIsModal()

    const updateBoardComments = async (event: React.MouseEvent<HTMLImageElement>) => {
        event.stopPropagation()
        // alert('아직 구현이 안 됐습니다 :)')
        setIsWarningModal({open: true, value: '아직 구현이 안 됐습니다 :)'})
        // const updateBoardCommentPw = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요")
        // console.log('업데이트 댓글 Id: ', event.currentTarget.dataset.key)
        // console.log('비밀번호 : ', updateBoardCommentPw)
    }

    const onClickCommentDeleteHandler = (event: React.MouseEvent<HTMLImageElement>) => {
        postDeleteBoardComment(event, String(param.boardId))
    }

    const onClickCommentUpdateHandler = async (event: React.MouseEvent<HTMLImageElement>) => {
        await updateBoardComments(event)
    }

    const scrollInfiniteFetchComments = (parameter: IBoardsCommentList) => {
        if (parameter.boardComments === undefined) return
        if (parameter.boardCommentsFetchMore === undefined) return

        parameter.boardCommentsFetchMore({
            variables: { page: Math.ceil((parameter.boardComments.length ?? 10) / 10) + 1 },
            
            updateQuery: (prev: FetchBoardCommentsQuery, { fetchMoreResult }:any ) => {
                if (!fetchMoreResult.fetchBoardComments?.length) {
                    setHasMore(false);
                    return;
                }
      
                return {
                    fetchBoardComments: [...prev.fetchBoardComments, ...fetchMoreResult.fetchBoardComments],
                };
            },
        });
    }

    return {
        updateBoardComments,
        onClickCommentDeleteHandler,
        onClickCommentUpdateHandler,
        scrollInfiniteFetchComments,
        hasMore
    }
}

export default useBoardCommentList