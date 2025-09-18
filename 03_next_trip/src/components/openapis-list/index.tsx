import Image from 'next/image';
import { ICat } from './types';

export default function OpenApisList({ data }: { data: ICat[] }) {
  return (
    <ul className='flex w-full flex-col gap-2'>
      {data.map((cat) => (
        <OpenApisItem cat={cat} key={cat.id} />
      ))}
    </ul>
  );
}

const OpenApisItem = ({ cat }: { cat: ICat }) => {
  return (
    <li key={cat.id} className='relative h-48 w-full object-cover px-2 py-4'>
      <Image src={cat.url} alt={cat.id} fill sizes='100vw' />
    </li>
  );
};
