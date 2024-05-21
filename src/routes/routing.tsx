import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound.tsx';
import Home from '../pages/Home.tsx';
import Login from '../pages/Login.tsx';
import Join from '../pages/Join.tsx';
import SocialJoin from '../pages/SocialJoin.tsx';
import Mypage from '../pages/Mypage.tsx';
import PostDetail from '../pages/PostDetail.tsx';
import Chat from '../pages/Chat.tsx';
import Payment from '../pages/Payment.tsx';
import UserPage from '../pages/UserPage.tsx';
import MyManage from '../pages/MyManage.tsx';
import MyFollow from '../pages/MyFollow.tsx';
import Write from '../pages/Write.tsx';
import Post from '../pages/Post.tsx';
import App from '../App.tsx';
import ProtectedRoute from './protectedRoute.tsx';
import ParsingToken from '../pages/ParsingToken.tsx';
import RequiredInfo from '../pages/RequiredInfo.tsx';

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
      { path: '/post', element: <Post /> },
      { path: '/postdetail/:id', element: <PostDetail /> },
      { path: '/auth/success', element: <ParsingToken /> },
      { path: '/auth/requiredinfo', element: <RequiredInfo /> },
      { path: '/userpage', element: <UserPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/mypage/:id', element: <Mypage /> },
          { path: '/payment', element: <Payment /> },
          { path: '/chat/:id', element: <Chat /> },
          { path: '/mymanage/:id', element: <MyManage /> },
          { path: '/myfollow/:id', element: <MyFollow /> },
          { path: '/write', element: <Write /> },
          { path: '/write/:id', element: <Write /> },
        ],
      },
    ],
  },
]);

export default router;
