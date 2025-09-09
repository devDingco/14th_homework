import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
// import { CREATE_BOARD, FETCH_BOARD_EDIT, UPDATE_BOARD } from "./queries";
import React, { useEffect, useState } from "react";
import { IUseBoardWriteProps } from "./types";
import { CreateBoardDocument, CreateBoardMutation, CreateBoardMutationVariables, FetchBoardEditDocument, FetchBoardEditQuery, FetchBoardEditQueryVariables, UpdateBoardDocument, UpdateBoardMutation, UpdateBoardMutationVariables } from "@/commons/gql/graphql";

export const useBoardWrite = ({ isEdit, boardId }: IUseBoardWriteProps) => {
    const router = useRouter();
    const params = useParams();
  
    const id = isEdit ? boardId ?? (params.boardId as string) : ""; // URL에서 가져오기
  
    const [RegisterFunction] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument);
    const [UpdateFunction] = useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument);
  
    const [writer, setWriter] = React.useState<string | undefined>();
    const [password, setPassword] = React.useState<string | undefined>();
    const [title, setTitle] = React.useState<string | undefined>();
    const [contents, setContents] = React.useState<string | undefined>();
  
    const [loading, setLoading] = useState(false); // API 호출 중에는 버튼을 비활성화
  
  
    // 수정 모드일 때 기존 게시글 불러오기
    const { data } = useQuery<FetchBoardEditQuery, FetchBoardEditQueryVariables>(FetchBoardEditDocument, {
      variables: { boardId: id || "" },
      skip: !isEdit || !id,
    });
  
   // 게시글 데이터와 비밀번호 prompt 처리
    useEffect(() => {
     if (isEdit && data?.fetchBoard && password === undefined) {
       setWriter(data.fetchBoard.writer ?? "");
       setTitle(data.fetchBoard.title ?? "");
       setContents(data.fetchBoard.contents ?? "");
   
       // 페이지 진입 시 prompt로 비밀번호 입력
       const 입력받은비밀번호 = prompt(
        "글을 작성할 때 입력한 비밀번호를 입력해주세요."
      );
  
      if (!입력받은비밀번호) {
        alert("비밀번호를 입력해야 수정할 수 있습니다.");
        router.back();
        return;
      }
  
      setPassword(입력받은비밀번호);
      }
    }, [isEdit, data, password, router]);
  
    const handleSubmit = async () => {
      // 1. 입력값 체크
      if (!writer || !password || !title || !contents) {
        alert("모든 필수 입력값을 채워주세요.");
        return;
      }
  
      if (loading) return; // 이미 요청 중이면 함수 종료(API 호출 중에는 버튼을 비활성화)
  
      setLoading(true); // API 호출 시작
  
      // 2. API 호출
      try {
        const result = await RegisterFunction({
          variables: {
            createBoardInput: { writer, password, title, contents },
          },
        });
  
        const createdId = result.data?.createBoard?._id;
        if (createdId) {
          alert("게시글 등록이 완료되었습니다!");
          router.push(`/boards/${createdId}`);
        }
      } catch (error) {
        console.error("등록 중 오류 발생:", error);
        alert("게시글 등록 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
  
    const handleUpdate = async () => {
      
          // 1. 입력값 체크
          if (!writer || !title || !contents) {
              alert("모든 필수 입력값을 채워주세요.");
              return;
            }
        
            if (loading) return; // 이미 요청 중이면 함수 종료(API 호출 중에는 버튼을 비활성화)
        
            setLoading(true); // API 호출 시작
        
            // 2. API 호출
            try {
              const result = await UpdateFunction({
                variables: {
                  boardId: id,
                  password,
                  updateBoardInput: { title, contents },
                },
              });
        
              const updatedId = result.data?.updateBoard?._id;
              if (updatedId) {
                alert("게시글 수정이 완료되었습니다!");
                router.push(`/boards/${updatedId}`);
              }
            } catch (error) {
              console.error("수정 중 오류 발생:", error);
              alert("게시글 수정 중 오류가 발생했습니다.");
            } finally {
              setLoading(false);
            }
          };
          
          return {
            writer,
            setWriter,
            password,
            setPassword,
            title,
            setTitle,
            contents,
            setContents,
            loading,
            handleSubmit,
            handleUpdate,
          };
  
}