import z from 'zod';

// 등록용 스키마
export const sellSchema = z.object({
  name: z.string().min(1, { message: '상품명을 입력해 주세요.' }).trim(),
  summary: z.string().min(1, { message: '한줄 요약을 입력해 주세요.' }).trim(),
  description: z.string().min(1, { message: '상품 설명을 입력해 주세요.' }).trim(),
  price: z
    .string()
    .min(1, { message: '판매 가격을 입력해 주세요.' })
    .refine(
      (val) => {
        const num = Number(val.replace(/,/g, ''));
        return !isNaN(num) && num > 0;
      },
      { message: '올바른 가격을 입력해 주세요.' }
    )
    .refine(
      (val) => {
        const num = Number(val.replace(/,/g, ''));
        // GraphQL Int 타입은 32-bit signed integer만 지원 (최대값: 2,147,483,647)
        return num <= 2147483647;
      },
      { message: '가격은 2,147,483,647원 이하여야 합니다.' }
    ),
  tags: z.string().min(1, { message: '태그를 입력해 주세요.' }).trim(),
  zipcode: z.string().min(1, { message: '우편번호를 입력해 주세요.' }),
  address: z.string().min(1, { message: '주소를 입력해 주세요.' }),
  addressDetail: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
});

// 수정용 스키마
export const updateSellSchema = z.object({
  name: z.string().min(1, { message: '상품명을 입력해 주세요.' }).trim(),
  summary: z.string().min(1, { message: '한줄 요약을 입력해 주세요.' }).trim(),
  description: z.string().min(1, { message: '상품 설명을 입력해 주세요.' }).trim(),
  price: z
    .string()
    .min(1, { message: '판매 가격을 입력해 주세요.' })
    .refine(
      (val) => {
        const num = Number(val.replace(/,/g, ''));
        return !isNaN(num) && num > 0;
      },
      { message: '올바른 가격을 입력해 주세요.' }
    )
    .refine(
      (val) => {
        const num = Number(val.replace(/,/g, ''));
        // GraphQL Int 타입은 32-bit signed integer만 지원 (최대값: 2,147,483,647)
        return num <= 2147483647;
      },
      { message: '가격은 2,147,483,647원 이하여야 합니다.' }
    ),
  tags: z.string().min(1, { message: '태그를 입력해 주세요.' }).trim(),
  zipcode: z.string().min(1, { message: '우편번호를 입력해 주세요.' }),
  address: z.string().min(1, { message: '주소를 입력해 주세요.' }),
  addressDetail: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
});

export type ISellSchema = z.infer<typeof sellSchema>;
export type IUpdateSellSchema = z.infer<typeof updateSellSchema>;

export interface AccommodationSellVariables {
  data?: any; // TODO: 실제 타입 정의 필요
  isEdit: boolean;
}

export type Errors = {
  name?: string;
  summary?: string;
  description?: string;
  price?: string;
  tags?: string;
  zipcode?: string;
  address?: string;
  addressDetail?: string;
  lat?: string;
  lng?: string;
  images?: string;
};
