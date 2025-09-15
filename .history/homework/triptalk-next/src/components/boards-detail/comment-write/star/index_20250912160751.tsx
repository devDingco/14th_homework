import { Rate } from 'antd';
import { useState } from 'react';

export default function Star({ rating, onChange }) {
  return <Rate onChange={onChange} value={rating} />;
}
