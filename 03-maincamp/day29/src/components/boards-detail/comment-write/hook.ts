import { gql, useMutation } from '@apollo/client'
import { on } from 'events'
import { useParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { FETCH_COMMENTS, CREATE_COMMENT } from './queries'
import { Modal } from "antd";

export default function useCommentWrite() {
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
    setIsComments
}

}