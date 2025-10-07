"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* <h1>초기 화면</h1> */}
      <Link href="/boards/new" >게시글 등록하기</Link>
    </div>
  );
}

