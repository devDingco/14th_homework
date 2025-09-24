import HotBoardList from '@/components/HotBoard/HotBoardList';
import BoardList from '@/components/boards-list';

export default function TripTalkPage() {
  return (
    <div className='flex w-full flex-col'>
      <HotBoardList />
      <BoardList />
    </div>
  );
}
