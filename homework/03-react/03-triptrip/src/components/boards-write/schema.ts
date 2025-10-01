import { CreateBoardInput } from "@/commons/graphql/graphql";
import z from "zod";


export type ISchema = Pick<
  CreateBoardInput,
  "writer" | "password" | "title" | "contents" | "youtubeUrl" | "boardAddress"
> & {
  zipcode?: string;
  address?: string;
  addressDetail?: string;
};

// ✅ Zod 스키마 정의
export const baseSchema = z.object({
    writer: z.string().min(1, { message: "필수입력 사항 입니다." }),
    password: z
        .string()
        .min(8, { message: "비밀번호는 최소 8자리 이상 입력해 주세요." })
        .max(16, {message: "비밀번호는 최대 16자리로 입력해 주세요."})
        .optional(), // optional 처리
    title: z.string().min(2, { message: "제목은 2자 이상 입력해 주세요." }),
    contents: z.string().min(1, { message: "필수입력 사항 입니다." }),
    youtubeUrl: z.string().optional(),
    zipcode: z.string().optional(),
    address: z.string().optional(),
    addressDetail: z.string().optional(),
});

// 🧩 3️⃣ isEdit 분기만 따로 내보내기 (Pick/Partial 안 쓰고 깔끔하게)
export const getSchema = (isEdit: boolean) =>
    isEdit ? baseSchema.partial({ writer: true, password: true }) : baseSchema;

// ✅ 타입 추론해서 export
export type FormValues = z.infer<typeof baseSchema>;