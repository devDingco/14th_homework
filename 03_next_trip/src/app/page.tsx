import HotBoardList from '@/components/HotBoard/HotBoardList';
import Carousel from '@/components/Carousel';
import BoardList from '@/components/Board/BoardList';
import BoardFilter from '@/components/BoardFilter/BoardFilter';

export default function HomePage() {
  return (
    <div className='flex flex-col'>
      <Carousel />
      <HotBoardList />
      <BoardFilter />
      <BoardList />
    </div>
  );
}
