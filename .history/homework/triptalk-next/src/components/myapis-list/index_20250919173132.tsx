'use client';
import { supabase } from '@/commons/libraries/supabase';

export default function MyApisList() {
  const onClickSubmit = async () => {
    const result = await supabase.from('movies').insert({
      title: '어벤져스',
      director: '모름',
      rating: 5,
      content: '최고의 영화',
    });
    console.log(result);
  };
  const onClickFetch = async () => {
    const {data} = await supabase.from ('movies').select('*');
    console.log(data);

  return (
    <>
      <div>
        <button onClick={onClickSubmit}>등록하기</button>
        <button onClick={onClickFetch}>조회하기</button>
      </div>
    </>
  );
}
