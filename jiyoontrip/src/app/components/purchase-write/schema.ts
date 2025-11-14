import { CreateTravelproductInput, TravelproductAddressInput } from "@/commons/graphql/graphql";
import z from "zod";

export type ISchema = Pick<
  CreateTravelproductInput,
  "name" | "remarks" | "contents" | "price" | "tags" | "images"
> &
  Pick<TravelproductAddressInput, "zipcode" | "address" | "addressDetail" | "lat" | "lng">;

export const schema = z.object({
  productName: z.string().min(1, { message: "상품명을 입력해주세요." }),
  summary: z.string().min(1, { message: "한줄 요약을 입력해주세요." }),
  description: z.string().min(1, { message: "상품 설명을 입력해주세요." }),
  price: z.string().min(1, { message: "판매 가격을 입력해주세요." }).refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num > 0;
    },
    { message: "양수 값을 입력해주세요." }
  ),
  tags: z.string().optional(),
  zipcode: z.string().optional(),
  address: z.string().optional(),
  addressDetail: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
  images: z.array(z.string()).optional(),
});

