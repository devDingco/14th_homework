'use client';

import OpenApisList from '@/components/openapis-list';
import { useFetchCats } from '@/components/openapis-list/hook';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function OpenApisPage() {
  const { cats, hasMore, loadMore } = useFetchCats();

  return (
    <section className='flex w-full flex-col items-center'>
      <InfiniteScroll
        dataLength={cats.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>로딩 중...</h4>}
        className='flex w-96 flex-col items-center'
      >
        <OpenApisList data={cats} />
      </InfiniteScroll>
    </section>
  );
}
