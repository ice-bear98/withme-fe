import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { IoPersonCircle } from 'react-icons/io5';
import { FaUserFriends, FaSketch, FaMagic, FaCalendarAlt } from 'react-icons/fa';

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

  const navBtnStyle = 'flex items-center bg-brand_4 py-1 px-2 rounded-lg hover:brightness-110';

  return (
    <header className="flex-col bg-brand_1">
      <ScrollTopBtn />
      <div className="flex justify-between py-5 px-52 ml:px-10">
        <Link to={'/'} className="flex items-center">
          <h1 className="pt-1 text-brand_1 bg-white px-5 py-1 rounded-xl  text-2xl font-['KCC-Hanbit'] hover:text-white hover:bg-brand_1">
            With Me
          </h1>
          <p className="ml-3 font-['KCC-Hanbit'] text-white md:hidden">
            모임 및 이벤트 주최 참여는 윗미 지금 이용해보세요 : )
          </p>
        </Link>
        <ul className="flex items-center space-x-6 text-slate-100 text-xl">
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
      <div>
        <div className="flex justify-center bg-brand_3 p-2">
          <ul className="flex max-w-1200 w-1200 justify-center font-sans text-slate-800 space-x-20 md:space-x-10 s:space-x-1">
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
        </div>
      </div>
    </header>
  );
}
