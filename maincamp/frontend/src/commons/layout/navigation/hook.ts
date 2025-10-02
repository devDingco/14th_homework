import { FETCH_USER_LOGGED_IN } from "@/graphql/queries/login";
import { useQuery } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";

export default function useNavigation() {
  const router = useRouter();

  const pathname = usePathname();

  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  const onClickBoards = () => {
    router.push("/boards");
  };
  const onClickLogin = () => {
    router.push("/login");
  };

  const onClickMypage = () => {
    router.push("/mypage");
  };

  return { onClickBoards, onClickLogin, onClickMypage, data, pathname };
}
