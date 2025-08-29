import React from '.pnpm/react@19.1.1/node_modules/react';
import ReactDOM from '.pnpm/react-dom@19.1.1_react@19.1.1/node_modules/react-dom/client';
import PrevstatePage from './PrevstatePage'; 

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <PrevstatePage />
)


// ReactDOM.render(
//   <React.StrictMode>
//     <PrevstatePage />
//   </React.StrictMode>,
//   document.getElementById('root')
// );