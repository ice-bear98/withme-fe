import React from 'react';
import { FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

export default function PostCard() {
  return (
    <div className="flex-col gap-4 w-[520px] bg-white pt-4 rounded-2xl border shadow-lg overflow-hidden cursor-pointer md:w-full">
      <div className="flex justify-between px-3 mb-2">
        <span className="flex items-center text-gray-400">
          <p className="bg-red-400 px-2 mr-2 rounded-lg text-white">HOT</p>
          <p className="bg-brand_1 px-2 mr-2 rounded-lg text-white">요리</p>
          <FaHeart className="mr-2 cursor-pointer" /> 10
        </span>
        <span className="text-gray-300 text-sm">2024.03.11 게시</span>
      </div>
      <div className="flex justify-center gap-4">
        <img
          className="w-48 h-48 mx-3 object-cover rounded-2xl"
          src="https://cdn.pixabay.com/photo/2023/05/22/20/17/ai-generated-8011407_1280.jpg"
          alt=""
        />
        <div className="ml-2">
          <h2 className="py-2 rounded-3xl mb-4">안녕하세요 요리 모임을 하고있습니다.</h2>
          <div className="text-sm">
            <span className="bg-green-300 py-1 px-2 rounded-lg mr-2">나이제한 없음</span>
            <span className="bg-yellow-300 py-1 px-2 rounded-lg mr-2">무료참여</span>
            <span className="bg-orange-300 py-1 px-2 rounded-lg mr-2">선착순</span>
          </div>
          <p className="flex items-center bg-white mt-3 p-1 rounded-lg">
            <FaMapMarkerAlt className="mr-2" /> 용산구 - 5월 10일 (금) 오후 7시
          </p>
          <p className="bg-white p-1 rounded-lg">작성자 : 홍길동</p>
          <p className="bg-white p-1 rounded-lg">모집인원 : 10</p>
        </div>
      </div>
      <p className="bg-brand_2 mt-2 text-center p-2 text-white">· · · 현재 모집중 ( 2 / 8 ) · · ·</p>
    </div>
  );
}
