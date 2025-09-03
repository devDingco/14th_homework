const App = () => {
  let [state, setState] = React.useState(0);

  const certify = () => {
    state = Math.floor(Math.random() * 1000000);
    sta = String(state).padStart(6, '0');
    setState(state);
  };

  return (
    <>
      {state}
      <br />
      <button onClick={certify}>인증번호전송</button>
    </>
  );
};
