'use client';

import AccommodationBest from '@/components/accommodation-list/accommodation-best';
import AccommodationBanner from '@/components/accommodation-list/banner';
import AccommodationSearch from '@/components/accommodation-list/search';
import AccommodationList from '@/components/accommodation-list/list';
import PageLayout from '@/commons/components/page-layout';

export default function AccommodationPage() {
  return (
    <PageLayout>
      <AccommodationBest />
      <AccommodationBanner />
      <AccommodationSearch />
      <AccommodationList />
    </PageLayout>
  );
}
