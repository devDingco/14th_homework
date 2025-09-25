// 회원가입용 input 타입
export interface CreateUserInput {
    email: string;
    password: string;
    name: string;
  }
  
  // 회원가입 mutation 결과 타입
  export interface CreateUserResponse {
    _id: string;
    email: string;
    name: string;
  }

  export interface SignupInputs {
    email: string
    name: string
    password: string
    passwordCheck?: string
  }