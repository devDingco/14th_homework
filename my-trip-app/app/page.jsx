import "./global.css";
import "@components/header/header";
import "@components/banner/banner";
import CardList from "@components/cardList/cardList";
import BoardList from "@components/boardList";
export default function Home() {
  return (
    <div>
      <CardList/>
      <BoardList/>
    </div>
  );
}