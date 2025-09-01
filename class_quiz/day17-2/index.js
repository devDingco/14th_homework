const App = () => {
  const [state, setState] = React.useState(0)

  const handleChange = () => {
    setState((state) => state + 1)
  }

  return (
    <div>
      <p>{state}</p>
      <button onClick={handleChange}>카운트 증가</button>
    </div>
  )
}
