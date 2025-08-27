import { Link } from 'react-router'
import './styles/App.css'

function App() {
  return (
    <div>
      편하게 이동하세요~!
      <br />
      <Link to="/boards/new">게시글 등록하기로 이동</Link>
      <br />
      <Link to="/boards/detail">게시글 상세내용으로 이동</Link>
    </div>
  )
}

export default App
