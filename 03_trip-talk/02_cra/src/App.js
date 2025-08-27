import { useState } from 'react'
import './App.css'
import {
  Header,
  InputWithLabel,
  TextAreaWithLabel,
  PostActions,
  AddrWithLabel,
  UploadImagesWithLabel,
} from './components'
import useForm from './hooks/useForm'
import validate from './utils/validate'

function App() {
  const initialPostValue = {
    writer: '',
    password: '',
    title: '',
    contents: '',
    addr: {
      zipcode: '',
      addr1: '',
      addr2: '',
    },
    link: '',
    img_src: [],
  }

  const {
    values: post,
    errors,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues: initialPostValue,
    validate,
  })

  return (
    <div>
      <div className="container">
        <main id="post">
          <Header title={'게시물 등록'} />
          <form className="post-form" onSubmit={handleSubmit}>
            <div className="post-form-col">
              <InputWithLabel
                label={'작성자'}
                required={true}
                placeholder={'작성자 명을 입력해 주세요.'}
                onChange={handleChange}
                name={'writer'}
                value={post.writer}
                error={errors.writer}
              />
              <InputWithLabel
                label={'비밀번호'}
                type={'password'}
                required={true}
                placeholder={'비밀번호를 입력해 주세요.'}
                onChange={handleChange}
                name={'password'}
                value={post.password}
                error={errors.password}
              />
            </div>
            <hr />
            <InputWithLabel
              label={'제목'}
              required={true}
              placeholder={'제목을 입력해 주세요.'}
              onChange={handleChange}
              name={'title'}
              value={post.title}
              error={errors.title}
            />
            <hr />
            <TextAreaWithLabel
              label={'내용'}
              required={true}
              placeholder={'내용을 입력해 주세요.'}
              onChange={handleChange}
              name={'contents'}
              value={post.contents}
              error={errors.contents}
            />

            <AddrWithLabel
              label={'주소'}
              required={false}
              placeholder={{ zipcode: '01234', addr1: '주소를 입력해 주세요.', addr2: '상세주소' }}
              onChange={handleChange}
              name={'addr'}
              value={post.addr}
            />
            <hr />
            <InputWithLabel
              label={'유튜브 링크'}
              required={false}
              placeholder={'링크를 입력해 주세요.'}
              onChange={handleChange}
              name={'link'}
              value={post.link}
            />
            <hr />

            <UploadImagesWithLabel />
            <PostActions />
          </form>
        </main>
      </div>
    </div>
  )
}

export default App
