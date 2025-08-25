const Header = (props) => {
  const { title } = props
  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}

const InputWithLabel = (props) => {
  const { label, required = false, placeholder } = props
  return (
    <div class="post-form-input">
      <div>
        <label>{label}</label>
        <span>{required ? '*' : ''}</span>
      </div>

      <input placeholder={placeholder} />
    </div>
  )
}

const TextAreaWithLabel = (props) => {
  const { label, required = false, placeholder } = props
  return (
    <div class="post-form-input">
      <div>
        <label>{label}</label>
        <span>{required ? '*' : ''}</span>
      </div>

      <textarea placeholder={placeholder} />
    </div>
  )
}

const AddrWithLabel = (props) => {
  const { label, required = false, placeholder } = props
  return (
    <div class="post-form-addr">
      <div>
        <label>{label}</label>
        <span>{required ? '*' : ''}</span>
      </div>
      <div class="post-form-addr-active">
        <input class="post-form-addr-zipcode" placeholder={placeholder.zipcode} />
        <CustomButton type={'button'} content={'우편번호 검색'} color={'default'} />
      </div>
      <input placeholder={placeholder.addr1} />
      <input placeholder={placeholder.addr2} />
    </div>
  )
}

const UploadImage = () => {
  return (
    <div class="post-form-upload-img">
      <label for="file">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M18.75 21.25H10.4167C10.0625 21.25 9.76568 21.1301 9.52624 20.8904C9.28652 20.6507 9.16666 20.3537 9.16666 19.9995C9.16666 19.6451 9.28652 19.3483 9.52624 19.1091C9.76568 18.8697 10.0625 18.75 10.4167 18.75H18.75V10.4166C18.75 10.0625 18.8699 9.76565 19.1096 9.52621C19.3493 9.28649 19.6462 9.16663 20.0004 9.16663C20.3549 9.16663 20.6517 9.28649 20.8908 9.52621C21.1303 9.76565 21.25 10.0625 21.25 10.4166V18.75H29.5833C29.9375 18.75 30.2343 18.8698 30.4737 19.1095C30.7135 19.3493 30.8333 19.6462 30.8333 20.0004C30.8333 20.3548 30.7135 20.6516 30.4737 20.8908C30.2343 21.1302 29.9375 21.25 29.5833 21.25H21.25V29.5833C21.25 29.9375 21.1301 30.2343 20.8904 30.4737C20.6507 30.7134 20.3537 30.8333 19.9996 30.8333C19.6451 30.8333 19.3483 30.7134 19.1092 30.4737C18.8697 30.2343 18.75 29.9375 18.75 29.5833V21.25Z"
            fill="#777777"
          />
        </svg>
        <div class="btn-upload">클릭해서 사진 업로드</div>
      </label>
      <input type="file" id="file" />
    </div>
  )
}

const UploadImagesWithLabel = () => {
  return (
    <div class="post-form-upload-imgs">
      <label>사진 첨부</label>
      <div class="post-form-img-col">
        <UploadImage />
        <UploadImage />
        <UploadImage />
      </div>
    </div>
  )
}

const CustomButton = (props) => {
  const { type = 'button', content, disabled = false, color } = props

  const getButtonStyleByColor = (color) => {
    switch (color) {
      case 'default':
        return
      case 'blue':
        return {
          backgroundColor: '#2974E5',
          color: 'var(--color-white)',
          border: 'none',
        }
      case 'black':
        return {
          backgroundColor: 'var(--color-black)',
          color: 'var(--color-black)',
          border: 'none',
        }
    }
  }
  return (
    <button type={type} style={getButtonStyleByColor(color)} disabled={disabled}>
      {content}
    </button>
  )
}

const PostActions = () => {
  return (
    <div class="post-actions">
      <CustomButton type={'button'} content={'취소'} color={'default'} />
      <CustomButton type={'submit'} content={'등록하기'} color={'blue'} disabled={false} />
    </div>
  )
}

const PostRegistrationPage = () => {
  return (
    <main>
      <Header title={'게시물 등록'} />
      <form class="post-form">
        <div class="post-form-col">
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
