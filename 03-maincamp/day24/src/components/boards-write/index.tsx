"use client";

import styles from './styles.module.css'
import { gql, useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from 'next/image';
import {ChangeEvent} from 'react';

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

const CREATE_BOARD = gql`
  # 변수의 타입 적는곳
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    # 우리 실제 전달할 변수 적는곳
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;
const UPDATE_BOARD = gql`
  # 변수의 타입 적는곳
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
  ) {
    # 우리 실제 전달할 변수 적는곳
    updateBoard(boardId: $boardId, password: $password, updateBoardInput: $updateBoardInput
    ) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function BoardsWrite(props) {
      const [writer, setWriter] = useState<string>("")
      const [password, setPassword] = useState<string>("")
      const [title, setTitle] = useState<string>("")
      const [contents, setContents] = useState<string>("")
  
      const [errorWriter, setErrorWriter] = useState<string>("")
      const [errorPassword, setErrorPassword] = useState<string>("")
      const [errorTitle, setErrorTitle] = useState<string>("")
      const [errorContents, setErrorContents] = useState<string>("")
  
      const [isActive, setIsActive] = useState<boolean>(false)
      
      const router = useRouter();
        const [createBoard] = useMutation(CREATE_BOARD);
        const [updateBoard] = useMutation(UPDATE_BOARD);
        const { boardId } = useParams()


      const onChangeWriter = (event:ChangeEvent<HTMLInputElement>) => {
          setWriter(event.target.value)
          if(event.target.value && password && title && contents){
            setIsActive(true)
          }else{setIsActive(false)}
      }
      const onChangePassword = (event:ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value)
          if(writer && event.target.value && title && contents){
            setIsActive(true)
          }else{setIsActive(false)}
      }
      const onChangeTitle = (event:ChangeEvent<HTMLInputElement>) => {
          setTitle(event.target.value)
          if(writer && password && event.target.value && contents){
            setIsActive(true)
          }else{setIsActive(false)}
      }
      const onChangeContents = (event:ChangeEvent<HTMLInputElement>) => {
          setContents(event.target.value)
          if(writer && password && title && event.target.value){
            setIsActive(true)
          }else{setIsActive(false)}
      }
      const validation = () => {
          if (writer === "") setErrorWriter("필수입력사항입니다");
          else setErrorWriter("");

          if (password === "") setErrorPassword("필수입력사항입니다");
          else setErrorPassword("");
        
          if (title === "") setErrorTitle("필수입력사항입니다");
          else setErrorTitle("");
        
          if (contents === "") setErrorContents("필수입력사항입니다");
          else setErrorContents("");
  
          if (writer !=="" && password !=="" && title !=="" && contents !=="" )
              alert("게시글이 등록되었습니다")
        };

  //이벤트 핸들러
  const onClickSubmit = async () => {
    const result = await createBoard({
  variables: {
    createBoardInput: {
      writer,
      password,
      title,
      contents,
    },
  },
});

    console.log(result);
    router.push(
      `/boards/${result.data.createBoard._id}`
    );
  };

  const onClickUpdate = async () => {
    const checkPassword = prompt("비밀번호를 입력해주세요.");
    if (!checkPassword) return;

    const myvariables = {
  boardId: String(boardId),
  password: checkPassword,
  updateBoardInput: {},
  };

if (title !== "") {
  myvariables.updateBoardInput.title = title;
}
if (contents !== "") {
  myvariables.updateBoardInput.contents = contents;
}


try {
  const result = await updateBoard({
    variables: myvariables
  });
  alert("게시글이 수정되었습니다");
  router.push(
      `/boards/${result.data.updateBoard._id}`
    );
} catch (error: any) {
  if (error.graphQLErrors?.[0]) {
    alert(error.graphQLErrors[0].message); // 보통 "비밀번호가 틀렸습니다" 메시지
  } else {
    alert("알 수 없는 에러가 발생했습니다.");
  }
}
   
    
  };

  return (  <div className={styles.container}>
      <header>
          <h1>게시물{props.isEdit ? "수정" : "등록"}</h1>
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
                  <input disabled={props.data}  onChange={onChangeWriter} type="text" placeholder="작성자 명을 입력해주세요" defaultValue={props.data?.fetchBoard.writer}/>
                  <div className={`${styles['color-red']} ${styles['Font-h2']}`}>{errorWriter}</div>
              </section>
              <section className={styles.메인__작성자비밀번호섹션__비밀번호섹션}>
                  <h2>비밀번호<Image
                          src={"/images/별표.png"}
                          alt="별표"
                          width={8}
                          height={8}
                        /></h2>
                  <input disabled={props.data} onChange={onChangePassword} type="password" placeholder="비밀번호를 입력해주세요"/>
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
              <input onChange={onChangeTitle} type="text" placeholder="제목 입력해주세요" defaultValue={props.data?.fetchBoard.title}/>
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
              <input onChange={onChangeContents} type="text" placeholder="내용을 입력해주세요" defaultValue={props.data?.fetchBoard.contents}/>
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
    props.isEdit ? onClickUpdate() : onClickSubmit();
  }}>{props.isEdit ? "수정하기" : "등록하기"}</button>
          </section>

      </main>
   </div>
      
  );
}
