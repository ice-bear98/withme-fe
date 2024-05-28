import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { SlCalender } from 'react-icons/sl';
import { IoIosTime } from 'react-icons/io';
import { IoPeopleSharp } from 'react-icons/io5';
import { BsChatQuoteFill } from 'react-icons/bs';

import AppStatusModal from '../../pages/modal/AppStatusModal';
import Modal from '../../pages/modal/Modal';
import useFormat from '../../Hooks/useFormat';
import useParticipation from '../../Hooks/useParticipation';
import useWrite from '../../Hooks/useWrite';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface GatheringCardProps {
  data: any;
  isDelete: (id: any) => void;
}

const GatheringCard: React.FC<GatheringCardProps> = ({ data, isDelete }) => {
  const [isOpen, setOpen] = useState(false);
  const { formatDate, formatTime } = useFormat();
  const [count, setCount] = useState<any>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_SERVER_URL;

  const { getCount } = useParticipation();
  const { goEdit } = useWrite();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCount(data.gatheringId);
      setCount(res);
    };

    fetchData();
  }, [data.gatheringId, getCount]);

  const isPay = (pay: number) => (pay > 0 ? '비용있음' : '무료참여');
  const isType = (type: string) => (type === 'MEETING' ? '모임' : '이벤트');

  const isAge = (type: string) => {
    if (type === 'ADULT') return '성인';
    if (type === 'MINOR') return '미성년';
    return '나이제한 없음';
  };

  const handleCreateChatroom = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      setLoading(true);
      const response = await axios.post(`${URL}/api/chatroom`, null, {
        headers: { Authorization: accessToken },
        params: { gatheringid: data.gatheringId },
      });
      console.log('Chatroom created:', response.data);
      navigate(`/chat/${data.gatheringid}`, { state: { gatheringData: data } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response ? error.response.data : error.message);
      } else {
        console.error('Unexpected error:', (error as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  const isMethod = (method: string) => (method === 'FIRST_COME' ? '선착순 참여' : '신청선별 참여');

  return (
    <div className="w-full mt-5">
      <div className="flex-col gap-4 bg-white pt-4 rounded-2xl border shadow-lg overflow-hidden dark:bg-gray-500 dark:border-none">
        <p className="text-gray-300 text-sm text-center">{formatDate(data.createdDttm)} 개최</p>
        <div className="flex justify-between px-3 mb-3">
          <span className="flex items-center text-gray-400">
            <p className="bg-brand_1 px-2 mr-2 rounded-lg text-white">{data.category}</p>
            <FaHeart className="mr-2 text-red-300" /> 좋아요 {data.likeCount}
          </span>
          <div className="flex text-sm justify-end items-center space-x-2">
            <button
              onClick={() => goEdit(data.gatheringId, data)}
              className=" py-1 px-2 rounded-lg bg-brand_4 hover:bg-blue-300"
            >
              수정하기
            </button>
            <button
              onClick={() => isDelete(data.gatheringId)}
              className=" py-1 px-2 rounded-lg bg-brand_4 hover:bg-red-300"
            >
              취소하기
            </button>
          </div>
        </div>

        <div className="flex w-auto h-64">
          <img className="mx-3 s:w-32  w-56 h-full object-cover rounded-2xl" src={data.mainImg} alt="포스트 썸네일" />
          <div className="mx-5 s:text-xs w-full ss:mx-0">
            <h2 className="py-2 rounded-xl mb-4 bg-brand_3 text-center">{data.title}</h2>
            <div className="text-sm s:text-xs s:space-y-1 s:flex">
              <span className="bg-blue-400 text-white py-1 px-2 rounded-lg mr-2">{isType(data.gatheringType)}</span>
              <span className="bg-green-300 py-1 px-2 rounded-lg mr-2">{isAge(data.participantsType)}</span>
              <span className="bg-yellow-300 py-1 px-2 rounded-lg mr-2">{isPay(data.fee)}</span>
              <span className="bg-orange-300 py-1 px-2 rounded-lg mr-2">
                {isMethod(data.participantSelectionMethod)}
              </span>
            </div>
            <p className="flex items-center bg-white mt-3 p-1 rounded-lg dark:bg-inherit dark:text-gray-200">
              <SlCalender className="mr-2" />
              모집기간 : {data.recruitmentStartDt} 부터 {data.recruitmentEndDt} 까지
            </p>
            <p className="flex items-center bg-white mt-1 p-1 rounded-lg dark:bg-inherit dark:text-gray-200">
              <IoIosTime className="mr-2" />
              일시 : {formatDate(data.day)} {formatTime(data.time)}
            </p>
            <p className="flex items-center bg-white mt-1 p-1 rounded-lg dark:bg-inherit dark:text-gray-200">
              <FaMapMarkerAlt className="mr-2" />
              위치 : {data.address}
            </p>

            <div className="flex justify-between">
              <p className="flex items-center bg-white mt-1 p-1 rounded-lg dark:bg-inherit dark:text-gray-200">
                <IoPeopleSharp className="mr-2" />
                참여현황 : ( {count} / {data.maximumParticipant} )
                {count == data.maximumParticipant && (
                  <span className="ml-2 bg-green-400 px-3 text-lg rounded-2xl text-white ss:text-sm">모집완료</span>
                )}
              </p>
              <button
                onClick={handleCreateChatroom}
                className={`flex items-center bg-brand_1 text-white px-2 py-1 rounded-lg ss:mr-3 hover:bg-slate-400 hover:text-white ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                <BsChatQuoteFill className="mr-1" />
                {loading ? '생성 중...' : '채팅방 개설하기'}
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="mt-2 bg-brand_2 border-t-2 border-bg_blue-300  w-full text-center p-2 text-white dark:border-none"
        >
          신청 현황 보기
        </button>
        <Modal title="모임 및 이벤트 신청 현황" isOpen={isOpen} onClose={() => setOpen(false)}>
          <AppStatusModal gatheringId={data.gatheringId} />
        </Modal>
      </div>
    </div>
  );
};

export default GatheringCard;
