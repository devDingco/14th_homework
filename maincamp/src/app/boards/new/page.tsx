"use client"

import Button from '@/components/ui/button/Button'
import { Inputfield, Textareafield } from '@/components/ui/input/Inputfield'
import InputZipcode from '@/components/ui/input/InputZipcode'
import InputImage from '@/components/ui/input/InputImage'
import styles from './styles.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { ChangeEvent } from 'react'


export default function BoardsNewPage (){

    /* 게시물 등록 유효성 검사 */
    // 1. 작성자, 비밀번호, 제목, 컨텐츠 작성 시 setState로 상태 변경
    const [writer, setWriter] = useState("")
    const [password, setPassword] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    // 2. 필수 작성 요소 작성 여부에 따른 버튼 활성화
    const [isValid, setIsValid] = useState(true)

    // 3. Change Event에 따른 유효성 검증
    const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
        setWriter(event.target.value)
    
        if(event.target.value && password && title && content){
          setIsValid(false)
        } else{
          setIsValid(true)
        }
      }
      const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    
        if(writer && event.target.value && title && content){
          setIsValid(false)
        } else{
          setIsValid(true)
        }
      }
      const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    
        if(writer && password && event.target.value && content){
          setIsValid(false)
        } else{
          setIsValid(true)
        }
      }
      const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value)
    
        if(writer && password && title && event.target.value){
          setIsValid(false)
        } else{
          setIsValid(true)
        }
      }

      // 4. 버튼 활성화 후 등록 버튼 클릭 시 알럿 발생
      const onClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {

        alert("게시물 등록이 완료되었습니다.")
    
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
            <Textareafield label='내용' required placeholder='내용을 입력해 주세요.' onChange={onChangeContent} ></Textareafield>
            <hr />
            <InputZipcode placeholder='주소를 입력해 주세요.' placeholder_2='상세주소'></InputZipcode>
            <hr />
            <Inputfield type='string' label='유튜브 링크' placeholder='링크를 입력해 주세요.'></Inputfield>
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
                <Link href='/boards/detail'>
                    <Button type="submit" variant='FormBtn' disabled={isValid} onClick={onClickBtn}>등록하기</Button>
                </Link>
            </div>
        </div>
    );
}