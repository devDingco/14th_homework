export const getInputPassword = () => {
  const promptMessage = '글을 입력할때 입력하셨던 비밀번호를 입력해주세요';

  try {
    let inputPassword = prompt(promptMessage);
    while (!inputPassword) {
      inputPassword = prompt(promptMessage);
      if (inputPassword) return inputPassword;
    }
    return inputPassword;
    // return inputPassword;
  } catch (error) {
    console.log(error);
  }
};
