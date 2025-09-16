import { Rate } from 'antd';
import { useState } from 'react';
import { rating, onChange } from '@/components/boards-detail/comment-write';

export default function Star({ rating, onChange }) {
  return <Rate onChange={onChange} value={rating} />;
}
