"use client";
import styles from "./styles.module.css";
import { CSSProperties } from "react";

interface MyButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formState: any;
  children: React.ReactNode;
  style?: CSSProperties;
}

export default function MyButton(props: MyButtonProps) {
  return (
    <>
      <button
        className={styles.inputArea__registerButton}
        type="submit"
        disabled={!props.formState.isValid}
        style={props.style}
      >
        {props.children}
      </button>
    </>
  );
}
