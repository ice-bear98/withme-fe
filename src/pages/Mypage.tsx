import React, { useState } from 'react';
import useUserStore from '../store/store';
import defaultImg from '../assets/default_profile.jpg';

export default function Mypage() {
  const { user, logout } = useUserStore();
  const [image, setImage] = useState(user?.profileImg || defaultImg);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const genderText = user?.gender === 'MALE' ? '남자' : '여자';
  const nickName = user?.nickName.slice(0, 8);
  const date = user?.signupDttm.slice(0, 10);

  return (
    <div className="p-4 max-w-4xl m-auto">
      <h1 className="text-center text-2xl font-bold mb-4">{nickName}님의 마이페이지</h1>

      <div className="flex justify-center items-start gap-4">
        <div className="w-72 h-96 flex flex-col justify-center items-center bg-brand_4 p-4 rounded-lg text-center">
          <div className="">
            <img src={image} alt="Profile" className="rounded-full object-cover h-64 w-72 mb-4" />
          </div>
          <label
            htmlFor="image-upload"
            className=" text-white hover:bg-brand_2 cursor-pointer bg-brand_3 p-2 rounded-lg"
          >
            프로필 이미지 변경
          </label>
          <input id="image-upload" type="file" onChange={handleImageChange} className="hidden" />
        </div>
        <div className="relative font-['LINESeedKR-Bd'] w-72 h-96 flex flex-col justify-between p-4 bg-gray-100 rounded-lg">
          <p className="rounded-md  border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans">
            닉네임: {nickName}
          </p>
          <p className="rounded-md  border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans">
            이메일: {user?.email}
          </p>
          <p className="rounded-md border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans">
            생년월일: {user?.birthDate}
          </p>
          <p className="rounded-md  border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans">
            성별: {genderText}
          </p>
          <p className="rounded-md  border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans">
            Phone Number: {user?.phoneNumber || 'Not provided'}
          </p>
          <p className="rounded-md  border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans">
            멤버 등급: {user?.membership}
          </p>
          <p className="rounded-md  border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans">
            가입 경로: {user?.signupPath}
          </p>
          <p className="rounded-md  border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans">
            가입 일: {date}
          </p>
          <div className="absolute top-96 right-0  flex  justify-center items-start space-x-3">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">회원정보 수정</button>
            <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
              로그아웃
            </button>
          </div>
        </div>
      </div>

      <div className="text-center my-12 py-4 bg-brand_4">내가 구독한 유저의 모임 목록</div>
      <div className="flex space-x-3 overflow-x-auto">
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
      </div>
      <div className="text-center my-8 py-4 bg-brand_4">내가 신청한 모임 목록</div>
      <div className="flex space-x-3 overflow-x-auto">
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
      </div>
      <div className="text-center my-8 py-4 bg-brand_4">내가 관심 등록한 모임 목록</div>
      <div className="flex space-x-3 overflow-x-auto">
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
      </div>
      <div className="text-center my-8 py-4 bg-brand_4">내가 참여중인 채팅방 목록</div>
      <div className="flex space-x-3 custom-scrollbar overflow-x-auto">
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
      </div>
    </div>
  );
}
