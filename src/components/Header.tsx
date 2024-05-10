import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { IoPersonCircle } from 'react-icons/io5';
import { FaUserFriends, FaSketch, FaMagic, FaCalendarAlt } from 'react-icons/fa';

import ThemeButton from './ThemeBtn';
import useUserStore from '../store/store';
import ScrollTopBtn from './ScrollUpBtn';

export default function Header() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useUserStore();
  const navbarStyle = "cursor-pointer font-['LINESeedKR-Bd']";

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    logout();
    navigate('/');
  };

  const navBtnStyle =
    'flex items-center bg-white py-2 px-3 rounded-lg dark:bg-brand_1 dark:text-white hover:brightness-110 shadow-sm text-slate-700 hover:bg-brand_3 cursor-pointer';

  return (
    <header className="flex-col w-full bg-white shadow-md dark:bg-brand_1 fixed top-0 z-50">
      <ScrollTopBtn />
      <div className="flex justify-between items-center py-5 px-52 ml:px-10">
        <ul className="flex justify-center items-center font-sans space-x-4 text-slate-800 md:space-x-10 s:space-x-1">
          <Link to={'/'} className="flex items-center">
            <h1 className="pt-1 dark:text-white text-brand_1 px-5 pb-2 rounded-xl text-4xl font-['BagelFatOne-Regular']">
              With Me
            </h1>
          </Link>
          <Link to={'/event'}>
            <li className={`${navBtnStyle}`}>
              <FaSketch />
              <span className="ml-2">이벤트</span>
            </li>
          </Link>
          <Link to={'/meeting'}>
            <li className={`${navBtnStyle}`}>
              <FaUserFriends />
              <span className="ml-2">모임</span>
            </li>
          </Link>
          <Link to={'/write'}>
            <li className={`${navBtnStyle}`}>
              <FaMagic />
              <span className="ml-2">이벤트 모임 만들기</span>
            </li>
          </Link>
          <li className={`${navBtnStyle}`}>
            <FaCalendarAlt />
            <span className="ml-2">이벤트 모임 관리</span>
          </li>
        </ul>

        <ul className="flex items-center space-x-6 text-brand_1 text-xl px-10 py-1 shadow-sm rounded-2xl dark:text-white">
          {isLoggedIn ? (
            <li className={navbarStyle} onClick={handleLogout}>
              로그아웃
            </li>
          ) : (
            <Link to={'/login'}>
              <li className={navbarStyle}>로그인</li>
            </Link>
          )}

          <li className="text-2xl pt-1.5">
            <ThemeButton />
          </li>
          <Link to={`/mypage/${user?.member_id}`}>
            <li className="text-3xl">
              <IoPersonCircle />
            </li>
          </Link>
          <li className="text-3xl cursor-pointer">
            <HiOutlineBellAlert />
          </li>
        </ul>
      </div>
      <div></div>
    </header>
  );
}
