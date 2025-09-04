import SearchBarMenu from "@components/searchBarMenu/searchBar";
import BoardTable from "./listComponent";
import type { BoardListProps } from "@/types/pagination";
import type { LooseStyle } from "@/types/style";
import { mockRows } from "@/common/utils/mocks-data";

const styles = {
  boardList_container: {
    width: "100%",
    maxWidth: "128rem",
    margin: "0 auto",
    gap: "2.4rem",
    display: "flex",
    flexDirection: "column",
    marginBottom: "4rem",
  },
};

export default function BoardList({ data = mockRows, title, filtersEnabled, postButtonLabel = "트립토그 등록", totalPages = 5, initialPage = 1, onChange }: BoardListProps) {
  return (
    <div style={styles.boardList_container as LooseStyle}>
      <SearchBarMenu title={title} filtersEnabled={filtersEnabled} postButtonLabel={postButtonLabel}/>
      <BoardTable data={data} totalPages={totalPages} initialPage={initialPage} onChange={onChange} />
    </div>
  );
}