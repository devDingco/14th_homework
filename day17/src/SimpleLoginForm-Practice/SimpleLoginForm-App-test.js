// src/App.js

import SimpleLoginForm from './SimpleLoginForm'; // 1. 방금 만든 컴포넌트 불러오기

function App() {
  return (
    <div>
      {/* 다른 내용이 있다면 그대로 두고, 아래 컴포넌트를 추가하세요 */}
      <SimpleLoginForm /> {/* 2. 컴포넌트를 태그처럼 사용하기 */}
    </div>
  );
}

export default App;