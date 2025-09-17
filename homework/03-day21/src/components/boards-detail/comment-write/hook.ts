"use client";

import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { ICreateBoardComment, ICreateBoardCommentVariables, IUpdateBoardComment, IUpdateBoardCommentVariables } from "./types";
import { CREATE_BOARD_COMMENT, UPDATE_BOARD_COMMENT } from "./queries";
import { FETCH_BOARD_COMMENTS } from "../comment-list/queries";
import { Modal } from "antd";


interface IUseBoardCommentWriteProps {
  isEdit?: boolean
  el?: {
    _id: string
    writer: string
    contents: string
    rating: number
  }
  onCompleted?: () => void // onCompleted 콜백을 prop으로 내려받도록 수정
}

export default function useBoardCommentWrite({ isEdit, el, onCompleted }: IUseBoardCommentWriteProps) {
    const params = useParams()
    const boardId = String(params.boardId) 
    
    // const { data } = useQuery(FetchBoardDocument, {
    //     variables: { boardId },
    //     skip: !boardId || !props.isEdit
    // })
  
    // const [writer, setWriter] = useState(props.isEdit ? data?.fetchBoard.writer : "");


    // [수정] props.isEdit, el을 활용해 초기값 세팅
    const [writer, setWriter] = useState(el?.writer ?? "");
    const [password, setPassword] = useState("");
    const [contents, setContents] = useState(el?.contents ?? "");
    const [rating, setRating] = useState(1)

    const [inputError, setInputError] = useState("");
    const [isActive, setIsActive] =  useState(false);

    // //useState의 초기값을 props.isEdit에 따라 조건부로 설정
    // const [isActive, setIsActive] =  useState(props.isEdit ? true : false);
    
    const [createBoardComment] = useMutation<
        ICreateBoardComment,
        ICreateBoardCommentVariables
    >(CREATE_BOARD_COMMENT);

    const [updateBoardComment] = useMutation<IUpdateBoardComment, IUpdateBoardCommentVariables>(
      UPDATE_BOARD_COMMENT
    )

    // const StarActive = '/images/star-active.png'
    // const StarDisabled = '/images/star-disabled.png'

    // const onClickStar = (starRating: number) => {
    //     setRating(starRating)
    // }

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

    const onChangeRating = (value: number) => {
      setRating(value);
    };  

    const onClickSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
          if (!isEdit){
            // 댓글 등록
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
                { query: FETCH_BOARD_COMMENTS, variables: { boardId, page: 1 } },
              ], 
            });
      
            if (!result.data?.createBoardComment) {
              Modal.error({ content: "댓글 등록에 실패했습니다." })
              return;
            }    
              Modal.success({ content:"댓글이 등록되었습니다!" })
              setWriter("");
              setPassword("");
              setContents("");
              setRating(0);
          } else {
            // 수정
            const result = await updateBoardComment({
              variables: {
                boardCommentId: el!._id,
                password,
                updateBoardCommentInput: { contents, rating },
              },
              refetchQueries: [
                { query: FETCH_BOARD_COMMENTS, variables: { boardId, page: 1 } },
              ],              
            })

            if(!result.data?.updateBoardComment) {
              Modal.error({ content: "댓글 수정에 실패했습니다."})
              return
            }
            Modal.success({content: "댓글이 수정되었습니다!"})
            if (onCompleted) onCompleted()
          }
        } catch (error) {
          Modal.error({ content: "에러가 발생하였습니다. 다시 시도해 주세요." })
        }
    };    
    
    

    return {
        writer,
        password,
        contents,
        rating,
        inputError,
        isActive,
        onChangeWriter,
        onChangePassword,
        onChangeContent,
        onClickSubmit,
        onChangeRating
      };
}