import "./global.css";
import "@components/header/header";
import "@components/banner/banner";
import CardList from "@components/cardList/cardList";
import SearchBarMenu from "@components/searchBarMenu/searchBar";
import ListComponent from "@components/listComponent/listComponent";

export default function Home() {
  return (
    <div>
      <CardList/>
      <h1 className="b_28_36" style={{width: "128rem", margin: "0 auto", marginBottom: "2.4rem"}}>트립토크 게시판</h1>
      <SearchBarMenu  postButtonLabel="트립토크 등록" />
      <ListComponent data={[]} totalPages={5} initialPage={1} />
    </div>
  );
}