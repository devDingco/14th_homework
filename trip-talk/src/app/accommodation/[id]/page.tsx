import AccommodationDetail from '../AccommodationDetail';

interface PageProps {
  params: {
    id: string;
  };
}

export default function AccommodationDetailPage({ params }: PageProps) {
  return <AccommodationDetail id={params.id} />;
}

