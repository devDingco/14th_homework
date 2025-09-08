// components/boards-write/form-input.tsx

import styles from "./styles.module.css";
import React from "react";

interface InputProps {
  Input_Title?: React.ReactNode;
  Input_Star?: React.ReactNode;
  Input_Placeholder?: string;
  onChange?: React.ChangeEventHandler;
  errorMessage?: string;
  value?: string;
  disabled?: boolean;
}

export const SmallInput = (props: InputProps) => {
  return (
    <>
      <div className={styles.게시글_인풋_작은거}>
        <div className={styles.flex_row_gap4}>
          {props.Input_Title}
          <div className={styles.color_red}>{props.Input_Star}</div>
        </div>
        <input
          type="text"
          placeholder={props.Input_Placeholder}
          className={styles.작은인풋}
          onChange={props.onChange}
          value={props.value}
          disabled={props.disabled}
        />
        <div className={styles.text_red}>{props.errorMessage}</div>
      </div>
    </>
  );
};

export const LongInput = (props: InputProps) => {
  return (
    <>
      <div className={styles.게시글_인풋_긴거}>
        <div className={styles.flex_row_gap4}>
          {props.Input_Title}
          <div className={styles.color_red}>{props.Input_Star}</div>
        </div>
        <input
          type="text"
          placeholder={props.Input_Placeholder}
          className={styles.긴인풋}
          onChange={props.onChange}
          value={props.value}
          disabled={props.disabled}
        />
        <div className={styles.text_red}>{props.errorMessage}</div>
      </div>
    </>
  );
};

export const SuperLongInput = (props: InputProps) => {
  return (
    <>
      <div className={styles.게시글_인풋_큰거}>
        <div className={styles.flex_row_gap4}>
          {props.Input_Title}
          <div className={styles.color_red}>{props.Input_Star}</div>
        </div>
        <textarea
          placeholder={props.Input_Placeholder}
          className={styles.큰인풋}
          onChange={props.onChange}
          value={props.value}
          disabled={props.disabled}
        />
        <div className={styles.text_red}>{props.errorMessage}</div>
      </div>
    </>
  );
};
