'use client';
import { MdOutlineSearch, MdOutlineCalendarToday } from 'react-icons/md';
import { DatePicker } from '../datepicker';

type TSearchProps = {
  keyword: string;
  onhandle: (keyword: string) => void;
  getDebounce: (value: string) => void;
  refetchBoards: () => void;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  startDate: Date | undefined;
  endDate: Date | undefined;
};

export default function Search({
  // keyword,
  // onhandle,
  getDebounce,
  refetchBoards,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}: TSearchProps) {
  // const router = useRouter();
  // const { setStartDate, setEndDate } = usePagination();

  const onChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    // onhandle(event.target.value);
    getDebounce(event.target.value);
  };

  const startDateFn = (date: Date | undefined) => {
    setStartDate(date);
  };
  const endDateFn = (date: Date | undefined) => {
    setEndDate(date);
  };
  // const onClickSearch = () => {
  //   getDebounce(keyword);
  // };

  // const onClickPage = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   refetch({ page: Number(event.currentTarget.id) });
  // };

  const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    refetchBoards();
  };

  return (
    <div className='mb-6'>
      <p className='mb-4 text-lg font-semibold leading-tight text-gray-900'>
        트립토크 게시판
      </p>
      <form className='flex flex-col gap-3' onSubmit={onSubmitSearch}>
        <span className='flex items-center gap-2 bg-gray-100 px-3 py-2 text-base'>
          <MdOutlineCalendarToday className='h-6 w-6 text-gray-500' />
          <span className='flex h-10 items-center rounded-sm bg-gray-100 text-gray-400'>
            <DatePicker selected={startDate} setDate={startDateFn} />
            <span>&nbsp;-&nbsp;</span>
            <DatePicker selected={endDate} setDate={endDateFn} />
          </span>
        </span>
        <span className='flex items-center gap-2 bg-gray-100 px-3 py-2 text-base'>
          <MdOutlineSearch className='h-6 w-6 text-gray-500' />
          <input
            className='h-10 rounded-lg bg-gray-100'
            type='text'
            placeholder='필요한 내용을 검색해 주세요.'
            // value={keyword}
            onChange={onChangeKeyword}
          />
        </span>

        <button className='h-10 w-full rounded bg-black px-4 py-2 text-white'>
          검색
        </button>
      </form>
    </div>
  );
}
