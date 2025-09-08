"use client";

import {  useMutation, useQuery } from "@apollo/client"
import { ChangeEvent, MouseEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD,  } from "./queries";
import { IMyvariables, IUseBoardsWriteProps } from "./types";
import { CreateBoardDocument, CreateBoardMutation, CreateBoardMutationVariables, FetchBoardDocument, UpdateBoardDocument, UpdateBoardMutation, UpdateBoardMutationVariables } from "@/commons/graphql/graphql";

export default function useBoardsWrite(props: IUseBoardsWriteProps) {
    const router = useRouter()
    const params = useParams()
    const boardId = String(params.boardId) 
    const { data } = useQuery(FetchBoardDocument, {
        variables: { boardId },
        skip: !boardId || !props.isEdit
    })
  
    const [writer, setWriter] = useState(props.isEdit ? data?.fetchBoard.writer : "");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState(props.isEdit ? data?.fetchBoard.title : "");
    const [contents, setContents] = useState(props.isEdit ? data?.fetchBoard.contents : "");

    const [inputError, setInputError] = useState("");
    // //useState의 초기값을 props.isEdit에 따라 조건부로 설정
    const [isActive, setIsActive] =  useState(props.isEdit ? true : false);

    // // 등록 페이지와 수정 페이지의 isActive 조건 분리
    const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    setIsActive(props.isEdit ? (title && contents) : (event.target.value && password && title && contents));
    };
    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsActive(props.isEdit ? (title && contents) : (writer && event.target.value && title && contents));
    };
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsActive(props.isEdit ? (event.target.value && contents) : (writer && password && event.target.value && contents));
    };
    const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
    setIsActive(props.isEdit ? (title && event.target.value) : (writer && password && title && event.target.value));
    };

    const [createBoard] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument) 
    const [updateBoard] = useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument)

    const onClickSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        try {
            const result = await createBoard({
                variables: {
                    createBoardInput: {
                    writer: writer,
                    password: password,
                    title: title,
                    contents: contents,
                    youtubeUrl: "",
                    images: []
                    } ,
                },
            })
            console.log(result.data?.createBoard);

            if (result?.data?.createBoard) {
            setInputError("");
            alert("게시글 등록이 가능한 상태입니다!");
            } else {
            setInputError("필수입력 사항입니다.");
            }

            router.push(
            `/boards/${result.data?.createBoard._id}`
            )
        } catch(error){
            alert("에러가 발생하였습니다. 다시 시도해 주세요.")
        } finally {

        }
    }    


    const onClickUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
        try {

            const enteredPassword = prompt("글을 입력할 때 설정한 비밀번호를 입력해주세요.")
            if(!enteredPassword) return
            
            
            const myvariables: IMyvariables = {
                updateBoardInput: {} ,
                boardId: boardId,
                password: enteredPassword, 
            }

            if(title !== "") myvariables.updateBoardInput.title = title
            if(contents !=="") myvariables.updateBoardInput.contents = contents

            const result = await updateBoard({
                variables: {
                    updateBoardInput: myvariables.updateBoardInput,
                    boardId: myvariables.boardId,
                    password: enteredPassword,
                },
                refetchQueries: [
                    {query: FETCH_BOARD, variables: {boardId }},
                ]                                
            })

            console.log(result.errors)

            if (result?.data?.updateBoard) {
                setInputError(""); // 성공하면 에러 메시지 초기화
                alert("게시글이 수정되었습니다!");

                router.push(`/boards/${result.data.updateBoard._id}`)
            }

        } catch (error: unknown) {
            // 1. error가 객체인지 확인
            if (typeof error === "object" && error !== null) {
              // 2. graphQLErrors 속성이 있는지 확인
              const maybeGraphQLErrors = (error as { graphQLErrors?: { message: string }[] }).graphQLErrors;
          
              // 3.GraphQL 오류가 있으면 메시지 확인
              if (Array.isArray(maybeGraphQLErrors) && maybeGraphQLErrors.length > 0) {
                if (maybeGraphQLErrors[0].message.includes("비밀번호")) {
                  alert("비밀번호가 틀렸습니다.");
                  return;
                } else {
                  alert(maybeGraphQLErrors[0].message);
                  return;
                }
              }
            }
          
            // 4. 그 외의 경우 (네트워크 오류 등)
            alert("에러가 발생하였습니다. 다시 시도해 주세요.");
            console.error(error);
        }
          
        // catch(error: unknown){
        //     if(error.graphQLErrors?.[0]?.message.includes("비밀번호")) {
        //         alert("비밀번호가 틀렸습니다.")
        //     } else {
        //         alert("에러가 발생하였습니다. 다시 시도해 주세요.")
        //     }
        // }
    }    

    // //  data가 로드되지 않았을 경우 null을 반환하여 렌더링을 막음
    // if (props.isEdit && !data) return null;

    return {
        onChangeWriter,
        onChangeTitle,
        onChangePassword,
        onChangeContent,
        onClickSubmit,
        onClickUpdate,
        inputError, 
        isActive,
        password,      
    };
  
}
