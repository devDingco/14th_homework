import HeadComponent from "./headCompoents/headComponent";
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

export default function BoardList() {
  return (
    <div style={styles.boardList_container}>
        <h1 className="b_28_36">트립토그 게시판</h1>
      <HeadComponent/>
      <BoardTable/>
    </div>
  );
}