const PostRegistrationPage = () => {
  return (
    <main>
      <Header title={'게시물 등록'} />
      <form className="post-form">
        <div className="post-form-col">
          <InputWithLabel
            label={'작성자'}
            required={true}
            placeholder={'작성자 명을 입력해 주세요.'}
          />
          <InputWithLabel
            label={'비밀번호'}
            required={true}
            placeholder={'비밀번호를 입력해 주세요.'}
          />
        </div>
        <hr />
        <InputWithLabel label={'제목'} required={true} placeholder={'제목을 입력해 주세요.'} />
        <hr />
        <TextAreaWithLabel label={'내용'} required={true} placeholder={'내용을 입력해 주세요.'} />

        <AddrWithLabel
          label={'주소'}
          required={false}
          placeholder={{ zipcode: '01234', addr1: '주소를 입력해 주세요.', addr2: '상세주소' }}
        />
        <hr />
        <InputWithLabel
          label={'유튜브 링크'}
          required={false}
          placeholder={'링크를 입력해 주세요.'}
        />
        <hr />

        <UploadImagesWithLabel />
        <PostActions />
      </form>
    </main>
  )
}
