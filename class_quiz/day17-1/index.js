const App = () => {
  // 1. let과 document.getElementById()를 사용
  // const handleChange = () => {
  //   let helloId = document.getElementById('hello')
  //   helloId.innerText = '반갑습니다'
  // }
  // return (
  //   <div>
  //     <button id="hello" onClick={handleChange}>
  //       안녕하세요
  //     </button>
  //   </div>
  // )
  // 2. state를 사용해주세요.

  const [state, setState] = React.useState('안녕하세요')
  const handleChange = () => {
    setState('반갑습니다')
  }
  return (
    <div>
      <button onClick={handleChange}>{state}</button>
    </div>
  )
}
