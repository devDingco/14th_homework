"use client";

import { gql, useMutation } from "@apollo/client";
import React, { useState } from 'react';
import styles from "./styles.module.css"; // 스타일 다 바꿔주기 - 형식 맞게

// Register 관련 컴포넌트들 불러오기
import { RegisterInput, RegisterText, Picture, Button } from './Register';
import { useRouter } from "next/navigation";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

const BoardsNew: React.FC = () => {
  const router = useRouter();

  const [RegisterFunction] = useMutation(CREATE_BOARD);

  const [writer, setWriter] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [contents, setContents] = React.useState<string>("");

  const [loading, setLoading] = useState(false); // API 호출 중에는 버튼을 비활성화

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
  
      // 3. API 호출 성공 시 alert
      alert("게시글 등록이 완료되었습니다!");

      console.log(result.data.createBoard._id);

      router.push(
        `/boards/${result.data.createBoard._id}`
      );
  
    } catch (error) {
      console.error("등록 중 오류 발생:", error);
      alert("게시글 등록 중 오류가 발생했습니다.");
    } finally {
      setLoading(false); // API 호출 끝 -> loading이 true이면 이미 API 호출 중이므로 함수가 바로 종료
    }
  };

  // 함수의 리턴은 한개만 할 수 있음 -> 하나로 묶자
  return (
      <div className={styles.등록페이지}>

          <div className={styles.타이틀}>게시물 등록</div>

          <div className={styles.Section}>
              <RegisterInput inputTitle="작성자" myPlaceholder="작성자 명을 입력해 주세요." width="62.0rem" height="4.8rem"
                              value={writer} onChange={(val: string) => setWriter(val)} />
              <RegisterInput inputTitle="비밀번호" myPlaceholder="비밀번호를 입력해 주세요." width="62.0rem" height="4.8rem" type="password"
                              value={password} onChange={(val: string) => setPassword(val)}/>
          </div>

          <div className={styles.Section}>
              <RegisterInput inputTitle="제목" myPlaceholder="제목을 입력해 주세요." width="128.0rem" height="4.8rem"
                              value={title} onChange={(val: string) => setTitle(val)}/>
          </div>

          <div className={styles.SectionNoLine}>
              <RegisterText inputTitle="내용" myPlaceholder="내용을 입력해 주세요." width="128.0rem" height="33.6rem"
                              value={contents} onChange={(val: string) => setContents(val)}/>
          </div>
          
          <div className={styles.SectionColumn}>
              <RegisterInput inputTitle="주소" display="none" myPlaceholder="01234" width="8.2rem" height="4.8rem"/>
              <button className={styles.검색버튼}>우편번호 검색</button>
              <textarea className={styles.input__box} placeholder="주소를 입력해 주세요." style={{ width: "128.0rem", height: "4.8rem" }}></textarea>
              <textarea className={styles.input__box} placeholder="상세주소" style={{ width: "128.0rem", height: "4.8rem" }}></textarea>
          </div>

          <div className={styles.Section}>
              <RegisterInput inputTitle="유튜브 링크" display="none" myPlaceholder="링크를 입력해 주세요." width="128.0rem" height="4.8rem"/>
          </div>

          <div className={styles.SectionColumnNoLine}>
              <div className={styles.input__title}>사진 첨부</div>
              <div className={styles.pictureUpload}>
                  <Picture /><Picture /><Picture />
              </div>
          </div>
          
          <div className={styles.SectionButton}>
              <Button backgroundColor="var(--gray-W)" color="var(--gray-B)" btnTitle="취소" borderColor="var(--gray-B)"/>
              <Button backgroundColor="#2974E5" color="#FFF" btnTitle="등록하기" borderColor="none" onClick={handleSubmit}
                    disabled={loading || !(writer && password && title && contents)}/>
                    {/* 로딩중에도 버튼 비활성화 */}
          </div>


      </div>
  )
}

export default BoardsNew;
