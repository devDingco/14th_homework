import { createBrowserRouter, RouterProvider } from 'react-router';
import BoardsNew from './routes/boards/new/BoardsNew.tsx';
import TestPage from './pages/TestPage.tsx';
import BoardsDetail from './routes/boards/new/BoardsDetail.tsx';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <TestPage />,
      // Component: BoardsNew,
    },
    {
      path: '/boards',
      // element: <TestPage />,
      children: [
        { path: 'new', element: <BoardsNew /> },
        { path: 'detail', element: <BoardsDetail /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
