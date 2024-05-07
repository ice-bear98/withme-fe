import React from 'react';
import { PiGenderMaleBold } from 'react-icons/pi';
import PostCard from '../components/PostCard';

export default function UserPage() {
  const infoListStyle = 'flex items-center justify-center bg-white text-center rounded-xl text-xl py-1 px-5';

  return (
    <div className="w-full mt-5 shadow-2xl p-3 mb-10">
      <div className="flex w-full justify-center items-center py-5 px-10 space-x-5 bg-gray-200 rounded-2xl">
        <img
          src="https://cdn.pixabay.com/photo/2019/11/05/16/03/man-4603859_1280.jpg"
          className="w-60 h-60 object-cover rounded-full"
        />
        <div className="flex-col justify-center">
          <ul className="space-y-3">
            <li className={`${infoListStyle}`}>
              이름 : 홍길동 <PiGenderMaleBold className="ml-2 bg-blue-400 text-white rounded-full p-1 text-2xl" />
            </li>
            <li className={`${infoListStyle}`}>멤버쉽 : 일반 유저</li>
            <li className={`${infoListStyle}`}>가입일자 : 2024.05.04</li>
            <li className={`${infoListStyle}`}>생년월일 : 1999.09.19 </li>
            <li className={`${infoListStyle} space-x-3`}>
              <span>총 모임 : 3</span>
              <span>총 이벤트 : 3</span>
            </li>

            <li className="space-x-3 text-center text-xl pt-2">
              <span className="bg-brand_1 py-2 px-4 text-white rounded-3xl cursor-pointer">팔로워 100</span>
              <span className="bg-brand_2 py-2 px-4 text-white rounded-3xl cursor-pointer">팔로우 100</span>
              <span className="bg-gray-500 py-2 px-4 text-white rounded-3xl cursor-pointer hover:bg-gray-800">
                팔로우하기
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* 추후에 추가할지 모르는 부분 (접어놈) */}
      <div>
        {/* <div className="p-3 text-center mt-3">
          <p>
            안녕하세요 정기적으로 요리모임을 열고있는 홍길동이라고 합니다. 현재 4회차까지 진행중이니 구경하시고
            관심있으면 편하게 참여하세요.
          </p>
          <ul className="bg-brand_4 mt-5 rounded-2xl text-center space-y-2 p-2">
            <li className="bg-white rounded-xl flex justify-center p-2">
              <span className="flex items-center mr-1">
                <div className="w-5 h-5 bg-brand_1 rounded-full mr-1"></div>유저 1 :
              </span>
              <span>여자회원한테 ㅈㄴ 추근덕거림 짜증남 ㅎㅎ 다신 안감;</span>
              <span className="ml-2 text-gray-400">2024.05.07 14:22 작성</span>
            </li>
            <li className="bg-white rounded-xl flex justify-center p-2">
              <span className="flex items-center mr-1">
                <div className="w-5 h-5 bg-brand_1 rounded-full mr-1"></div>유저 2 :
              </span>
              <span>이분 댓글알바 구했나요? ㅋㅋ</span>
              <span className="ml-2 text-gray-400">2024.05.05 09:10 작성</span>
            </li>
            <li className="bg-white rounded-xl flex justify-center p-2">
              <span className="flex items-center mr-1">
                <div className="w-5 h-5 bg-brand_1 rounded-full mr-1"></div>유저 3 :
              </span>
              <span>시발롬아</span>
              <span className="ml-2 text-gray-400">2024.05.01 17:37 작성</span>
            </li>
            <li className="bg-white rounded-xl flex justify-center p-2">
              <span className="flex items-center mr-1">
                <div className="w-5 h-5 bg-brand_1 rounded-full mr-1"></div>유저 4 :
              </span>
              <span>홍길동 요리 모임 너무 만족스럽고 알찹니다.</span>
              <span className="ml-2 text-gray-400">2024.04.27 18:02 작성</span>
            </li>
            <li className="bg-white rounded-xl flex justify-center p-2">
              <span className="flex items-center mr-1">
                <div className="w-5 h-5 bg-brand_1 rounded-full mr-1"></div>유저 5 :
              </span>
              <span>홍길동님 너무 친절하세요.</span>
              <span className="ml-2 text-gray-400">2024.04.17 15:30 작성</span>
            </li>
            <li>
              <input type="text" className="w-full p-3 text-center" placeholder="댓글을 입력하세요." />
            </li>
            <li>[1] [2] [3] [4]</li>
          </ul>
        </div> */}
        <h3 className="mt-7 rounded-2xl text-center bg-brand_1 p-3 text-white text-xl">진행중인 이벤트 및 모임 (3)</h3>
        <div className="flex justify-center mb-7">
          <div className="mt-7 grid gap-7 grid-cols-2 md:grid-cols-1">
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mt-7 rounded-2xl text-center bg-brand_2 text-white p-3 text-xl">
          진행한 이벤트 및 모임 기록 (3)
        </h3>
        <div className="flex justify-center mb-7">
          <div className="mt-7 grid gap-7 grid-cols-2 md:grid-cols-1">
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </div>
    </div>
  );
}
