// import { MdOutlineCalendarToday } from 'react-icons/md';

export default function BoardFilter() {
  return (
    <div className='mb-6 px-5'>
      <p className='mb-4 text-lg font-semibold leading-tight text-gray-900'>
        트립토크 게시판
      </p>
      <form className='flex flex-col gap-3'>
        {/* <MdOutlineCalendarToday /> */}
        <input
          className='h-10 rounded-lg bg-gray-100'
          type='text'
          placeholder='기간검색'
        />
        <input
          className='h-10 rounded-lg bg-gray-100'
          type='text'
          placeholder='키워드검색'
        />
        <button className='h-10 w-full rounded bg-black px-4 py-2 text-white'>
          검은색
        </button>
      </form>
    </div>
  );
}
