// import { useState, ChangeEvent, MouseEvent } from "react";
// import "./BoardsNew.css";

// // 1. 설계도 만들기 (interface 사용)
// // 입력값(writer, password 등)과 에러 메시지의 모양을 미리 정의합니다.
// // 이렇게 하면 TypeScript가 우리 코드를 더 잘 이해하고 도와줄 수 있어요.
// interface IFormData {
//   writer: string;
//   password: string;
//   title: string;
//   contents: string;
// }

// interface IFormErrors {
//   writer?: string;
//   password?: string;
//   title?: string;
//   contents?: string;
// }

// const BoardsNew = (): JSX.Element => {
//   // 2. 상태(State)를 객체로 관리하기
//   // useState를 여러 번 쓰지 않고, inputs와 errors라는 큰 바구니 2개로 관리하면
//   // 나중에 입력창이 추가되어도 코드가 지저분해지지 않아요.
//   const [inputs, setInputs] = useState<IFormData>({
//     writer: "",
//     password: "",
//     title: "",
//     contents: "",
//   });
//   const [errors, setErrors] = useState<IFormErrors>({});

//   // 3. 모든 입력창을 관리하는 똑똑한 함수 하나 만들기
//   // event.target.name을 사용해서 어떤 입력창에서 온 요청인지 알아채는 방식이에요.
//   // 이렇게 하면 입력창마다 함수를 만들 필요가 없어서 아주 효율적입니다.
//   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setInputs((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // 사용자가 무언가 입력하기 시작하면, 에러 메시지를 바로 지워주는 센스!
//     if (value) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   // 4. '등록하기' 버튼을 눌렀을 때 실행될 최종 검사 함수
//   const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
//     // isValid 깃발 방식으로 깐깐하게 검사해요.
//     let isValid = true;
//     const newErrors: IFormErrors = {};

//     if (!inputs.writer.trim()) {
//       newErrors.writer = "작성자를 입력해주세요.";
//       isValid = false;
//     }
//     if (!inputs.password.trim()) {
//       newErrors.password = "비밀번호를 입력해주세요.";
//       isValid = false;
//     }
//     if (!inputs.title.trim()) {
//       newErrors.title = "제목을 입력해주세요.";
//       isValid = false;
//     }
//     if (!inputs.contents.trim()) {
//       newErrors.contents = "내용을 입력해주세요.";
//       isValid = false;
//     }

//     setErrors(newErrors);

//     // 모든 검사를 통과했다면(isValid가 여전히 true라면), 성공!
//     if (isValid) {
//       alert("게시글이 성공적으로 등록되었습니다!");
//       console.log("제출할 데이터:", inputs);
//       // 나중에 이곳에서 서버로 데이터를 보내는 코드를 추가하게 됩니다.
//     }
//   };

// import React, { ChangeEvent, MouseEvent, useState } from "react";
// import "./BoardsNew.css";

// // 입력값과 에러 객체의 설계도를 미리 정의합니다.
// interface IFormData {
//   writer: string;
//   password: string;
//   title: string;
//   contents: string;
// }

// interface IFormErrors {
//   writer?: string;
//   password?: string;
//   title?: string;
//   contents?: string;
// }

// const BoardsNew = (): JSX.Element => {
//   // 1. 상태를 하나의 객체로 관리하여 코드를 간결하게 유지합니다.
//   const [inputs, setInputs] = useState<IFormData>({
//     writer: "",
//     password: "",
//     title: "",
//     contents: "",
//   });

//   const [errors, setErrors] = useState<IFormErrors>({});

//   // 2. 모든 input과 textarea의 변경을 하나의 함수로 처리합니다.
//   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;

//     // name의 타입을 IFormData의 key 중 하나로 명확히 합니다.
//     const inputName = name as keyof IFormData;

//     setInputs((prev) => ({
//       ...prev,
//       [inputName]: value,
//     }));

//     // 사용자가 입력을 시작하면 해당 필드의 에러 메시지를 지웁니다.
//     if (value) {
//       setErrors((prev) => ({
//         ...prev,
//         [inputName]: "",
//       }));
//     }
//   };

//   // 3. 유효성 검사
//   const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
//     const newErrors: IFormErrors = {};

//     if (!inputs.writer.trim()) newErrors.writer = "작성자를 입력해주세요.";
//     if (!inputs.password) newErrors.password = "비밀번호를 입력해주세요.";
//     if (!inputs.title.trim()) newErrors.title = "제목을 입력해주세요.";
//     if (!inputs.contents.trim()) newErrors.contents = "내용을 입력해주세요.";

//     setErrors(newErrors);

//     // 에러가 없으면 제출 성공
//     if (Object.keys(newErrors).length === 0) {
//       alert("게시글이 성공적으로 등록되었습니다!");
//       console.log("제출할 데이터:", inputs);
//     }




//   





  // 모든 입력창에 값이 있는지 확인해서 버튼 활성화/비활성화를 결정해요.
  const isButtonDisabled = !inputs.writer || !inputs.password || !inputs.title || !inputs.contents;

  return (
    <div className="board-new">
      <h1 className="board-new__title">게시물 등록</h1>

      {/* -- JSX 부분 -- */}
      {/* 작성자 & 비밀번호 */}
      <div className="board-new__section board-new__section--row">
        <div className="board-new__input-group">
          <label>작성자</label>
          <input name="writer" onChange={handleInputChange} value={inputs.writer} />
          {errors.writer && <div className="board-new__error-message">{errors.writer}</div>}
        </div>
        <div className="board-new__input-group">
          <label>비밀번호</label>
          <input name="password" type="password" onChange={handleInputChange} value={inputs.password} />
          {errors.password && <div className="board-new__error-message">{errors.password}</div>}
        </div>
      </div>
      {/* 제목 */}
      <div className="board-new__section">
        <label>제목</label>
        <input name="title" onChange={handleInputChange} value={inputs.title} />
        {errors.title && <div className="board-new__error-message">{errors.title}</div>}
      </div>
      {/* 내용 */}
      <div className="board-new__section">
        <label>내용</label>
        <textarea name="contents" onChange={handleInputChange} value={inputs.contents} />
        {errors.contents && <div className="board-new__error-message">{errors.contents}</div>}
      </div>
      {/* 등록하기 버튼 */}
      <div className="board-new__footer">
        <button onClick={handleSubmit} disabled={isButtonDisabled}>
          등록하기
        </button>
      </div>
    </div>
  );
};

export default BoardsNew;
