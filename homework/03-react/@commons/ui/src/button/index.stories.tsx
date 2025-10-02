import MyButton from ".";

export default {
  component: MyButton,
  title: "Commons/Button",
};

export const PrimaryActive = {
  render: () => (
    <MyButton formState={{ isValid: true }} variant="primary">
      등록하기
    </MyButton>
  ),
};

export const PrimaryDisabled = {
  render: () => (
    <MyButton formState={{ isValid: false }} variant="primary">
      등록하기
    </MyButton>
  ),
};

export const SecondaryActive = {
  render: () => (
    <MyButton formState={{ isValid: true }} variant="secondary">
      취소
    </MyButton>
  ),
};


