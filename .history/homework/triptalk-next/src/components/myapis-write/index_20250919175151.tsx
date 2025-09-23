'use client';
import { supabase } from '@/commons/libraries/supabase';

export default function MyApisWrite() {
  const onClickSubmit = async () => {
    const result = await supabase.from('movies').insert({
      title: '어벤져스',
      director: '모름',
      rating: 5,
      content: '최고의 영화',
    });
    console.log(result);
  };

  return (
    <>
      <div>
        <div>
          <div>영화제목</div>
          <input type="text" />
        </div>

        <button onClick={onClickSubmit}>등록하기</button>
      </div>
    </>
  );
}
