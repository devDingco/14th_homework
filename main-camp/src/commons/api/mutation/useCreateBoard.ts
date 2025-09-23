"use client"

import { CreateBoardDocument, CreateBoardInput, CreateBoardMutation, CreateBoardMutationVariables, FetchBoardDocument } from "@/commons/gql/graphql"
import { useIsEdit } from "@/commons/provider/isEditProvider"
import { ApolloError, useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"

// 전역 스테이트 사용 - postData
const useCreateBoard = () => {
    const router = useRouter()
    const { postData } = useIsEdit()
     
    const [createBoardAPI] = useMutation<
        CreateBoardMutation,
        CreateBoardMutationVariables
    >(CreateBoardDocument)

    const postCreateBoard = async (boardId: string) => {
        const createBoardInput = boardCreateSetting()

        console.log('직전 확인! ',createBoardInput)
        
        try {
            // createBoard 게시글 등록
            const result = await createBoardAPI({
                variables: {
                    createBoardInput: {
                        ...createBoardInput
                    } as CreateBoardInput
                },
                refetchQueries: [
                    {
                      query: FetchBoardDocument,
                      variables: { boardId: String(boardId) },
                    },
                ],
            })
            router.push(`/boards/${result.data?.createBoard._id}`)
        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }

    const boardCreateSetting = () => {
        console.log("createBoard 전에 데이터 정리! ", postData)
        if (Object.values(postData.boardAddress ?? {}).filter(v => v === "").length > 0) {
            const { boardAddress, ...updateData } = postData
            return Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== ""))
        } else {
            return Object.fromEntries(Object.entries(postData).filter(([_, v]) => v !== ""))
        }
    }

    return {
        postCreateBoard
    }
}

export default useCreateBoard