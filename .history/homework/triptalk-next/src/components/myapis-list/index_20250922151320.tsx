'use client';
import { supabase } from '@/commons/libraries/supabase';

export default function MyApisList() {
  const onClickFetch = async () => {
    const { data } = await supabase.from('movies').select('*');
    console.log(data);
  };

  return (
    <>
      <div>
        <button onClick={onClickFetch}>조회하기</button>
      </div>
    </>
  );
}
