import './text-input.css';
import { ChangeEvent } from 'react';

interface TextInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({ placeholder, value, onChange }: TextInputProps) {
  return <input type="text" className="text_input" placeholder={placeholder} value={value} onChange={onChange} />;
}
