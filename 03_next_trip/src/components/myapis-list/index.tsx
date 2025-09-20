'use client';

import { useState } from 'react';
import { useGetPosts } from './hooks';
import { TPost } from './types';
import { deletePost, updatePost } from './queries';

export default function MyApisList() {
  const { posts } = useGetPosts();

  return (
    <ul>
      {posts &&
        posts.map((post: TPost) => <MyApisItem key={post.id} post={post} />)}
    </ul>
  );
}

const initData = {
  title: '',
  content: '',
};

const MyApisItem = ({ post }: { post: TPost }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(initData);

  const toggleEdit = () => {
    setIsEdit((edit) => !edit);
  };

  const onClickUpdate = (id: string) => {
    updatePost(id, { title: form.title, content: form.content });
    setIsEdit(false);
    setForm(initData);
  };

  const onClickDelete = (id: string) => {
    deletePost(id);
  };

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    console.log(form);
  };

  return (
    <div className='flex flex-col'>
      <div className='mx-8 my-4 flex items-center justify-between border-b'>
        <div className='flex items-center justify-center gap-8'>
          {isEdit && (
            <div>
              <input
                id='title'
                name='title'
                type='text'
                value={form.title}
                placeholder='title'
                // defaultValue={post.title ? post.title : ''}
                onChange={(e) => onChangeForm(e)}
              />
              <input
                id='content'
                name='content'
                type='text'
                value={form.content}
                placeholder='content'
                // defaultValue={post.content ? post.content : ''}
                onChange={(e) => onChangeForm(e)}
              />
            </div>
          )}
          {!isEdit && (
            <li className='flex gap-8' key={post.id}>
              <p>{post.title}</p>
              <p>{post.content}</p>
            </li>
          )}
        </div>

        {/*  */}
        <div className='flex gap-4'>
          {!isEdit && <button onClick={toggleEdit}>수정</button>}
          {isEdit && (
            <>
              <button onClick={toggleEdit}>취소</button>
              <button onClick={() => onClickUpdate(post.id)}>완료</button>
            </>
          )}
          <button onClick={() => onClickDelete(post.id)}>삭제</button>
        </div>
      </div>
    </div>
  );
};
