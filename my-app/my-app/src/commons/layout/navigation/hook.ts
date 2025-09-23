import { useRouter } from "next/navigation";

export const useNavigation = () => {
  const router = useRouter();

  const onClickBoardsPage = () => {
    router.push(`/boards/`);
  };

  return {
    onClickBoardsPage,
  };
};
