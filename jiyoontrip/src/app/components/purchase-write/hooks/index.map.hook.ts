import { useKakaoLoader } from "react-kakao-maps-sdk";

export default function usePurchaseWriteMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAOJSKEY as string,
  });
}

