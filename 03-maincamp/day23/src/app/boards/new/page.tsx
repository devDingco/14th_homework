"use client";

import styles from './styles.module.css'
import {ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { gql, useMutation } from "@apollo/client";
import { useRouter } from 'next/navigation';

const CREATE_BOARD = gql`
  mutation createBoard (
    $createBoardInput: CreateBoardInput!
  ) {
  createBoard (
    createBoardInput: $createBoardInput
  ) {
    writer
    _id
  }
}
`;

const BoardsNew = () => {
  const router = useRouter();
  const [createBoard] = useMutation(CREATE_BOARD);
  
  const onClickSubmit = async () => {
    try {
      const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: name,
          title: title,
          contents: contents,
          password: password
        },
      },
    });
      router.push(`/boards/detail/${result.data.createBoard._id}`)
    } catch (error) {
      alert("에러발생") 
    }
    
  };




    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [contents, setContents] = useState<string>("")

    const [errorName, setErrorName] = useState<string>("")
    const [errorPassword, setErrorPassword] = useState<string>("")
    const [errorTitle, setErrorTitle] = useState<string>("")
    const [errorContents, setErrorContents] = useState<string>("")

    const [isActive, setIsActive] = useState<boolean>(false)
    
    const onChangeName = (event:ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
        if(event.target.value && password && title && contents){
          setIsActive(true)
        }else{setIsActive(false)}
    }
    const onChangePassword = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
        if(name && event.target.value && title && contents){
          setIsActive(true)
        }else{setIsActive(false)}
    }
    const onChangeTitle = (event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
        if(name && password && event.target.value && contents){
          setIsActive(true)
        }else{setIsActive(false)}
    }
    const onChangeContents = (event:ChangeEvent<HTMLInputElement>) => {
        setContents(event.target.value)
        if(name && password && title && event.target.value){
          setIsActive(true)
        }else{setIsActive(false)}
    }
    const validation = () => {
        if (name === "") setErrorName("필수입력사항입니다");
        else setErrorName("");
      
        if (password === "") setErrorPassword("필수입력사항입니다");
        else setErrorPassword("");
      
        if (title === "") setErrorTitle("필수입력사항입니다");
        else setErrorTitle("");
      
        if (contents === "") setErrorContents("필수입력사항입니다");
        else setErrorContents("");

        if (name !=="" && password !=="" && title !=="" && contents !=="" )
            alert("게시글이 등록되었습니다")
      };
    
     
  return (
      <div className={styles.container}>
      <header>
          <h1>게시물등록</h1>
      </header>
      <main>
          <section className={styles.메인__작성자비밀번호섹션}>
              <section className={styles.메인__작성자비밀번호섹션__작성자섹션}>
                  <h2>작성자<Image
                          src={"/images/별표.png"}
                          alt="별표"
                          width={8}
                          height={8}
                        /></h2>
                  <input onChange={onChangeName} type="text" placeholder="작성자 명을 입력해주세요"/>
                  <div className={`${styles['color-red']} ${styles['Font-h2']}`}>{errorName}</div>
              </section>
              <section className={styles.메인__작성자비밀번호섹션__비밀번호섹션}>
                  <h2>비밀번호<Image
                          src={"/images/별표.png"}
                          alt="별표"
                          width={8}
                          height={8}
                        /></h2>
                  <input onChange={onChangePassword} type="password" placeholder="비밀번호를 입력해주세요"/>
                  <div className={`${styles['color-red']} ${styles['Font-h2']}`}>{errorPassword}</div>
              </section>
          </section>
          <hr/>
          <section className={styles.메인__제목섹션}>
              <h2>제목<Image
                      src={"/images/별표.png"}
                      alt="별표"
                      width={8}
                      height={8}
                    /></h2>
              <input onChange={onChangeTitle} type="text" placeholder="제목 입력해주세요"/>
              <div className={`${styles['color-red']} ${styles['Font-h2']}`}>{errorTitle}</div>
          </section>
          <hr/>
          <section className={styles.메인__내용섹션}>
              <h2>내용<Image
                      src={"/images/별표.png"}
                      alt="별표"
                      width={8}
                      height={8}
                    /></h2>
              <input onChange={onChangeContents} type="text" placeholder="내용을 입력해주세요"/>
              <div className={`${styles['color-red']} ${styles['Font-h2']}`}>{errorContents}</div>
          </section>
          <section className={styles.메인__주소섹션}>
              <article className={styles.메인__주소섹션__상단아티클}>
                  <h2>주소</h2>
                  <div className={styles.메인__주소섹션__상단아티클__내용}>
                      <input value="01234" type="text" disabled/>
                      <button>우편번호 검색</button>
                  </div>
              </article>
              <input type="text" placeholder="주소를 입력해주세요"/>
              <input type="text" placeholder="상세주소"/>
          </section>
          <hr/>
          <section className={styles.메인__유튜브링크섹션}>
              <h2>유튜브링크</h2>
              <input type="text" placeholder="링크를 입력해주세요"/>
          </section>
          <hr/>
          <section className={styles.메인__사진첨부섹션}>
              <h2>사진첨부</h2>
              <article className={styles.메인__사진첨부섹션__아티클}>
                  <button><Image
                          src={"/images/사진업로드.png"}
                          alt="사진업로드"
                          width={200}
                          height={200}
                        /></button>
                  <button><Image
                          src={"/images/사진업로드.png"}
                          alt="사진업로드"
                          width={200}
                          height={200}
                        /></button>
                  <button><Image
                          src={"/images/사진업로드.png"}
                          alt="사진업로드"
                          width={200}
                          height={200}
                        /></button>
              </article>
          </section>
          <section className={styles.메인__등록하기섹션}>
              <button className={styles.메인__등록하기섹션__취소버튼}>취소</button>
              <button className={isActive === true ? styles.메인__등록하기섹션__등록하기버튼__액티브 : styles.메인__등록하기섹션__등록하기버튼__낫액티브} onClick={() => {
    validation();
    onClickSubmit();
  }}>등록하기</button>
          </section>

      </main>
   </div>
      
  )
}


export default BoardsNew;
