"use client"

import Button from '@/components/ui/button/Button'
import { Inputfield, Textareafield } from '@/components/ui/input/Inputfield'
import InputZipcode from '@/components/ui/input/InputZipcode'
import InputImage from '@/components/ui/input/InputImage'
import styles from './styles.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { ChangeEvent } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'


export default function BoardsNewPage (){

    /* 게시물 등록 유효성 검사 */
    // 1. 작성자, 비밀번호, 제목, 컨텐츠 작성 시 setState로 상태 변경
    const [writer, setWriter] = useState("")
    const [password, setPassword] = useState("")
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")
    const [youtubeUrl, setYoutubeUrl] = useState("")

    // 1-1. graphql코드: 작성자, 제목, 내용
    const CREATE_BOARD = gql`
      mutation createBoard($createBoardInput: CreateBoardInput!){
        createBoard(createBoardInput: $createBoardInput) {
          _id
          writer
          title
          contents
        }
      }
    `

    // 1-3. 게시글 생성 API 요청 함수
    const [createBoard] = useMutation(CREATE_BOARD)

    // 2. 필수 작성 요소 작성 여부에 따른 버튼 활성화
    const [isValid, setIsValid] = useState(true)

    // 3. Change Event에 따른 유효성 검증
    const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        console.log("🚀 ~ onChangeWriter ~ value:", value)
        
        setWriter(value)
    
        if(value && password && title && contents){
          setIsValid(false)
        } else{
          setIsValid(true)
        }
      }
      const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        console.log("🚀 ~ onChangePassword ~ value:", value)

        setPassword(value)
    
        if(writer && value && title && contents){
          setIsValid(false)
        } else{
          setIsValid(true)
        }
      }
      const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        console.log("🚀 ~ onChangeTitle ~ value:", value)
        setTitle(value)
    
        if(writer && password && value && contents){
          setIsValid(false)
        } else{
          setIsValid(true)
        }
      }
      const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value
        console.log("🚀 ~ onChangeContents ~ value:", value)
        setContents(value)
    
        if(writer && password && title && value){
          setIsValid(false)
        } else{
          setIsValid(true)
        }
      }

      // 3-1. 필수 요소 아닌 ChangeEvent 추가
      const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        console.log("🚀 ~ onChangeYoutubeUrl ~ value:", value)
        setYoutubeUrl(value)
      }

      // 4. 버튼 활성화 후 등록 버튼 클릭 시 알럿 발생
      const onClickBtn = async () => {

        const result = await createBoard({
          variables:{
            createBoardInput:{
              writer: writer,
              password: password,
              title: title,
              contents: contents,
              youtubeUrl: youtubeUrl,
            }
          }
        })
        console.log("🚀 ~ onClickBtn ~ result:", result)

        await alert(`게시글 등록이 완료되었습니다
id: ${boardID}`)
      }

    return(
        <div className={styles.Formfield}>
            {/* 폼 타이틀 */}
            <div className={styles.postForm__title}>게시물 등록</div>
            {/* 작성자 그룹 */}
            <div className={styles.postForm__writer__group}>
                <Inputfield type='text' label='작성자' required placeholder='작성자 명을 입력해 주세요.' onChange={onChangeWriter}></Inputfield>
                <Inputfield type='password' label='비밀번호' required placeholder='비밀번호를 입력해 주세요.' onChange={onChangePassword}></Inputfield>
            </div>
            <hr />
            <Inputfield type='text' label='제목'required placeholder='제목을 입력해 주세요.' onChange={onChangeTitle} ></Inputfield>
            <hr/>
            <Textareafield label='내용' required placeholder='내용을 입력해 주세요.' onChange={onChangeContents} ></Textareafield>
            <hr />
            <InputZipcode placeholder='주소를 입력해 주세요.' placeholder_2='상세주소'></InputZipcode>
            <hr />
            <Inputfield type='string' label='유튜브 링크' placeholder='링크를 입력해 주세요.' onChange={onChangeYoutubeUrl}></Inputfield>
            <hr />
            <div className={styles.postForm__attachments__group}>
                <label>사진 첨부</label>
                <div className={styles.image__upload__group}>
                    <InputImage />
                    <InputImage />
                    <InputImage />
                </div>
            </div>
            <div className={styles.postForm__button__group}>
                <Link href='/'>
                    <Button type="button" variant='FormBtn'>취소</Button>
                </Link>
                <Button type="submit" variant='FormBtn' disabled={isValid} onClick={onClickBtn}>등록하기</Button>
            </div>
        </div>
    );
}