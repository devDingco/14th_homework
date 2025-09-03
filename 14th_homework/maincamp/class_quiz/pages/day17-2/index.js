const App = () => {
  let [state, setState] = React.useState(0);

  const increase = () => {
    setState(state + 1);
  };

  return (
    <>
      {state} <br />
      <button onClick={increase}>카운트증가</button>
    </>
  );
};
