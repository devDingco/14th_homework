import Link from "next/link"

const Home = () => {
  return (
    <div className="flex_column flex_justi_center flex_align_items_center" style={{ height: "100vh" }}>
      <h1>초기페이지!</h1>
      <div><Link href='/boards/new'>게시글 등록</Link></div>
      <div><Link href='/boards/detail'>게시물 상세화면</Link></div>
    </div> 
  )
}

export default Home