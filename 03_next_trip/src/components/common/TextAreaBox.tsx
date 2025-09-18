import { useState } from 'react';

type TextAreaBoxProps = {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isInput?: string;
  isSubmitCheck: () => void;
  defaultValue?: string;
};

export default function TextAreaBox({
  label,
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

  return (
    <div className='flex w-full flex-col items-start justify-start gap-2'>
      <div className='flex gap-1'>
        <label className='font-base font-semibold' htmlFor={label}>
          {label}
        </label>
        {required ? <span className='text-[#f66a6a]'>*</span> : ''}
      </div>
      <textarea
        id={name}
        name={name}
        className='min-h-[120px] w-full flex-1 rounded-lg px-4 py-3 outline outline-1 outline-gray-200'
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        onBlur={handleBlur}
        defaultValue={defaultValue}
        rows={3}
      ></textarea>
      {warning && <span className='text-[#f66a6a]'>필수입력 사항 입니다.</span>}
    </div>
  );
}
