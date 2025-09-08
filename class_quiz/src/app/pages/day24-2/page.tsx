export default function Home() {


const classmates = [
  { name: "철수", age: 10, school: "토끼초등학교" },
  { name: "영희", age: 13, school: "다람쥐초등학교" },
  { name: "훈이", age: 11, school: "토끼초등학교" }
];

const candymate = classmates
  .filter(el => el.school === "토끼초등학교")
  .map(el => ({ ...el, candy: 10 }));



const squirrelStudents = classmates
  .filter(el => el.school === "다람쥐초등학교")
  .map(el => ({ ...el, name: el.name + "어린이" }));


return(
 <div>
  {candymate.map(el => (
    <div>
      {el.name} ({el.age}세) - {el.school}, 사탕 {el.candy}개
    </div>
  ))}
  {squirrelStudents.map(el => {
    return <div>{el.name}</div>
  
  })}
</div>
)
}