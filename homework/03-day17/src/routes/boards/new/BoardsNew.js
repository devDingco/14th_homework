// import React, { useState } from "react";
import React, {useState} from 'react';
import './BoardsNew.css'

import add_icon from './assets/add_icon.png';

const BoardsNew = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const [inputError, setInputError] = useState("")
  const [isActive, setIsActive] = useState("")
    

  const onChangeUserName = (event) => {
    setUsername(event.target.value)

    if(event.target.value && password && title && content){
        setIsActive(true)
    } else {
        setIsActive(false)
    }
  }
  const onChangePassword = (event) => {
    setPassword(event.target.value)

    if(username && event.target.value && title && content){
        setIsActive(true)
    } else {
        setIsActive(false)
    }
  }
  const onChangeTitle = (event) => {
    setTitle(event.target.value)

    if(username && password && event.target.value && content){
        setIsActive(true)
    } else {
        setIsActive(false)
    }
  }
  const onChangeContent = (event) => {
    setContent(event.target.value)

    if(username && password && title && event.target.value){
        setIsActive(true)
    } else {
        setIsActive(false)
    }
  }

  const onClickSubmit = (event) => {
    console.log({
      username,
      password,
      title,
      content
    });


    if(username && password && title && content){
      setInputError("");
      alert("게시글 등록이 가능한 상태입니다!")
    } else {
      setInputError("필수입력 사항입니다.")
    }

  }

  return (
      <div className="layout">
          <div className="container">
              <div className="enroll-subject-text">게시물 등록</div>

              <div className = "enroll-row-flex">
                  <div className="flex-half">
                      <div className="enroll-form-title">
                          <div>작성자</div>
                          <div className="enroll-required-indicator"> *</div>
                      </div>
                      <input
                          className="enroll-input"
                          type="text"
                          placeholder="작성자 명을 입력해 주세요."
                          value={username}
                          onChange={onChangeUserName}
                      />
                      <div className="input-error-message">{inputError}</div>
                  </div>
                  <div className="flex-half">
                      <div className="enroll-form-title">
                          <div>비밀번호</div>
                          <div className="enroll-required-indicator">*</div>
                      </div>
                      <input
                          className="enroll-input"
                          type="text"
                          placeholder="비밀번호를 입력해 주세요."
                          value={password}
                          onChange={onChangePassword}
                      />
                      <div className="input-error-message">{inputError}</div>
                  </div>
              </div>

              <hr className="enroll-border"/>

              <div className="flex-half">
                  <div className="enroll-form-title">
                      <div>제목</div>
                      <div className="enroll-required-indicator">*</div>
                  </div>
                  <input
                      className="enroll-input"
                      placeholder="제목을 입력해 주세요."
                      value={title}
                      onChange={onChangeTitle}
                  ></input>
                  <div className="input-error-message">{inputError}</div>
              </div>

              <hr className="enroll-border"/>

              <div className="flex-half">
                  <div className="enroll-form-title">
                      <div>내용</div>
                      <div className="enroll-required-indicator">*</div>
                  </div>
                  <textarea
                      className="enroll-input enroll-textarea"
                      placeholder="내용을 입력해 주세요."
                      value={content}
                      onChange={onChangeContent}
                  ></textarea>
                  <div className="input-error-message">{inputError}</div>
              </div>


              <hr className="enroll-border"/>

              <div className="enroll-row-section">
                  <div className="enroll-form-title">
                      <div>주소</div>               
                  </div>
                  <div className="enroll-address-firstrow">
                      <input 
                          className="zipcode-input"
                          type="number"
                          placeholder="01234"
                      />
                      <button className="zipcode-search-button">우편번호 검색</button>                    
                  </div>    
                  <input
                      className="enroll-input"
                      type="text"
                      placeholder="주소를 입력해 주세요."
                  />
                  <input
                      className="enroll-input"
                      type="text"
                      placeholder="상세주소"
                  />
              </div>        

              <hr className="enroll-border"/>

              <div className="flex-half">
                  <div className="enroll-form-title">
                      <div>유튜브 링크</div>
                  </div>
                  <input
                      className="enroll-input"
                      type="text"
                      placeholder="링크를 입력해 주세요."
                  />
              </div>

              <hr className="enroll-border"/>

              <div className="flex-half">
                  <div className="enroll-form-title">
                      <div>사진 첨부</div>                    
                  </div>
                  <div className="picture-enroll-row">
                      <div className="picture-enroll-button">
                          <img className="icon_image" src={add_icon}></img>
                          <div className="picture-enroll-button_text">클릭해서 사진 업로드</div>
                      </div>
                      <div className="picture-enroll-button">
                          <img className="icon_image" src={add_icon}></img>
                          <div className="picture-enroll-button_text">클릭해서 사진 업로드</div>
                      </div>
                      <div className="picture-enroll-button">
                          <img className="icon_image" src={add_icon}></img>
                          <div className="picture-enroll-button_text">클릭해서 사진 업로드</div>
                      </div>
                  </div>
              </div>
              
              <div className="enroll-button-container">
                  <button className="enroll-cancel-button">취소</button>
                  <button
                    className= {`enroll-submit-button ${isActive ? "active" : "disabled"}`}
                    onClick={onClickSubmit}
                    >
                        등록하기
                    </button>
              </div>
          </div>

      </div>
  )

}
export default BoardsNew;