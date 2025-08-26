import './text-input.css';

export default function TextInput({ placeholder, value, onChange }) {
  return <input type="text" className="text_input" placeholder={placeholder} value={value} onChange={onChange} />;
}
