import { LoginUserDocument } from "@/commons/graphql/graphql";
import { useAccessTokenStore } from "@/commons/stores/accessTokenStore";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function useLogin() {
  // 페이지 이동을 위한 라우터
  const router = useRouter();

  // state 설정: Email, password, isValid
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  // 글로벌 state: setAccessToken
  const { setAccessToken } = useAccessTokenStore();

  // 로그인 mutation
  const [loginUser] = useMutation(LoginUserDocument);

  // onChange 함수
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    if (event.target.value && password) {
      setIsValid(true);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (event.target.value && email) {
      setIsValid(true);
    }
  };

  // onClick 함수
  const onCLickLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setIsValid(false);
      return;
    }

    try {
      const result = await loginUser({
        variables: { email, password },
      });

      console.log(result);
      const accessToken = result.data?.loginUser.accessToken ?? "";
      setAccessToken(accessToken);

      const decodedExp = String(jwtDecode(accessToken).exp);
      // freshToken 실습 전까지 localStorage 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("exp", decodedExp);

      setEmail("");
      setPassword("");

      router.push("/boards");
    } catch (error) {
      if (error instanceof ApolloError) {
        Modal.error({
          title: "로그인에 실패하였습니다.",
          content: error.message,
        });
      } else {
        Modal.error({
          title: "로그인에 실패하였습니다.",
          content: "알 수 없는 에러가 발생하였습니다.",
        });
      }
    }
  };

  const onClickSignup = () => {
    router.push("/signup");
  };

  return {
    onClickSignup,
    onChangeEmail,
    onChangePassword,
    onCLickLogin,
    isValid,
  };
}
