import { Rate } from 'antd';

export default function Star({ rating, onChange, disabled = false }) {
  return <Rate onChange={onChange} value={rating} disabled={disabled} />;
}
