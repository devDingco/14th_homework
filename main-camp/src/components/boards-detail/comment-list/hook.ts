import useDeleteBoardComment from "@/commons/api/mutation/useDeleteBoardComment"
import { useParams } from "next/navigation"
import { useState } from "react"
import { IOnClickCommentDeleteHandler, IOnClickCommentUpdateHandler, IScrollInfiniteFetchComments } from "./type"
import { FetchBoardCommentsQuery } from "@/commons/gql/graphql"
import { useIsBoardDetail } from "@/commons/provider/isBoardDetailProvider"

const useBoardCommentList = () => {
    const param = useParams()
    const [hasMore, setHasMore] = useState<boolean>(true);

    const { setIsCommentEdit } = useIsBoardDetail()

    const { postDeleteBoardComment } = useDeleteBoardComment()

    const onClickCommentDeleteHandler = (parameter: IOnClickCommentDeleteHandler) => {
        postDeleteBoardComment(parameter.event, Number(parameter.page), String(param.boardId))
        setIsCommentEdit({
            commentId: 0,
            isUpdate: false
        })
    }

    const onClickCommentUpdateHandler = (parameter: IOnClickCommentUpdateHandler) => {
        parameter.event.stopPropagation()
        setIsCommentEdit({
            commentId: Number(parameter.event.currentTarget.id),
            isUpdate: true
        })
    }

    const scrollInfiniteFetchComments = (parameter: IScrollInfiniteFetchComments) => {
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
        onClickCommentDeleteHandler,
        onClickCommentUpdateHandler,
        scrollInfiniteFetchComments,
        hasMore
    }
}

export default useBoardCommentList