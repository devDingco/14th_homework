'use client';

import { HTMLInputTypeAttribute } from 'react';
// import { useFormContext } from 'react-hook-form';
import styles from './styles.module.css';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { ISchema } from '@/app/section22/22-08-common-components-generic/schema';

interface IProps<T extends FieldValues> {
  type: HTMLInputTypeAttribute;
  register?: UseFormRegister<T>;
  name: Path<T>;
}

export function MyInput<T extends FieldValues>(props: IProps<T>) {
  // const { register } = useFormContext();
  // =>props.register 대신 useFormContext()로 가져올 수 도 있음

  // 1) props.register 방식 : 느슨한 결합
  //    - 장점) form 외부에서도 MyInput 컴포넌트 사용 가능 (폼 입력창 ,간단 검색창)
  //    - 단점) props 전달, props 타입 정의 등 추가해야 하므로, 코드량 증가

  // 2) useFormContext 방식: 강한 결합
  //    - 장점) 불필요한 props 전달 필요가 없으므로, 코드량 감소
  //    - 단점) form 외부에서는 MyInput 컴포넌트 사용 불가ㅁ(정확히는 <FormProvider/> 내에서만 가능)
  return (
    <input
      className={styles.myinput}
      type={props.type}
      {...props.register?.(props.name)}
    />
  );
}
