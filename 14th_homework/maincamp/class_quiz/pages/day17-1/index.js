const App = () => {
  let [state, setState] = React.useState('안녕하세요');

  const change = () => {
    setState('반갑습니다');
  };

  return (
    <>
      <button onClick={change}>{state}</button>
    </>
  );
};
