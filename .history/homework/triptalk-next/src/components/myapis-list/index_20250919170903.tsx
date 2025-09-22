'use client';
import { supabase } from '@/commons/libraries/supabase';

export default function MyApisList() {
const onClickSubmit = async () => {

  return (
    <>
      <div>
        <button onClick={onClickSubmit}>등록하기</button>
        <button onClick={onClickFetch}>조회하기</button>
      </div>
    </>
  );
}
