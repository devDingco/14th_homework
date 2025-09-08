import { useState } from 'react';

type TextAreaBoxProps = {
  lable: string;
  name: string;
  placeholder: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isInput?: string;
  isSubmitCheck: () => void;
  defaultValue?: string;
};

export default function TextAreaBox({
  lable,
  name,
  placeholder,
  required,
  onChange,
  isInput,
  isSubmitCheck,
  defaultValue,
}: TextAreaBoxProps) {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    isSubmitCheck();
  };

  const warning = touched && !isInput;
  console.log(warning);

  return (
    <div className='flex w-full flex-col items-start justify-start gap-2'>
      <div className='flex gap-1'>
        <label className='font-base font-semibold' htmlFor={lable}>
          {lable}
        </label>
        {required ? <span className='text-[#f66a6a]'>*</span> : ''}
      </div>
      <textarea
        id={name}
        name={name}
        className='min-h-[336px] w-full flex-1 rounded-lg px-4 py-3 outline outline-1 outline-gray-200'
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        onBlur={handleBlur}
        defaultValue={defaultValue}
      ></textarea>
      <div className='h-10'>
        <span className='text-[#f66a6a]'>
          {warning ? '필수입력 사항 입니다.' : ''}
        </span>
      </div>
      {/* <input placeholder={`${placeholder} 입력해 주세요.`}></input> */}
    </div>
  );
}
