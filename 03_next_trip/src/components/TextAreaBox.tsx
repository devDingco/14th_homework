import { useState } from 'react';

type TextAreaBoxProps = {
  lable: string;
  name: string;
  placeholder: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isInput?: string;
  isSubmitCheck: () => void;
};

export default function TextAreaBox({
  lable,
  name,
  placeholder,
  required,
  onChange,
  isInput,
  isSubmitCheck,
}: TextAreaBoxProps) {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    isSubmitCheck();
  };

  const warning = touched && !isInput;
  console.log(warning);

  return (
    <div className='flex flex-col gap-2 w-full justify-start items-start'>
      <div className='flex gap-1'>
        <label className='font-base font-semibold' htmlFor={lable}>
          {lable}
        </label>
        {required ? <span className='text-[#f66a6a]'>*</span> : ''}
      </div>
      <textarea
        id={name}
        name={name}
        className='flex-1 min-h-[336px] py-3 px-4 rounded-lg outline outline-1 outline-gray-200 w-full'
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        onBlur={handleBlur}
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
