import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

type TPaginationProps = {
  startPage: number;
  page: number;
  setPage: (num: number) => void;
  maxPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
};

export default function Pagination({
  startPage,
  page,
  setPage,
  maxPage,
  onPrevPage,
  onNextPage,
}: TPaginationProps) {
  return (
    <div className='inline-flex h-4 items-center justify-center gap-2 self-stretch'>
      <div className='flex items-center justify-start gap-2'>
        <MdArrowBackIos
          className='text-Gray-Gray-800 h-6 w-6'
          onClick={onPrevPage}
        />
        <div className='flex items-center justify-start gap-4'>
          {new Array(5)
            .fill(1)
            .map((_, index) => startPage + index)
            .map((pageIndex) => (
              // {Array.from({ length: 5 }).map((_, index) => (
              // <Link key={page} href={`/?page=${page}`}>
              //   <div className='inline-flex h-6 w-6 flex-col items-center justify-center gap-2.5 rounded-lg bg-zinc-100 p-2.5'>
              //     <div className='text-Gray-Gray-600 w-6 justify-start text-center text-sm font-normal leading-tight'>
              //       {page}
              //     </div>
              //   </div>
              // </Link>
              <button key={pageIndex} onClick={() => setPage(pageIndex)}>
                {pageIndex <= maxPage ? (
                  <div
                    className={`${pageIndex === page && 'bg-zinc-100 font-semibold'} inline-flex h-6 w-6 flex-col items-center justify-center gap-2.5 rounded-lg p-2.5`}
                  >
                    <div className='text-Gray-Gray-600 w-6 justify-start text-center text-sm leading-tight'>
                      {pageIndex}
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </button>
            ))}
        </div>
        <MdArrowForwardIos
          className='text-Gray-Gray-800 h-6 w-6'
          onClick={onNextPage}
        />
      </div>
    </div>
  );
}
