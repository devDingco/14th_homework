import HotBoard from './HotBoard';

export default function HotBoardList() {
  return (
    <div className='h-42 mb-10 w-full px-5'>
      <div className='flex flex-col gap-4'>
        <p className='text-lg font-semibold leading-tight text-gray-900'>
          오늘 핫한 트립토크
        </p>

        <HotBoard />
      </div>
    </div>
  );
}
