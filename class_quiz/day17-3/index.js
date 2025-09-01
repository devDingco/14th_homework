const App = () => {
  const [state, setState] = React.useState('000000')

  const handleChange = () => {
    const code = String(Math.floor(Math.random() * 1000000)).padStart(6, '0')

    setState(code)
  }

  return (
    <div>
      <p>{state}</p>
      <button onClick={handleChange}>인증번호전송</button>
    </div>
  )
}
