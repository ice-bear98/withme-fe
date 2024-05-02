import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Join from './pages/Join.tsx';
import SocialJoin from './pages/SocialJoin.tsx';
import Mypage from './pages/Mypage.tsx';
import Event from './pages/Event.tsx';
import PostDetail from './pages/PostDetail.tsx';
import Chat from './pages/Chat.tsx';
import Payment from './pages/Payment.tsx';
import UserPage from './pages/UserPage.tsx';
import MyManage from './pages/MyManage.tsx';
import MyFollow from './pages/MyFollow.tsx';
import Write from './pages/Write.tsx';
import Meeting from './pages/Meeting.tsx';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') return;

  const { worker } = await import('./mocks/browser');
  return worker.start();
}
// const KAKAO_KEY: string | undefined = import.meta.env.VITE_REACT_APP_KAKAO_API;

declare global {
  interface Window {
    kakao: any;
    daum: any;
  }
}

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/join', element: <Join /> },
      { path: '/socialJoin', element: <SocialJoin /> },
      { path: '/mypage/:id', element: <Mypage /> },
      { path: '/event', element: <Event /> },
      { path: '/meeting', element: <Meeting /> },
      { path: '/postdetail/:id', element: <PostDetail /> },
      { path: '/chat/:id', element: <Chat /> },
      { path: '/payment', element: <Payment /> },
      { path: '/userpage/:id', element: <UserPage /> },
      { path: '/mymanage/:id', element: <MyManage /> },
      { path: '/myfollow/:id', element: <MyFollow /> },
      { path: '/write', element: <Write /> },
    ],
  },
]);

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
    // </React.StrictMode>,
  );
});
