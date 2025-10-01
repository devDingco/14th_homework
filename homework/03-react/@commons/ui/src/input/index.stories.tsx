import MyInput from "."

export default {
    title: "Commons/Input",
    component: MyInput
}

// 기본 텍스트 input
export const Basic = {
    render: () => <MyInput type="text" name="title" placeholder="제목을 입력해 주세요." />,
  };
  
// 비밀번호 input
export const Password = {
render: () => <MyInput type="password" name="password" placeholder="비밀번호를 입력해 주세요." />,
};

// textarea input
export const Textarea = {
render: () => <MyInput name="contents" placeholder="내용을 입력해 주세요." multiline />,
};

// disabled 상태
export const Disabled = {
render: () => <MyInput type="text" name="writer" placeholder="작성자" disabled />,
};