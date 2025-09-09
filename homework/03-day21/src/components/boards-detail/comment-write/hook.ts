"use client";

import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { ICreateBoardComment, ICreateBoardCommentVariables } from "./types";
import { CREATE_BOARD_COMMENT } from "./queries";
import { FETCH_BOARD_COMMENTS } from "../comment-list/queries";

export default function useBoardCommentWrite() {
    const params = useParams()
    const boardId = String(params.boardId) 
    
    // const { data } = useQuery(FetchBoardDocument, {
    //     variables: { boardId },
    //     skip: !boardId || !props.isEdit
    // })
  
    // const [writer, setWriter] = useState(props.isEdit ? data?.fetchBoard.writer : "");
    const [writer, setWriter] = useState("");
    const [password, setPassword] = useState("");
    const [contents, setContents] = useState("");
    const [rating, setRating] = useState(0)

    const [inputError, setInputError] = useState("");
    const [isActive, setIsActive] =  useState(false);

    // //useState의 초기값을 props.isEdit에 따라 조건부로 설정
    // const [isActive, setIsActive] =  useState(props.isEdit ? true : false);
    
    const [createBoardComment] = useMutation<
        ICreateBoardComment,
        ICreateBoardCommentVariables
    >(CREATE_BOARD_COMMENT);

    const StarActive = '/images/star-active.png'
    const StarDisabled = '/images/star-disabled.png'

    const onClickStar = (starRating: number) => {
        setRating(starRating)
    }

    const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
        setWriter(e.target.value);
        setIsActive(!!(e.target.value && password && contents));
    };
    
      const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setIsActive(!!(writer && e.target.value && contents));
    };
    
      const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContents(e.target.value);
        setIsActive(!!(writer && password && e.target.value));
    };

    const onClickSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
          const result = await createBoardComment({
            variables: {
              boardId,
              createBoardCommentInput: {
                writer,
                password,
                contents,
                rating,
              },
            },
            refetchQueries: [
              {query: FETCH_BOARD_COMMENTS, variables: { boardId },}
            ], 
          });
    
          if (!result.data?.createBoardComment) {
            setInputError("댓글 등록에 실패했습니다.");
            return;
          }
    
          alert("댓글이 등록되었습니다!");
          setWriter("");
          setPassword("");
          setContents("");
          setRating(0);
        } catch {
          alert("에러가 발생하였습니다. 다시 시도해 주세요.");
        }
    };    
    
    // // 등록 페이지와 수정 페이지의 isActive 조건 분리
    // const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    // setWriter(event.target.value);
    // setIsActive(props.isEdit ? (title && contents) : (event.target.value && password && title && contents));
    // };
    // const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    // setPassword(event.target.value);
    // setIsActive(props.isEdit ? (title && contents) : (writer && event.target.value && title && contents));
    // };
    // const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    // setTitle(event.target.value);
    // setIsActive(props.isEdit ? (event.target.value && contents) : (writer && password && event.target.value && contents));
    // };
    // const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // setContents(event.target.value);
    // setIsActive(props.isEdit ? (title && event.target.value) : (writer && password && title && event.target.value));
    // };

    // const onClickSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    //     try {
    //         const result = await createBoard({
    //             variables: {
    //                 createBoardInput: {
    //                 writer: writer,
    //                 password: password,
    //                 title: title,
    //                 contents: contents,
    //                 youtubeUrl: "",
    //                 images: []
    //                 } ,
    //             },
    //         })
    //         console.log(result.data?.createBoard);

    //         if (result?.data?.createBoard) {
    //         setInputError("");
    //         alert("게시글 등록이 가능한 상태입니다!");
    //         } else {
    //         setInputError("필수입력 사항입니다.");
    //         }

    //         router.push(
    //         `/boards/${result.data?.createBoard._id}`
    //         )
    //     } catch(error){
    //         alert("에러가 발생하였습니다. 다시 시도해 주세요.")
    //     } finally {

    //     }
    // }    


    // const onClickUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
    //     try {

    //         const enteredPassword = prompt("글을 입력할 때 설정한 비밀번호를 입력해주세요.")
    //         if(!enteredPassword) return
            
            
    //         const myvariables: IMyvariables = {
    //             updateBoardInput: {} ,
    //             boardId: boardId,
    //             password: enteredPassword, 
    //         }

    //         if(title !== "") myvariables.updateBoardInput.title = title
    //         if(contents !=="") myvariables.updateBoardInput.contents = contents

    //         const result = await updateBoard({
    //             variables: {
    //                 updateBoardInput: myvariables.updateBoardInput,
    //                 boardId: myvariables.boardId,
    //                 password: enteredPassword,
    //             },
    //             refetchQueries: [
    //                 {query: FETCH_BOARD, variables: {boardId }},
    //             ]                                
    //         })

    //         console.log(result.errors)

    //         if (result?.data?.updateBoard) {
    //             setInputError(""); // 성공하면 에러 메시지 초기화
    //             alert("게시글이 수정되었습니다!");

    //             router.push(`/boards/${result.data.updateBoard._id}`)
    //         }

    //     } catch (error: unknown) {
    //         // 1. error가 객체인지 확인
    //         if (typeof error === "object" && error !== null) {
    //           // 2. graphQLErrors 속성이 있는지 확인
    //           const maybeGraphQLErrors = (error as { graphQLErrors?: { message: string }[] }).graphQLErrors;
          
    //           // 3.GraphQL 오류가 있으면 메시지 확인
    //           if (Array.isArray(maybeGraphQLErrors) && maybeGraphQLErrors.length > 0) {
    //             if (maybeGraphQLErrors[0].message.includes("비밀번호")) {
    //               alert("비밀번호가 틀렸습니다.");
    //               return;
    //             } else {
    //               alert(maybeGraphQLErrors[0].message);
    //               return;
    //             }
    //           }
    //         }
          
    //         // 4. 그 외의 경우 (네트워크 오류 등)
    //         alert("에러가 발생하였습니다. 다시 시도해 주세요.");
    //         console.error(error);
    //     }        

    // }      

    return {
        writer,
        password,
        contents,
        rating,
        StarActive,
        StarDisabled,
        inputError,
        isActive,
        onChangeWriter,
        onChangePassword,
        onChangeContent,
        onClickSubmit,
        onClickStar,
      };
}