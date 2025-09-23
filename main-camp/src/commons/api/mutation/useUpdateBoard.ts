"use client"

import { FetchBoardDocument, UpdateBoardDocument, UpdateBoardInput, UpdateBoardMutation, UpdateBoardMutationVariables } from "@/commons/gql/graphql"
import { useIsEdit } from "@/commons/provider/isEditProvider"
import { ApolloError, useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"

const useUpdateBoard = () => {
    const router = useRouter()
    const { postData } = useIsEdit()
    
    const [updateBoardAPI] = useMutation<
        UpdateBoardMutation, 
        UpdateBoardMutationVariables
    >(UpdateBoardDocument)

    const postUpdateBoard = async (boardId: string) => {
        const updateBoardInput = boardUpdateSetting(boardId)
        console.log('업데이트 직전: ', updateBoardInput)
        // console.log({...updateBoardInput})
        try {
            const result = await updateBoardAPI({
                variables: {
                    ...updateBoardInput
                },
                refetchQueries: [
                    {
                      query: FetchBoardDocument,
                      variables: { boardId: String(boardId) },
                    },
                ],
            })
            console.log('업데이트 결과: ',result.data?.updateBoard._id)
            router.push(`/boards/${result.data?.updateBoard._id}`)
        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }

    const boardUpdateSetting = (boardId: string) => {
        const inputBoardPw = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요")

        const { writer, ...forUpdateData } = postData
        // 업데이트 시도할 인풋 데이터들
        const updateBoardInput = {
            updateBoardInput: {...forUpdateData} as UpdateBoardInput,
            password: String(inputBoardPw),
            boardId: String(boardId),
        }

        console.log('업데이트된 객체 확인: ', updateBoardInput)
        return updateBoardInput
    }

    return {
        postUpdateBoard
    }
}

export default useUpdateBoard