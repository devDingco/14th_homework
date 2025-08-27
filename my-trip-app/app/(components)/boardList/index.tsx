import SearchBarMenu from "@components/searchBarMenu/searchBar";
import BoardTable from "./boadList/boardList";

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

export default function BoardList( { totalPages = 5, initialPage = 1, onChange }: { totalPages: number, initialPage: number, onChange: (page: number) => void }) {
  return (
    <div style={styles.boardList_container}>
        <h1 className="b_28_36">트립토그 게시판</h1>
      <SearchBarMenu title="트립토그 게시판" filtersEnabled postButtonLabel="트립토그 등록"/>
      <BoardTable totalPages={totalPages} initialPage={initialPage} onChange={onChange} />
    </div>
  );
}