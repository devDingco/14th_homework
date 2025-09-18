'use client';

import { DELETE_PRODUCT, FETCH_PRODUCTS } from '@/apis/graphql/product';
import { useMutation, useQuery } from '@apollo/client';

type TProduct = {
  _id: string;
  name: string;
  seller: string;
};

export default function Page() {
  // Quiz1
  const { data, error, loading } = useQuery(FETCH_PRODUCTS);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data);
  // Quiz2
  const classmates = [
    { name: '철수', age: 10, school: '토끼초등학교' },
    { name: '영희', age: 13, school: '다람쥐초등학교' },
    { name: '훈이', age: 11, school: '토끼초등학교' },
  ];

  const newClassMates = classmates
    .map((classmate) =>
      classmate.school === '토끼초등학교'
        ? { ...classmate, candy: 10 }
        : classmate,
    )
    .map((classmate) =>
      classmate.school === '다람쥐초등학교'
        ? { ...classmate, name: `${classmate.name}어린이` }
        : classmate,
    );

  console.log(newClassMates);

  // Quiz3
  const FRUITS = [
    { number: 1, title: '레드향' },
    { number: 2, title: '샤인머스켓' },
    { number: 3, title: '산청딸기' },
    { number: 4, title: '한라봉' },
    { number: 5, title: '사과' },
    { number: 6, title: '애플망고' },
    { number: 7, title: '딸기' },
    { number: 8, title: '천혜향' },
    { number: 9, title: '과일선물세트' },
    { number: 10, title: '귤' },
  ];

  const filteredFRUITS = FRUITS.filter((x) => x.number % 2 === 0);
  console.log(filteredFRUITS);

  return (
    <>
      <h2>Quiz - 1</h2>
      {data?.fetchProducts.map((product: TProduct) => (
        <DisplayProduct key={product._id} {...product} />
      ))}

      <h2>Quiz - 3</h2>

      {FRUITS.map((fruit) => (
        <DisplayFruit key={fruit.title} {...fruit} />
      ))}
    </>
  );
}

const DisplayProduct = ({ _id, name, seller }: TProduct) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const handleDeleteProduct = async () => {
    await deleteProduct({
      variables: {
        productId: _id,
      },
      refetchQueries: [{ query: FETCH_PRODUCTS }],
    });
  };

  return (
    <div className='w-full'>
      <span className='flex w-full flex-row gap-1'>
        <input type='checkbox' />
        <span>{name}</span>
        <span>{seller}</span>
        <button onClick={handleDeleteProduct}>삭제</button>
      </span>
    </div>
  );
};

const DisplayFruit = ({ number, title }: { number: number; title: string }) => {
  return (
    <div className='flex gap-1 border px-4'>
      <span>#{number}</span>
      <span>&nbsp;-&nbsp;</span>
      <span>{title}</span>
    </div>
  );
};
