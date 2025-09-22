'use client';
import { supabase } from '@/commons/libraries/supabase';

export default function MyApisList() {
const onClickSubmit = async () => {
  const result = await supabase.from('board').insert({
    writer:'초롱'
    
  })

  return (
    <>
      <div>
        <button onClick={onClickSubmit}>등록하기</button>
        <button onClick={onClickFetch}>조회하기</button>
      </div>
    </>
  );
}
