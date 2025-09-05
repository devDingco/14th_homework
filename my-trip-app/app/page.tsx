import "./global.css";
import "@components/header/header";
import "@components/banner/banner";
import CardList from "@components/cardList/cardList";
import SearchBarMenu from "@components/searchBarMenu/searchBar";
import ListComponent from "@components/listComponent/listComponent";
import { fetchBoardsSSR, fetchBoardsCountSSR } from "@/commons/apis/board.ssr";
import { formatDate } from "@/commons/hooks/formatDate";

export default async function Home({ searchParams }: { searchParams?: { page?: string } }) {
  const page = Number(searchParams?.page ?? "1");
  const [boards, totalCount] = await Promise.all([
    fetchBoardsSSR({ page }),
    fetchBoardsCountSSR({}),
  ]);

  const PAGE_SIZE = 10;
  const startNumber = Math.max(0, (totalCount ?? 0) - (page - 1) * PAGE_SIZE);
  const data = (boards ?? []).map((b: any, index: number) => ({
    id: b._id,
    no: Math.max(0, startNumber - index),
    title: b.title,
    author: b.writer ?? b.user?.name ?? "",
    date: formatDate(b.createdAt),
  }));

  const totalPages = Math.max(1, Math.ceil((totalCount ?? 0) / 10));

  return (
    <div>
      <CardList/>
      <h1 className="b_28_36" style={{width: "128rem", margin: "0 auto", marginBottom: "2.4rem"}}>트립토크 게시판</h1>
      <SearchBarMenu  postButtonLabel="트립토크 등록" />
      <ListComponent data={data} totalPages={totalPages} initialPage={page} />
    </div>
  );
}