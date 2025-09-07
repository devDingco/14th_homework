"use client"

import styles from './styles.module.css'
import { gql, useMutation, useQuery } from "@apollo/client";
// import { on } from 'events';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const FETCH_PRODUCTS = gql`
  query{
  fetchProducts(
    page:1
  ){
    seller
    name
    detail
    price
    createdAt
    _id
  }
}
`;
const DELETE_PRODUCT = gql`
  mutation deleteProduct($productId: ID){
  deleteProduct(productId:$productId){
    _id
    message
  }
  }

`;

export default function productsPage() {

   const { data, refetch } = useQuery(FETCH_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const [checkedList, setCheckedList] = useState([]);

  const onChangeCheck = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedList((prev) => [...prev, value]);
    } else {
      setCheckedList((prev) => prev.filter((id) => id !== value));
    }
  };

  const onClickDelete = async (event) => {
    const productId = event.currentTarget.id;

    if (!checkedList.includes(productId)) {
      alert("삭제하려면 먼저 체크박스를 선택해주세요.");
      return;
    }

    try {
      await deleteProduct({
        variables: { productId },
      });
      alert("삭제가 완료되었습니다.");
      setCheckedList((prev) => prev.filter((id) => id !== productId));
      refetch();
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };
  return (

                <div className={styles.board}>
                    <div className={styles.board__main}>
                        <div className={styles.board__main__articlebox}>
                            {data?.fetchProducts.map((el, index) => (
                                <div key={el._id} className={styles.board__main__articlebox__item} >
                                     <input
                type="checkbox"
                value={el._id}
                checked={checkedList.includes(el._id)}
                onChange={onChangeCheck}
              />
                                    <div className={styles.board__main__articlebox__item__number}>{index + 1}</div>
                                    <div className={styles.board__main__articlebox__item__title}>{el.name}</div>
                                    <div className={styles.board__main__articlebox__item__writer}>{el.seller}</div>
                                    <div className={styles.board__main__articlebox__item__date}>{new Date(el.createdAt).toISOString().split("T")[0]}</div>
                                    <button className={styles.board__main__articlebox__item__delete} id={el._id} onClick={onClickDelete}>
                                                        삭제
                                                        </button>
                                                        
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
  )
}