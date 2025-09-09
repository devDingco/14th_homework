"use client";

import { gql, useMutation, useQuery } from "@apollo/client"
import React, { ChangeEvent, MouseEvent, useState } from "react";
import styles from "./styles.module.css";
import { useParams, useRouter } from "next/navigation";

const FETCH_BOARD = gql `
    query fetchBoard($boardId: ID!){
        fetchBoard(boardId: $boardId) {
            _id
            writer
            title
            contents
            youtubeUrl
            likeCount
            dislikeCount
            images
            user {
                _id
                email
                name
                picture
            }
            createdAt
            updatedAt
            deletedAt
        }
    
    }
`

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!){
    createBoard(createBoardInput:$createBoardInput){
      _id
      writer
      title
      contents
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
      images
      likeCount
      createdAt
      updatedAt
      deletedAt
    }
  }

`
const UPDATE_BOARD = gql`
  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $boardId: ID!, $password: String){
    updateBoard(updateBoardInput:$updateBoardInput, boardId: $boardId, password: $password){
      _id
      writer
      title
      contents
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
      images
      likeCount
      createdAt
      updatedAt
      deletedAt
    }
  }

`

export default function BoardsWrite(props) {
    const router = useRouter()
    const params = useParams()
    const boardId = String(params.boardId) 
    const { data } = useQuery(FETCH_BOARD, {
        variables: { boardId }
    })

  
    const [writer, setWriter] = useState(props.isEdit ? data?.fetchBoard.writer : "");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState(props.isEdit ? data?.fetchBoard.title : "");
    const [contents, setContents] = useState(props.isEdit ? data?.fetchBoard.contents : "");

    const [inputError, setInputError] = useState("");
    //useState의 초기값을 props.isEdit에 따라 조건부로 설정
    const [isActive, setIsActive] =  useState(props.isEdit ? true : false);

    // 등록 페이지와 수정 페이지의 isActive 조건 분리
    const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    setIsActive(props.isEdit ? (title && contents) : (event.target.value && password && title && contents));
    };
    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsActive(props.isEdit ? (title && contents) : (writer && event.target.value && title && contents));
    };
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsActive(props.isEdit ? (event.target.value && contents) : (writer && password && event.target.value && contents));
    };
    const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
    setIsActive(props.isEdit ? (title && event.target.value) : (writer && password && title && event.target.value));
    };

    const [createBoard] = useMutation(CREATE_BOARD) 
    const [updateBoard] = useMutation(UPDATE_BOARD)

    const onClickSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
        const result = await createBoard({
            variables: {
                createBoardInput: {
                writer: writer,
                password: password,
                title: title,
                contents: contents,
                youtubeUrl: "",
                images: []
                } ,
            },
        })
        console.log(result.data.createBoard);

        if (result?.data?.createBoard) {
        setInputError("");
        alert("게시글 등록이 가능한 상태입니다!");
        } else {
        setInputError("필수입력 사항입니다.");
        }

        router.push(
        `/boards/${result.data.createBoard._id}`
        )
    } catch(error){
        alert("에러가 발생하였습니다. 다시 시도해 주세요.")
    } finally {

    }
    }    


    const onClickUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
        try {

            const enteredPassword = prompt("글을 입력할 때 설정한 비밀번호를 입력해주세요.")
            if(!enteredPassword) return
            
            
            const myvariables = {
                updateBoardInput: {} ,
                boardId: boardId,
            }

            if(title !== "") myvariables.updateBoardInput.title = title
            if(contents !=="") myvariables.updateBoardInput.contents = contents

            const result = await updateBoard({
                variables: {
                    updateBoardInput: myvariables.updateBoardInput,
                    boardId: myvariables.boardId,
                    password: enteredPassword,
                },
                refetchQueries: [
                    {query: FETCH_BOARD, variables: {boardId }},
                ]                                
            })

            console.log(result.errors)

            if (result?.data?.updateBoard) {
                setInputError(""); // 성공하면 에러 메시지 초기화
                alert("게시글이 수정되었습니다!");

                router.push(`/boards/${result.data.updateBoard._id}`)
            }

        } catch(error){
            if(error.graphQLErrors?.[0]?.message.includes("비밀번호")) {
                alert("비밀번호가 틀렸습니다.")
            } else {
                alert("에러가 발생하였습니다. 다시 시도해 주세요.")
            }
        }
    }    
    //  data가 로드되지 않았을 경우 null을 반환하여 렌더링을 막음
    if (props.isEdit && !data) return null;

    return (
    <div className={styles.layout}>
        <div className={styles.container}>
        <div className={styles.enrollSubjectText}>게시물 {props.isEdit ? "수정" : "등록"}</div>

        <div className={styles.enrollRowFlex}>
            <div className={styles.flexHalf}>
            <div className={styles.enrollFormTitle}>
                <div>작성자</div>
                <div className={styles.enrollRequiredIndicator}> *</div>
            </div>
            <input
                className={styles.enrollInput}
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                defaultValue={props.data?.fetchBoard.writer} 
                onChange={onChangeWriter}
                disabled={props.isEdit} // 수정페이지면 입력불가
            />
            <div className={styles.inputErrorMessage}>{inputError}</div>
            </div>
            <div className={styles.flexHalf}>
            <div className={styles.enrollFormTitle}>
                <div>비밀번호</div>
                <div className={styles.enrollRequiredIndicator}>*</div>
            </div>
            <input
                className={styles.enrollInput}
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                value={props.isEdit ? "••••••••" : password}
                onChange={onChangePassword}
                disabled={props.isEdit} // 수정페이지면 입력불가
            />
            <div className={styles.inputErrorMessage}>{inputError}</div>
            </div>
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.flexHalf}>
            <div className={styles.enrollFormTitle}>
            <div>제목</div>
            <div className={styles.enrollRequiredIndicator}>*</div>
            </div>
            <input
            className={styles.enrollInput}
            placeholder="제목을 입력해 주세요."
            defaultValue={props.data?.fetchBoard.title}
            onChange={onChangeTitle}
            />
            <div className={styles.inputErrorMessage}>{inputError}</div>
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.flexHalf}>
            <div className={styles.enrollFormTitle}>
            <div>내용</div>
            <div className={styles.enrollRequiredIndicator}>*</div>
            </div>
            <textarea
            className={`${styles.enrollInput} ${styles.enrollTextarea}`}
            placeholder="내용을 입력해 주세요."
            defaultValue={props.data?.fetchBoard.contents}
            onChange={onChangeContent}
            />
            <div className={styles.inputErrorMessage}>{inputError}</div>
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.enrollRowSection}>
            <div className={styles.enrollFormTitle}>
            <div>주소</div>
            </div>
            <div className={styles.enrollAddressFirstrow}>
            <input className={styles.zipcodeInput} type="number" placeholder="01234" />
            <button className={styles.zipcodeSearchButton}>우편번호 검색</button>
            </div>
            <input className={styles.enrollInput} type="text" placeholder="주소를 입력해 주세요." />
            <input className={styles.enrollInput} type="text" placeholder="상세주소" />
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.flexHalf}>
            <div className={styles.enrollFormTitle}>
            <div>유튜브 링크</div>
            </div>
            <input className={styles.enrollInput} type="text" placeholder="링크를 입력해 주세요." />
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.flexHalf}>
            <div className={styles.enrollFormTitle}>
            <div>사진 첨부</div>
            </div>
            <div className={styles.pictureEnrollRow}>
            {[...Array(3)].map((_, idx) => (
                <div key={idx} className={styles.pictureEnrollButton}>
                <img className={styles.iconImage} src="/images/add_icon.png" alt="추가아이콘" />
                <div className={styles.pictureEnrollButtonText}>클릭해서 사진 업로드</div>
                </div>
            ))}
            </div>
        </div>

        <div className={styles.enrollButtonContainer}>
            <button className={styles.enrollCancelButton}>취소</button>
            <button
            className={`${styles.enrollSubmitButton} ${isActive ? styles.active : styles.disabled}`}
            onClick={props.isEdit ? onClickUpdate : onClickSubmit}
            >
            {props.isEdit ? "수정" : "등록"}하기
            </button>
        </div>
        </div>
    </div>
    );
  
}
