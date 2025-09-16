import { Rate } from 'antd';
import { useState } from 'react';

export default function Star() {
  const [value, setValue] = useState(3);

  return <Rate onChange={setValue} value={value} />;
}
