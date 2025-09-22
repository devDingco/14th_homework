'use client';

import { supabase } from '@/commons/libraries/supabase';
import { supabaseStyles } from '@/components/myapis-list/styles';
import { useState } from 'react';

export type Inputs = {
  // id: string;
  writer: string;
  title: string;
  content: string | null;
  // created_at: string;
};

export default function SupabasePage() {
  // 공통 input
  const [inputs, setInputs] = useState<Inputs>({
    writer: '',
    title: '',
    content: '',
  });

  // 공통 onChange
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  // 게시글 등록
  const onclickSubmit = async () => {
    const { writer, title, content } = inputs;

    if (!writer.trim() || !title.trim()) {
      alert('필수입력 사항입니다.');
      return;
    }

    const { error } = await supabase
      .from('board')
      .insert([{ writer: writer.trim(), title: title.trim(), content: content || null }]);
    if (error) {
      alert('등록 실패: ' + error.message);
      return;
    }
    // console.log(error);
  };
  // 폼 초기화
  setInputs({ writer: '', title: '', content: '' });

  // 게시글 정보 가져오기
  const onClickLoadWriterList = async () => {
    const { data } = await supabase
      .from('board')
      .select('writer, created_at')
      .order('created_at', { ascending: true });

    console.log(data);
  };

  // 세부 데이터 가져오기
  const onClickFetchDetails = async () => {
    const { data } = await supabase.from('board').select('*').eq('id', id);
    console.log(data);
  };
  // 게시글 업데이트
  //   const onClickUpdate = async () => {
  //     const { data } = await
  //   };
  //   // 게시글 삭제
  //   const onClickDelete = async () => {
  //     const
  //   };

  return (
    <div className={supabaseStyles.layout}>
      <button onClick={onClickLoadWriterList}>작성자목록조회하기</button>
      <br />
      <button onClick={onClickFetchDetails}>(테스트)</button>
      <br />
      <button onClick={onclickSubmit}>게시글 등록하기</button>
      <br />
      {/* <button onClick={onClickUpdate}>게시글 수정하기</button> */}
      <br />
      {/* <button onClick={onClickDelete}>게시글 삭제하기</button> */}
    </div>
  );
}
