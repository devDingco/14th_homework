"use client";

export default function Home() {
  const onClickRequest = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const data = await response.json();
    console.log(data);
  };
  return (
    <>
      <button onClick={onClickRequest}>rest-api요청하기</button>
    </>
     
  );
}
