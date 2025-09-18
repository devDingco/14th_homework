import { MdAdd } from 'react-icons/md';

export default function ImageUpload() {
  return (
    <div className='flex h-[100px] w-[100px] flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-none bg-[#f2f2f2] px-2 text-sm font-normal leading-normal text-gray-400 tablet:h-40 tablet:w-40'>
      <MdAdd className='text-2xl text-gray-400' />
      <p>
        <span className='hidden'>클릭해서 </span>사진 업로드
      </p>
    </div>
  );
}
