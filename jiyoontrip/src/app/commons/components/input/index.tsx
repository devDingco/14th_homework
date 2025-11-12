"use client";

import styles from "./styles.module.css";
import { CSSProperties } from "react";

interface MyInputProps {
  id?: string;
  type?: "text" | "password";
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  name: string;
  isEdit?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  style?: CSSProperties;
  className?: string;
  "data-testid"?: string;
}

export default function MyInput({
  id,
  type = "text",
  placeholder,
  register,
  name,
  isEdit,
  disabled,
  defaultValue,
  style,
  className,
  "data-testid": dataTestId,
}: MyInputProps) {
  return (
    <>
      <input
        id={id}
        className={className || styles.inputArea__input}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        disabled={disabled ?? (isEdit === true ? true : false)}
        defaultValue={defaultValue}
        style={{
          backgroundColor: isEdit === true ? "#f2f2f2" : "#fff",
          ...style,
        }}
        data-testid={dataTestId}
      />
    </>
  );
}
