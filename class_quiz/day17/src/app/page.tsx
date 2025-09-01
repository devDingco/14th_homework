import Link from 'next/link'
export default function Home() {
  return (
    <div>
      <Link href={'/faq'}>faq 페이지로 이동</Link>
    </div>
  )
}
