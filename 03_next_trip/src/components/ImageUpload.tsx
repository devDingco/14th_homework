import Image from 'next/image';
import AddImage from './../assets/add.svg';

export default function ImageUpload() {
  return (
    <div className='h-25 w-25 flex flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-none bg-[#f2f2f2] px-2 text-base font-normal leading-normal tablet:h-40 tablet:w-40'>
      <Image src={AddImage} alt='addImage' />
      <p>
        <span className='hidden'>클릭해서 </span>사진 업로드
      </p>
    </div>
  );
}
