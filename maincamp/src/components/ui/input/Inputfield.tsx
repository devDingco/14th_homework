import styles from "./Inputfield.module.css";
import { InputProps, TextareaProps } from "@/types/index";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";

/* input 컴포넌트: 라벨, span, input */
export const Inputfield = forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, type, placeholder, id, isEdit, isAuth, error, ...rest }, ref) => {
    const router = useRouter();

    const handleUnauthClick = () => {
      Modal.confirm({
        title: "로그인 후 이용할 수 있습니다.",
        content: "댓글 기능은 로그인 후 이용할 수 있습니다.",
        okText: "로그인하기",
        cancelText: "창닫기",
        onOk() {
          router.push("/login");
        },
        onCancel() {},
      });
    };

    return (
      <div className={styles.Formfield}>
        <div>
          <label>{label}</label>
          {required && <span>*</span>}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          readOnly={isAuth === false ? true : false}
          disabled={isEdit}
          onClick={isAuth === false ? handleUnauthClick : undefined}
          {...rest}
          ref={ref}
        />
        <span>{error}</span>
      </div>
    );
  }
);

/* TextArea 컴포넌트: 라벨, span, input */
export const Textareafield = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { isCommentField, label, required, placeholder, id, isAuth, maxLength, error, ...rest },
    ref
  ) => {
    const router = useRouter();

    const handleUnauthClick = () => {
      Modal.confirm({
        title: "로그인 후 이용할 수 있습니다.",
        content: "댓글 기능은 로그인 후 이용할 수 있습니다.",
        okText: "로그인하기",
        cancelText: "창닫기",
        onOk() {
          router.push("/login");
        },
        onCancel() {},
      });
    };

    return (
      <div className={isCommentField ? styles.Commentfield : styles.Formfield}>
        {isCommentField ? (
          ""
        ) : (
          <div>
            <label>{label}</label>
            {required && <span>*</span>}
          </div>
        )}
        <textarea
          placeholder={placeholder}
          readOnly={isAuth === false ? true : false}
          maxLength={maxLength}
          onClick={isAuth === false ? handleUnauthClick : undefined}
          {...rest}
          ref={ref}
        ></textarea>
        <span>{error}</span>
      </div>
    );
  }
);
