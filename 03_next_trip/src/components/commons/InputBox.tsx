import { useState } from 'react';

type InputBoxProps = {
  label?: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isInput?: string;
  isSubmitCheck?: () => void;
  value?: string;
  defaultValue?: string;
  isEdit?: boolean;
  loginFailed?: boolean;
};

export default function InputBox({
  label,
  name,
  type,
  placeholder,
  required,
  onInput,
  onChange,
  isInput,
  value,
  isSubmitCheck,
  defaultValue,
  isEdit,
  loginFailed,
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
    <>
      {!isEdit && (
        <div className='flex w-full flex-col items-start justify-start gap-2'>
          <div className='flex w-full text-sm'>
            {label && (
              <label
                className='font-base flex w-full gap-1 font-semibold'
                htmlFor={label}
              >
                <span>{label}</span>
                {required ? <span className='text-[#f66a6a]'>*</span> : ''}
              </label>
            )}
          </div>
          <input
            id={label}
            name={name}
            type={type}
            className={`${loginFailed ? 'border-red-500' : ''} w-full flex-1 gap-2 rounded-lg border px-4 py-3 outline outline-1 outline-gray-200`}
            placeholder={placeholder}
            required={required}
            onInput={onInput}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            defaultValue={defaultValue}
          />
          {required && warning && (
            <span className='text-[#f66a6a]'>필수입력 사항 입니다.</span>
          )}
        </div>
      )}
    </>
  );
}
