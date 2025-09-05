import Link from "next/link"

export default function Home() {
  return (
    <div>
      <h1>첫페이지입니다.</h1><br/>

      <Link href="/board/new"><button >new 페이지로 이동</button></Link> 
      
      <br />
      <br/>
    
      <button><Link href="/board/detail">datail 페이지로 이동</Link></button>
      
      
    </div>
  );
}

