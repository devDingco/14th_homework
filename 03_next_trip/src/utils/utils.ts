export const formatDate = (inputDate: Date) => {
  const date = new Date(inputDate);
  const year = date.getFullYear().toString().slice(2, 4);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
};

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
