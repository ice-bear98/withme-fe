import { Link, useNavigate } from 'react-router-dom';

import { HiOutlineBellAlert } from 'react-icons/hi2';
import { IoPersonCircle } from 'react-icons/io5';
import { FaUserFriends, FaSketch, FaMagic, FaCalendarAlt } from 'react-icons/fa';
import { AiFillAppstore } from 'react-icons/ai';

import useUserStore from '../../store/store';
import ScrollTopBtn from './ScrollUpBtn';
import ThemeButton from './ThemeBtn';

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
    'flex items-center py-1 px-2 rounded-lg hover:bg-brand_4 cursor-pointer dark:text-white dark:hover:bg-slate-600';

  return (
    <header className="flex-col w-full h-[90px] bg-white shadow-md dark:bg-brand_1 fixed top-0 z-50 xs:h-[130px]">
      <ScrollTopBtn />
      <div className="flex justify-center items-center py-5 space-x-14 ml:justify-evenly ml:space-x-0 s:py-2 s:justify-between xs:flex-col">
        <Link to={'/'} className="flex items-center">
          <h1 className="pt-1 dark:text-white text-brand_1 pb-3 rounded-xl text-4xl font-['BagelFatOne-Regular'] ml:text-3xl s:text-xl">
            With Me
          </h1>
        </Link>
        <ul className="flex justify-center items-center font-sans text-slate-800 ml:text-sm s:absolute s:bottom-1">
          <Link to={'/post?type=all'}>
            <li className={`${navBtnStyle}`}>
              <AiFillAppstore />
              <span className="ml-1 sm:hidden">이벤트 모임 모아보기</span>
              <span className="ml-1 hidden sm:block">전체보기</span>
            </li>
          </Link>
          <Link to={'/post?type=event'}>
            <li className={`${navBtnStyle}`}>
              <FaSketch />
              <span className="ml-1">이벤트</span>
            </li>
          </Link>
          <Link to={'/post?type=meeting'}>
            <li className={`${navBtnStyle}`}>
              <FaUserFriends />
              <span className="ml-1">모임</span>
            </li>
          </Link>
          <Link to={'/write'}>
            <li className={`${navBtnStyle}`}>
              <FaMagic />
              <span className="ml-1 sm:hidden">이벤트 모임 만들기</span>
              <span className="ml-1 hidden sm:block">개최</span>
            </li>
          </Link>
          <Link to={`/mymanage/${user?.memberId}`}>
            <li className={`${navBtnStyle}`}>
              <FaCalendarAlt />
              <span className="ml-1 sm:hidden">이벤트 모임 관리</span>
              <span className="ml-1 hidden sm:block">관리</span>
            </li>
          </Link>
        </ul>

        <ul className="flex items-center space-x-4 ml:space-x-2 text-brand_1 text-lg px-0 py-1 shadow-sm rounded-2xl dark:text-white ml:text-base xs:py-0">
          {isLoggedIn ? (
            <li
              className={`${navbarStyle} px-3 rounded-full text-base bg-brand_1 text-white s:text-sm`}
              onClick={handleLogout}
            >
              로그아웃
            </li>
          ) : (
            <Link to={'/login'}>
              <li className={`${navbarStyle} px-3 rounded-full text-base bg-brand_1 text-white s:text-sm`}>로그인</li>
            </Link>
          )}

          <li className="text-xl pt-1.5">
            <ThemeButton />
          </li>
          <Link to={`/mypage/${user?.memberId}`}>
            <li className="text-2xl">
              <IoPersonCircle />
            </li>
          </Link>
          <li className="text-2xl cursor-pointer">
            <HiOutlineBellAlert />
          </li>
        </ul>
      </div>
    </header>
  );
}
