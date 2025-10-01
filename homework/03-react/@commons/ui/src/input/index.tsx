"use client";

import { HTMLInputTypeAttribute } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styles from "./styles.module.css";

interface IProps<T extends FieldValues> {
  type?: HTMLInputTypeAttribute;
  register?: UseFormRegister<T>;
  name: Path<T>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  multiline?: boolean; // textarea 여부
}

export default function Input<T extends FieldValues>({
  type = "text",
  register,
  name,
  placeholder,
  disabled = false,
  className = "",
  multiline = false,
}: IProps<T>) {
  if (multiline) {
    return (
      <textarea
        placeholder={placeholder}
        disabled={disabled}
        className={`${styles.myInput} ${styles.myTextarea} ${className}`}
        {...(register ? register(name) : {})}
      />
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={`${styles.myInput} ${className}`}
      {...(register ? register(name) : {})}
    />
  );
}
