import "./global.css";
import "@components/header/header";
import "@components/banner/banner";
import CardList from "@components/cardList/cardList";
import BoardList from "@components/boardList/boadList/boardList";
import SearchBarMenu from "@components/searchBarMenu/searchBar.jsx";
export default function Home() {
  return (
    <div>
      <CardList/>
      <SearchBarMenu title="트립토크 게시판" postButtonLabel="트립토크 등록" />
      <BoardList/>
    </div>
  );
}