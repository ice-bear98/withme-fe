import { Link, useNavigate } from "react-router-dom";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { IoPersonCircle } from "react-icons/io5";

import ThemeButton from "./ThemeBtn";

export default function Header() {
  const navigate = useNavigate();
  const navbarStyle = "cursor-pointer hover:text-white font-['LINESeedKR-Bd']";

  return (
    <header className="flex-col bg-brand_1">
      <div className="flex justify-between py-3 px-10">
        <Link to={"/"}>
          <h1 className="pt-1 text-2xl font-['YEONGJUSeonbiTTF']">With Me</h1>
        </Link>
        <ul className="flex items-center space-x-3">
          <Link to={"/login"}>
            <li className={navbarStyle}>로그인</li>
          </Link>
          <li className={navbarStyle}>로그아웃</li>
          <li className="text-xl pt-1">
            <ThemeButton />
          </li>
          <Link to={"/mypage:id"}>
            <li className="text-2xl">
              <IoPersonCircle />
            </li>
          </Link>
          <li className="text-2xl cursor-pointer">
            <HiOutlineBellAlert />
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex justify-around bg-brand_3 p-2">
          <li>이벤트</li>
          <li>모임</li>
          <li>주최하기</li>
          <li>모임관리</li>
        </ul>
      </div>
    </header>
  );
}
