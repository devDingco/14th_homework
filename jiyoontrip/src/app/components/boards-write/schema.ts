import { CreateBoardInput, BoardAddressInput } from "@/commons/graphql/graphql";
import z from "zod";

export type ISchema = Pick<
  CreateBoardInput,
  "writer" | "title" | "contents" | "youtubeUrl" | "images"
> &
  Pick<BoardAddressInput, "zipcode" | "address" | "addressDetail"> & {
    password: string;
  };

export const schema = z.object({
  writer: z.string().min(1, { message: "작성자를 입력해주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  contents: z.string().min(1, { message: "내용을 입력해주세요." }),
  boardAddress: z
    .object({
      zipcode: z.string().optional(),
      address: z.string().optional(),
      addressDetail: z.string().optional(),
    })
    .optional(),
  youtubeUrl: z.string().optional(), //
  images: z.array(z.string()).optional(),
});
