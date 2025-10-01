"use client"

import { UploadFileDocument, UploadFileMutation, UploadFileMutationVariables } from "@/commons/gql/graphql"
import { useIsEdit } from "@/commons/provider/isEditProvider"
import { IPostData } from "@/commons/provider/type"
import { ApolloError, useMutation } from "@apollo/client"

//const result = await uploadFile({ variables: { file } });

export const useUploadFile = () => {
    const { postData, isEdit, setPostData } = useIsEdit()

    const [uploadFileAPI] = useMutation<
        UploadFileMutation,
        UploadFileMutationVariables
    >(UploadFileDocument)

    const postUploadFile = async (file: File | undefined) => {
        try {
            console.log('업로드 이미지 직전: ',file)
            
            const result = await uploadFileAPI({
                variables: {
                    file: file
                },
            })
            if (isEdit) {
                console.log('수정페이지맞지?')
                setPostData((prev: IPostData) => ({
                    ...prev,
                    images: [...(prev.images ?? []), result.data?.uploadFile.url]
                }))
            } else {
                postData.images?.push(result.data?.uploadFile.url ?? "")
            }
            

        } catch(e: unknown) {
            if (e instanceof ApolloError) {
                e.graphQLErrors.forEach((e) => {
                    alert(`${e.message}`)
                });
            }
        }
    }
    
    return {
        postUploadFile
    }
}

export default useUploadFile