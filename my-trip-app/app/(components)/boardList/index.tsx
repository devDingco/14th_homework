import SearchBarMenu from "@components/searchBarMenu/searchBar";
import BoardTable from "./boadList/boardList";
import type { BoardListProps } from "@/types/pagination";
import type { LooseStyle } from "@/types/style";

const styles = {
  boardList_container: {
    width: "128rem",
    margin: "0 auto",
    gap: "2.4rem",
    display: "flex",
    flexDirection: "column",
    marginBottom: "4rem",
  },
};

export default function BoardList({ totalPages = 5, initialPage = 1, onChange }: BoardListProps) {
  return (
    <div style={styles.boardList_container as LooseStyle}>
        <h1 className="b_28_36">트립토그 게시판</h1>
      <SearchBarMenu title="트립토그 게시판" filtersEnabled postButtonLabel="트립토그 등록"/>
      <BoardTable totalPages={totalPages} initialPage={initialPage} onChange={onChange} />
    </div>
  );
}