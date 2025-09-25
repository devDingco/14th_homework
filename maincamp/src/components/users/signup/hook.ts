import {
  CreateUserDocument,
  CreateUserMutationVariables,
} from "@/commons/graphql/graphql";
import { ApolloError, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function useSignUp() {
  const router = useRouter();
  // state
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });
  const isValid =
    inputs.email.trim() !== "" &&
    inputs.name.trim() !== "" &&
    inputs.password.trim() !== "" &&
    inputs.passwordConfirm.trim() !== "";

  const [errors, setErrors] = useState({
    email: false,
    name: false,
    password: false,
    passwordConfirm: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 회원가입 mutation
  const [createUser] =
    useMutation<CreateUserMutationVariables>(CreateUserDocument);

  // onChange 함수 및 유효성 검증
  const onChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setInputs({
      ...inputs,
      [id]: value,
    });

    switch (value) {
      case "": {
        setErrors({ ...errors, [id]: true });
        break;
      }
      default: {
        setErrors({ ...errors, [id]: false });
        break;
      }
    }
  };

  // onClick함수
  const onClickSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      if (inputs.email === "") {
        setErrors((errors) => ({ ...errors, email: true }));
      }
      if (inputs.name === "") {
        setErrors((errors) => ({ ...errors, name: true }));
      }
      if (inputs.password === "") {
        setErrors((errors) => ({ ...errors, password: true }));
      }
      if (inputs.passwordConfirm === "") {
        setErrors((errors) => ({ ...errors, passwordConfirm: true }));
      }
      return;
    }

    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email: inputs.email,
            name: inputs.name,
            password: inputs.password,
          },
        },
      });

      setIsModalOpen(true);
    } catch (error) {
      if (error instanceof ApolloError) {
        Modal.error({
          title: "회원가입에 실패하였습니다.",
          content: error.message,
        });
      } else {
        Modal.error({
          title: "회원가입에 실패하였습니다.",
          content: "알 수 없는 에러가 발생하였습니다.",
        });
      }
    }
  };

  const onClickLogin = () => {
    router.push("/login");
  };

  return {
    inputs,
    errors,
    onChangeInputs,
    onClickSignup,
    onClickLogin,
    isModalOpen,
  };
}
