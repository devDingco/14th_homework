import AddImage from './../assets/add.svg';

export default function ImageUpload() {
  return (
    <div className='flex w-40 h-40 flex-col justify-center items-center gap-2 border-none bg-[#f2f2f2] gap-2  text-base font-normal leading-normal px-2 rounded-lg overflow-hidden '>
      <img src={AddImage} alt='addImage' />
      <p>클릭해서 사진 업로드</p>
    </div>
  );
}
