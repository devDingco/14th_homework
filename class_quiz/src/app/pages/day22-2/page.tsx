"use client"

import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";


const CREATE_BOARD = gql`
    mutation createBoard(
      $writer: String
      $title: String
      $contents: String
    ) {
      createBoard(
        writer: $writer
        title: $title
        contents: $contents
      ) {
        _id
        number
        message
      }
    }
  `;

const CREATE_PRODUCT = gql`
    mutation createProduct(
      $seller: String
      $createProductInput: CreateProductInput!
    ) {
      createProduct(
        seller: $seller
        createProductInput: $createProductInput
      ) {
        _id
        number
        message
      }
    }
    
  `;


export default function Day22Page() {

  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickRequest = async () => {
    const result = await createBoard({
        variables: { writer, title, contents }
    });
    console.log(result);
  };
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const onclickRequestProduct = async () =>{
    const result = await createProduct({
        variables: { seller:`${seller}`,
            createProductInput: { name:`${name}`, detail:`${detail}`, price:Number(price) }
    }
    });
    console.log(result);
  }
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [seller, setSeller] = useState("");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
  };
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChangeContents = (event) => {
    setContents(event.target.value);
  };


  const onChangeSeller = (event) => {
    setSeller(event.target.value);
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeDetail = (event) => {
    setDetail(event.target.value);
  };
  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  console.log(writer);
  console.log(title);
  console.log(contents);

  return (
    <>
     작성자 : <input type="text" onChange={onChangeWriter} /><br />
     제목 : <input type="text" onChange={onChangeTitle} /><br />
     내용 : <input type="text" onChange={onChangeContents} /><br />
      <button onClick={onClickRequest}>graphql-api요청하기</button><br />

      판매자 : <input type="text" onChange={onChangeSeller} /><br />
      상품명 : <input type="text" onChange={onChangeName} /><br />
      상세설명 : <input type="text" onChange={onChangeDetail} /><br />
      가격 : <input type="text" onChange={onChangePrice} /><br />
      <button onClick={onclickRequestProduct}>graphql-api요청하기2</button>
    </>
  );
}
