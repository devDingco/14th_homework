import { useMutation } from '@apollo/client'
import { useParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { FETCH_COMMENTS, CREATE_COMMENT, UPDATE_BOARD_COMMENT } from './queries'
import { Modal } from "antd";
import { ApolloError } from "@apollo/client";

import { IMyvariables, IUseCommentWriteProps } from './types';






export default function useCommentWrite(props: IUseCommentWriteProps) {
  const { boardId } = useParams()
  const [writer, setWriter] = useState('')
  const [password, setPassword] = useState('')
  const [contents, setContents] = useState('')
  const [rating, setRating] = useState(3)
  const [isComments,setIsComments ] = useState(false)

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value)
  }
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const onChangeContents = (e:ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value)
  }

  const [createBoardComment] = useMutation(CREATE_COMMENT)

  const onSubmit = async () => {
    if (!writer || !password || !contents) {
      // alert('작성자, 비밀번호, 내용을 모두 입력해주세요.')
      Modal.error({ content: "작성자, 비밀번호, 내용을 모두 입력해주세요" });
      
      
      return
    }

    try {
      await createBoardComment({
        variables: {
          createBoardCommentInput: { writer, password, rating, contents },
          boardId,
        },
        refetchQueries: [
          { 
            query: FETCH_COMMENTS , 
            variables: { boardId, page: 1 } 
          }
        ],
      })
      
      setWriter('')
      setPassword('')
      setContents('')
      setRating(3)
      setIsComments(true)
      Modal.success({ content: "댓글이 등록되었습니다" });
      // alert('댓글이 등록되었습니다')
    } catch (error) {
      // alert("에러가 발생했습니다 다시 시도해주세요")
       Modal.error({ content: "에러가 발생했습니다 다시 시도해주세요" });
    }
}

  const onClickCancel =()=>{
    props.setIsEdit(false)
  }
  const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT)
  


  const onClickUpdate = async () => {
    const checkPassword = prompt("비밀번호를 입력해주세요.");
    if (!checkPassword) return;

   
    const myvariables:IMyvariables = {
  boardCommentId: String(props.el?._id),
  password: checkPassword,
  updateBoardCommentInput: {},
  };

if (contents !== "") {
  myvariables.updateBoardCommentInput.contents = contents;
}
if (rating !== 0) {
  myvariables.updateBoardCommentInput.rating = rating;
}


try {
  const result = await updateBoardComment({
    variables: myvariables,
     refetchQueries: [{ query: FETCH_COMMENTS }]
  });
  
  Modal.success({ content: "댓글이 수정되었습니다" });
  props.setIsEdit(false);
  // router.push(`/boards/${result.data.updateBoard._id}`);
} catch (error: unknown) {
  if (error instanceof ApolloError) {
    if (error.graphQLErrors?.[0]) {
      // alert(error.graphQLErrors[0].message);
      Modal.error({ content: error.graphQLErrors[0].message });
    } else {
      Modal.error({ content: "알 수 없는 에러가 발생했습니다" });
    }
  } else {
    Modal.error({ content: "알 수 없는 에러가 발생했습니다" });
  }
}
   
    
  };


return{
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onSubmit,
    writer,
    password,
    contents,
    rating,
    setRating,
    isComments,
    setIsComments,
    onClickCancel,
    onClickUpdate

}

}