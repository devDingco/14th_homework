"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css"; // 스타일 다 바꿔주기 - 형식 맞게

// Register 관련 컴포넌트들 불러오기
import { RegisterInput, RegisterText, Picture, Button } from './Register';
import { useParams, useRouter } from "next/navigation";

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

const UPDATE_BOARD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id
      writer
      title
      contents
      updatedAt
    }
  }
`;

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
    }
  }
`;

// BoardWrite Props 타입 정의
interface BoardWriteProps {
    isEdit: boolean;
    boardId?: string; // 수정 모드일 때 필요
  }

  const BoardWrite: React.FC<BoardWriteProps> = ({isEdit, boardId}) => {
  const router = useRouter();
  const params = useParams();

  const id = isEdit ? boardId ?? (params.boardId as string) : ""; // URL에서 가져오기

  const [RegisterFunction] = useMutation(CREATE_BOARD);
  const [UpdateFunction] = useMutation(UPDATE_BOARD);

  const [writer, setWriter] = React.useState<string | undefined>();
  const [password, setPassword] = React.useState<string | undefined>();
  const [title, setTitle] = React.useState<string | undefined>();
  const [contents, setContents] = React.useState<string | undefined>();

  const [loading, setLoading] = useState(false); // API 호출 중에는 버튼을 비활성화


  // 수정 모드일 때 기존 게시글 불러오기
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: id || "" },
    skip: !isEdit || !id,
  });

 // 게시글 데이터와 비밀번호 prompt 처리
  useEffect(() => {
   if (isEdit && data?.fetchBoard && password === undefined) {
     setWriter(data.fetchBoard.writer);
     setTitle(data.fetchBoard.title);
     setContents(data.fetchBoard.contents);
 
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
                password, // prompt로 받은 비밀번호 전달
                updateBoardInput: { title, contents },
              },
            });
        
            // 3. API 호출 성공 시 alert
            alert("게시글 수정이 완료되었습니다!");
      
            console.log(result.data.updateBoard._id);
      
            router.push(
              `/boards/${result.data.updateBoard._id}`
            );
        
          } catch (error) {
            console.error("수정 중 오류 발생:", error);
            alert("게시글 수정 중 오류가 발생했습니다.");
          } finally {
            setLoading(false); // API 호출 끝 -> loading이 true이면 이미 API 호출 중이므로 함수가 바로 종료
          }
        };

          // 함수의 리턴은 한개만 할 수 있음 -> 하나로 묶자
  return (
    <div className={styles.등록페이지}>

        <div className={styles.타이틀}>{isEdit ? "게시물 수정" : "게시물 등록"}</div>

        <div className={styles.Section}>
            <RegisterInput inputTitle="작성자" myPlaceholder="작성자 명을 입력해 주세요." width="62.0rem"
                            value={writer ?? ""} onChange={(val: string) => setWriter(val)} readOnly={isEdit} />
            <RegisterInput inputTitle="비밀번호" myPlaceholder="비밀번호를 입력해 주세요." width="62.0rem" type="password"
                            value={password ?? ""} onChange={(val: string) => setPassword(val)} readOnly={isEdit} />
        </div>

        <div className={styles.Section}>
            <RegisterInput inputTitle="제목" myPlaceholder="제목을 입력해 주세요." width="128.0rem"
                            value={title ?? ""} onChange={(val: string) => setTitle(val)}/>
        </div>

        <div className={styles.SectionNoLine}>
            <RegisterText inputTitle="내용" myPlaceholder="내용을 입력해 주세요." width="128.0rem" height="33.6rem"
                            value={contents ?? ""} onChange={(val: string) => setContents(val)}/>
        </div>
        
        <div className={styles.SectionColumn}>
            <RegisterInput inputTitle="주소" display="none" myPlaceholder="01234" width="8.2rem"/>
            <button className={styles.검색버튼}>우편번호 검색</button>
            <textarea className={styles.input__box} placeholder="주소를 입력해 주세요." style={{ width: "128.0rem", height: "4.8rem" }}></textarea>
            <textarea className={styles.input__box} placeholder="상세주소" style={{ width: "128.0rem", height: "4.8rem" }}></textarea>
        </div>

        <div className={styles.Section}>
            <RegisterInput inputTitle="유튜브 링크" display="none" myPlaceholder="링크를 입력해 주세요." width="128.0rem"/>
        </div>

        <div className={styles.SectionColumnNoLine}>
            <div className={styles.input__title}>사진 첨부</div>
            <div className={styles.pictureUpload}>
                <Picture /><Picture /><Picture />
            </div>
        </div>
        
        <div className={styles.SectionButton}>
            <Button backgroundColor="var(--gray-W)" color="var(--gray-B)" btnTitle="취소" borderColor="var(--gray-B)"/>
            <Button backgroundColor="#2974E5" color="#FFF" btnTitle={isEdit ? "수정하기" : "등록하기"} borderColor="none" onClick={isEdit ? handleUpdate : handleSubmit}
                  disabled={loading || !(writer && title && contents) || (!isEdit && !password)}/>
                  {/* 로딩중에도 버튼 비활성화 */}
        </div>


    </div>
)
  }

export default BoardWrite;
