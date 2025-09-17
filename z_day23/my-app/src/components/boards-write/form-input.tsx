import styles from "./styles.module.css";
import React from "react";

interface InputProps {
  Input_Title?: React.ReactNode;
  Input_Star?: React.ReactNode;
  Input_Placeholder?: string;
  name?: string;
  onChange?: React.ChangeEventHandler;
  errorMessage?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export const VerySmallInput = (props: InputProps) => {
  return (
    <>
      <div className={styles.게시글_인풋_작은거}>
        <div className={styles.flex_row_gap4}>
          {props.Input_Title}
          <div className={styles.color_red}>{props.Input_Star}</div>
        </div>
        <input
          type="text"
          name={props.name}
          placeholder={props.Input_Placeholder}
          className={styles.완전작은인풋}
          onChange={props.onChange}
          value={props.value}
          defaultValue={props.defaultValue}
          disabled={props.disabled}
          readOnly={props.readOnly}
        />
        <div className={styles.text_red}>{props.errorMessage}</div>
      </div>
    </>
  );
};

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
          name={props.name}
          placeholder={props.Input_Placeholder}
          className={styles.작은인풋}
          onChange={props.onChange}
          value={props.value}
          defaultValue={props.defaultValue}
          disabled={props.disabled}
          readOnly={props.readOnly}
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
          name={props.name}
          placeholder={props.Input_Placeholder}
          className={styles.긴인풋}
          onChange={props.onChange}
          value={props.value}
          defaultValue={props.defaultValue}
          disabled={props.disabled}
          readOnly={props.readOnly}
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
          name={props.name}
          placeholder={props.Input_Placeholder}
          className={styles.큰인풋}
          onChange={props.onChange}
          value={props.value}
          defaultValue={props.defaultValue}
          disabled={props.disabled}
          readOnly={props.readOnly}
        />
        <div className={styles.text_red}>{props.errorMessage}</div>
      </div>
    </>
  );
};
