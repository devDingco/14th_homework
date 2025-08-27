import BoardsNew from './routes/boards/new/BoardsNew'
import { Link } from 'react-router'

const App = () => {
  return (
    <>
      <h1>초기페이지!</h1>
      <div><Link to='/boards/new'>게시글 등록</Link></div>
      <div><Link to='/boards/detail'>게시물 상세화면</Link></div>
    </>
  );
}

export default App;
