import z from 'zod';

// HTML 내용이 실제로 비어있는지 확인하는 헬퍼 함수
const isHtmlEmpty = (html: string): boolean => {
  if (!html || html.trim() === '') return true;
  // HTML 태그를 제거하고 텍스트만 추출
  const textContent = html.replace(/<[^>]*>/g, '').trim();
  return textContent === '';
};

// 기본 스키마 (게시글 등록용)
export const schema = z.object({
  writer: z.string().min(1, { message: '작성자명을 입력해 주세요.' }).trim(),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자리 이상 입력해 주세요.' })
    .max(16, { message: '비밀번호는 최대 16글자까지 입력할 수 있습니다.' }),
  title: z.string().min(2, { message: '제목은 2글자 이상 입력해 주세요.' }).trim(),
  contents: z
    .string()
    .min(1, { message: '내용을 입력해 주세요.' })
    .refine((val) => !isHtmlEmpty(val), { message: '내용을 입력해 주세요.' }),
  addressDetail: z.string().optional(),
  youtubeUrl: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === '') return true;
        // 유튜브 URL 형식 검증 (선택적)
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
        return youtubeRegex.test(val);
      },
      { message: '올바른 유튜브 URL을 입력해 주세요.' }
    ),
});

// 게시글 수정용 스키마 (작성자, 비밀번호 제외)
export const updateSchema = z.object({
  writer: z.string().optional(),
  password: z.string().optional(),
  title: z.string().min(2, { message: '제목은 2글자 이상 입력해 주세요.' }).trim(),
  contents: z
    .string()
    .min(1, { message: '내용을 입력해 주세요.' })
    .refine((val) => !isHtmlEmpty(val), { message: '내용을 입력해 주세요.' }),
  addressDetail: z.string().optional(),
  youtubeUrl: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === '') return true;
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
        return youtubeRegex.test(val);
      },
      { message: '올바른 유튜브 URL을 입력해 주세요.' }
    ),
});

export type ISchema = z.infer<typeof schema>;
export type IUpdateSchema = z.infer<typeof updateSchema>;
