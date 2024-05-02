import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { IoPersonCircle } from 'react-icons/io5';
import { FaUserFriends, FaSketch, FaMagic, FaCalendarAlt } from 'react-icons/fa';

import ThemeButton from './ThemeBtn';

export default function Header() {
  const navigate = useNavigate();
  const navbarStyle = "cursor-pointer font-['LINESeedKR-Bd']";

  return (
    <header className="flex-col bg-brand_1">
      <div className="flex justify-between py-5 px-20">
        <Link to={'/'}>
          <h1 className="pt-1 text-white text-2xl font-['KCC-Hanbit']">With Me</h1>
        </Link>
        <ul className="flex items-center space-x-6 text-slate-100 text-xl">
          <Link to={'/login'}>
            <li className={navbarStyle}>로그인</li>
          </Link>
          <li className={navbarStyle}>로그아웃</li>
          <li className="text-2xl pt-1.5">
            <ThemeButton />
          </li>
          <Link to={'/mypage:id'}>
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
          <ul className="flex max-w-1200 w-1200 justify-evenly font-sans text-slate-800">
            <Link to={'/event'}>
              <li className="flex items-center">
                <FaSketch />
                <span className="ml-2">이벤트</span>
              </li>
            </Link>
            <Link to={'/meeting'}>
              <li className="flex items-center">
                <FaUserFriends />
                <span className="ml-2">모임</span>
              </li>
            </Link>
            <Link to={'/write'}>
              <li className="flex items-center">
                <FaMagic />
                <span className="ml-2">이벤트 모임 만들기</span>
              </li>
            </Link>
            <li className="flex items-center">
              <FaCalendarAlt />
              <span className="ml-2">이벤트 모임 관리</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
