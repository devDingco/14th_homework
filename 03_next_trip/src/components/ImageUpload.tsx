import Image from 'next/image';
import AddImage from './../assets/add.svg';

export default function ImageUpload() {
  return (
    <div className='flex h-40 w-40 flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-none bg-[#f2f2f2] px-2 text-base font-normal leading-normal'>
      <Image src={AddImage} alt='addImage' />
      <p>클릭해서 사진 업로드</p>
    </div>
  );
}
