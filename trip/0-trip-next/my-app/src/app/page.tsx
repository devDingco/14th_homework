// import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (

    <>
      <div>시작페이지입니다.</div><br /><br />

      <Link href={"/boards/new"}>등록 페이지로 이동하기</Link><br />
      <Link href={"/boards/detail"}>디테일 페이지로 이동하기</Link>
    </>

  );
}
