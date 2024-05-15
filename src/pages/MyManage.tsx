import { useState } from 'react';
import { FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { MdManageAccounts } from 'react-icons/md';
import AppStatusModal from './modal/AppStatusModal';
import Modal from './modal/Modal';
export default function MyManage() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="p-4 max-w-4xl m-auto">
      <div className="h-10 leading-10 mb-5 text-xl font-['LINESeedKR-Bd'] flex items-center j">
        <MdManageAccounts className="mr-2 text-2xl" />
        내가 개최한 모임 목록
      </div>

      <div className=" max-w-3xl mt-5">
        <div className="flex-col gap-4 bg-white pt-4 rounded-2xl border shadow-lg overflow-hidden cursor-pointer  ">
          <p className="text-gray-300 text-sm text-center">2024.03.11 게시</p>
          <div className="flex justify-between px-3 mb-2">
            <span className="flex items-center text-gray-400">
              <p className="bg-red-400 px-2 mr-2 rounded-lg text-white">HOT</p>
              <p className="bg-brand_1 px-2 mr-2 rounded-lg text-white">요리</p>
              <FaHeart className="mr-2 cursor-pointer" /> 10
            </span>
            <div className="flex text-sm justify-end items-center space-x-2">
              <button className=" p-1 rounded-lg bg-brand_4 hover:bg-blue-300">수정하기</button>
              <button className=" p-1 rounded-lg bg-brand_4 hover:bg-red-300">삭제하기</button>
            </div>
          </div>

          <div className="flex w-auto h-64">
            <img
              className="mx-3 s:w-32  w-56 h-full object-cover rounded-2xl"
              src="https://cdn.pixabay.com/photo/2023/05/22/20/17/ai-generated-8011407_1280.jpg"
              alt=""
            />
            <div className="ml-2 s:text-xs w-full">
              <h2 className="py-2 rounded-3xl mb-4">안녕하세요 요리 모임을 하고있습니다.</h2>
              <div className="text-sm s:text-xs s:space-y-1 s:flex s:flex-col">
                <span className="bg-green-300 s:w-32 py-1 px-2 rounded-lg mr-2">나이제한 없음</span>
                <span className="bg-yellow-300 s:w-32 py-1 px-2 rounded-lg mr-2">무료참여</span>
                <span className="bg-orange-300 s:w-32 py-1 px-2 rounded-lg mr-2">선착순</span>
              </div>
              <p className="flex items-center bg-white mt-3 p-1 rounded-lg">
                <FaMapMarkerAlt className="mr-2" /> 용산구 - 5월 10일 (금) 오후 7시
              </p>
              <p className="bg-white p-1 rounded-lg">작성자 : 홍길동</p>
              <p className="bg-white p-1 rounded-lg">현재 모집중 ( 2 / 8 )</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="mt-2 bg-brand_2 border-t-2 border-bg_blue-300  w-full text-center p-2 text-white"
          >
            신청 현황 보기
          </button>
          <Modal title="모임 및 이벤트 신청 현황" isOpen={isOpen} onClose={() => setOpen(false)}>
            <AppStatusModal />
          </Modal>
        </div>
      </div>
    </div>
  );
}
