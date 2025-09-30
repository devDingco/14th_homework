import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const withAuth = (Component) => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      alert("로그인 후 이용가능합니다!");
      router.push("/auth/signin");
    }
  }, []);
  return (
    <>
      <Component />
    </>
  );
};
