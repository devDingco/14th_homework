import "./global.css";
import "@components/header/header";
import "@components/banner/banner";
import CardList from "@components/cardList/cardList";
import SearchBarMenu from "@components/searchBarMenu/searchBar";
import ListComponent from "@components/listComponent";
import { fetchBoardsSSR, fetchBoardsCountSSR } from "@/commons/apis/board.ssr";
import { formatDate } from "@/commons/hooks/formatDate";
import PrefetchProvider from "@/commons/components/PrefetchProvider";

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
    <PrefetchProvider>
      <div>
        <CardList/>
        <SearchBarMenu postButtonLabel="트립토크 등록" showMainTitle={true} /> 
        <ListComponent data={data} totalPages={totalPages} initialPage={page} /> 
      </div>
    </PrefetchProvider>
  );
}