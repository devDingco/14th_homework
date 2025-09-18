import HotBoardList from '@/components/HotBoard/HotBoardList';
import BoardList from '@/components/Board/BoardList';
import BoardFilter from '@/components/BoardFilter/BoardFilter';

export default function HomePage() {
  return (
    <div className='flex w-full flex-col'>
      <HotBoardList />
      <BoardFilter />
      <BoardList />
    </div>
  );
}
