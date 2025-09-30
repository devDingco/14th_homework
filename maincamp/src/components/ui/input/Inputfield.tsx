import styles from "./Inputfield.module.css";
import { InputProps, TextareaProps } from "@/types/index";
import { Modal } from "antd";
import { useRouter } from "next/navigation";

/* input 컴포넌트: 라벨, span, input */
export function Inputfield(props: InputProps) {
  const router = useRouter();
  const handleUnauthClick = () => {
    Modal.error({
      title: "로그인 후 이용할 수 있습니다.",
      content: "댓글 기능은 로그인 후 이용할 수 있습니다.",
    });

    router.push("/login");
  };

  return (
    <div className={styles.Formfield}>
      <div>
        <label>{props.label}</label>
        {props.required && <span>*</span>}
      </div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        value={
          props.type === "password" && props.isEdit ? "*********" : props.value
        }
        readOnly={props.isAuth === false ? true : false}
        disabled={props.isEdit}
        onChange={props.onChange}
        onClick={props.isAuth === false ? handleUnauthClick : undefined}
      />
    </div>
  );
}

/* TextArea 컴포넌트: 라벨, span, input */
export function Textareafield(props: TextareaProps) {
  const router = useRouter();

  const handleUnauthClick = () => {
    Modal.error({
      title: "로그인 후 이용할 수 있습니다.",
      content: "댓글 기능은 로그인 후 이용할 수 있습니다.",
    });

    router.push("/login");
  };

  return (
    <div
      className={props.isCommentField ? styles.Commentfield : styles.Formfield}
    >
      {props.isCommentField ? (
        ""
      ) : (
        <div>
          <label>{props.label}</label>
          {props.required && <span>*</span>}
        </div>
      )}
      <textarea
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        readOnly={props.isAuth === false ? true : false}
        maxLength={props.maxLength}
        onClick={props.isAuth === false ? handleUnauthClick : undefined}
      ></textarea>
    </div>
  );
}
