"use client"

export default function Home() {
  const onClickSync = async () => {
    const result = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    const data = await result.json();
    console.log(data.name)
  };

  return (
    <>
      <button onClick={onClickSync} style={{ cursor: "pointer" }}>REST-API 요청하기</button>
    </>
  );
}
