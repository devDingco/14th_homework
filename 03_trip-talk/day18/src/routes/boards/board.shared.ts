export interface PostForm {
  writer?: string
  password?: string
  title?: string
  contents?: string
  addr?: PostAddr
  link?: string
  img_src?: string[]
}

export interface PostAddr {
  zipcode?: string
  addr1?: string
  addr2?: string
}

export const initialPostValue: PostForm = {
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

// 유효성 검사 대상 키만 명시
export const VALIDATE_KEYS = ['writer', 'password', 'title', 'contents'] as const
export type ValidateKeys = (typeof VALIDATE_KEYS)[number]

// ✅ PostForm에서 검사 대상만 뽑은 값 타입
export type ValidateValues = Pick<PostForm, ValidateKeys>

// ✅ 에러는 “있을 수도 없을 수도” 있으므로 Partial
export type ValidateErrors = Partial<Record<ValidateKeys, string>>
