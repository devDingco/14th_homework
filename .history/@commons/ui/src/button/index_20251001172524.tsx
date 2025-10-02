'use client';

import { FieldValues, FormState } from 'react-hook-form';

interface IProps {
  formState: FormState<FieldValues>;
  children: React.ReactNode;
}

export function MyButton(props: IProps) {
  return (
    <button className={styles.mybutton} disabled={!props.formState.isValid}>
      {props.children}
    </button>
  );
}
