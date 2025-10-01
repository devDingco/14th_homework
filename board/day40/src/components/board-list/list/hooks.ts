"use client"

import { useMutation, useQuery } from "@apollo/client"
import { FETCH_BOARDS } from "./queries"
import { DeleteBoardDocument, DeleteBoardMutation, DeleteBoardMutationVariables, FetchBoardDocument, FetchBoardQuery, FetchBoardQueryVariables, FetchBoardsDocument, FetchBoardsQuery, FetchBoardsQueryVariables } from "@/commons/graphql/graphql"
import { useState } from "react"






export default function useBoardsPage() {



    const { data } = useQuery<FetchBoardsQuery, FetchBoardsQueryVariables>(FetchBoardsDocument)
    const [deleteBoard] = useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(DeleteBoardDocument)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saveId, setSaveId] = useState("");
    console.log(data);

    const handleOk = async (event:React.MouseEvent<HTMLImageElement> ) => {
        event.preventDefault();
        await deleteBoard({
            variables: {
                boardId: saveId
            },
            refetchQueries: [
                { query: FETCH_BOARDS }
            ]
        })
        alert(`삭제 완료`)
        setIsModalOpen(false);
    }

    const showModal = (event) => {
        event.preventDefault();
        setSaveId(event.currentTarget.id);
        setIsModalOpen(true);
    };

    // const handleOk = () => {

        
    //     setIsModalOpen(false);
    // };

    const handleCancel = (event) => {
        event.preventDefault();
        setIsModalOpen(false);
    };

    return {
        data,
        // onclickDelete,
        showModal,
        handleOk,
        handleCancel,
        isModalOpen,
        saveId
        
    }

    
}