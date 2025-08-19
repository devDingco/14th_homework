import "./global.css";
import "../app/components/header/header";
import "../app/components/banner/banner";
import CardList from "../app/components/cardList/cardList";
import BoardList from "../app/components/boardList/index";
export default function Home() {
  return (
    <div>
      <CardList/>
      <BoardList/>
    </div>
  );
}