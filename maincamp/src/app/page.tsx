import Button from '@/components/ui/button/Button'
import { Inputfield, Textareafield } from '@/components/ui/input/Inputfield';
import InputImage from '@/components/ui/input/InputImage';
import InputZipcode from '@/components/ui/input/InputZipcode';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href='/boards/new'>
      <Button type="button" variant="FormBtn">
        게시글 등록하기
      </Button>
      </Link>

      <Link href="/boards/detail">
      <Button type="button" variant="FormBtn">
        게시글 상세보기
      </Button>
      </Link>

    </div>
  );
}
