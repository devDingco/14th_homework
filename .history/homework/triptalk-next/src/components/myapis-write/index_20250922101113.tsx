'use client';
import { supabase } from '@/commons/libraries/supabase';

export default function MyApisWrite() {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const onClickSubmit = async () => {
    const result = await supabase.from('movies').insert({
      title: title,
      director: director,
      rating: Number(rating),
      content: content,
    });
    console.log(result);
  };

  return (
    <div>
      <div>
        <div>영화제목</div>
        <input type="text" value={title} />
      </div>
      <div>
        <div>감독</div>
        <input type="text" />
      </div>
      <div>
        <div>평점</div>
        <input type="text" />
      </div>
      <div>
        <div>리뷰내용</div>
        <input type="text" />
      </div>

      <button onClick={onClickSubmit}>등록하기</button>
    </div>
  );
}
