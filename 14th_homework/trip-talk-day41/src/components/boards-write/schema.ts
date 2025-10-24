import z from "zod";
// import { message } from "antd";

export const schema = z.object({
  writer: z.string().min(1, { message: "작성자는 필수 입력입니다." }),
  title: z.string().min(2, { message: "제목은 2자 이상 입력해 주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자글자 이상이어야 합니다" })
    .max(16, { message: "비밀번호는 최대 16글자 이하이어야 합니다." }),
  contents: z.string().min(1, { message: "내용은 필수 입력입니다." }),
  zonecode: z.string().optional(),
  address: z.string().optional(),
  address_detail: z.string().optional(),
  url: z.string().optional(),
  images: z.array(z.string()).optional(),
});
