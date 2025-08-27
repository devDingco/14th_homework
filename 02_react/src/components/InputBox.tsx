import { useState } from 'react';

type InputBoxProps = {
  lable: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isInput?: string;
  isSubmitCheck?: () => void;
};

export default function InputBox({
  lable,
  name,
  type,
  placeholder,
  required,
  onChange,
  isInput,
  isSubmitCheck,
}: InputBoxProps) {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    if (isSubmitCheck) {
      isSubmitCheck();
    }
  };

  // focus out & input null
  const warning = touched && !isInput;

  return (
    <div className='flex flex-col gap-2 w-full justify-start items-start'>
      <div className='flex gap-1 text-sm'>
        <label className='font-base font-semibold' htmlFor={lable}>
          {lable}
        </label>
        {required ? <span className='text-[#f66a6a]'>*</span> : ''}
      </div>
      <input
        id={lable}
        name={name}
        type={type}
        className='flex-1 px-4 py-3 rounded-lg outline outline-1 outline-gray-200 w-full gap-2'
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        onBlur={handleBlur}
      />
      <div className='h-10'>
        <span className='text-[#f66a6a]'>
          {warning ? '필수입력 사항 입니다.' : ''}
        </span>
      </div>
      {/* {isInput ? <div></div> : <RequiredInput />} */}
      {/* <input placeholder={`${placeholder} 입력해 주세요.`}></input> */}
    </div>
  );
}
