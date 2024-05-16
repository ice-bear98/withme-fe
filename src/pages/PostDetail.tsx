import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FaHeart } from 'react-icons/fa';

import defaultImg from '../assets/default_profile.jpg';
import useFormat from '../Hooks/useFormat';
import KakaoMap from '../components/post/KakaoMap';
import Loader from '../components/common/Loader';
import CommentBar from '../components/detail/CommentBar';
import useParticipation from '../Hooks/useParticipation';
import useUserStore from '../store/store';
import useWrite from '../Hooks/useWrite';

export default function PostDetail() {
  const [data, setData] = useState<any>();
  const [status, setStatus] = useState<string>('');
  const [location, setLocation] = useState<any>({ lat: '', lng: '' });

  const userId = useUserStore((state) => state.user?.memberId);
  const URL = import.meta.env.VITE_SERVER_URL;

  const { id }: any = useParams();

  const { formatDate, formatTime } = useFormat();
  const { addParticipation } = useParticipation();
  const { RemovePost, goEdit } = useWrite();

  const getData = async () => {
    try {
      const gatheringResponse = await axios.get(`${URL}/api/gathering/${id}`);
      setData(gatheringResponse.data);
      setStatus(gatheringResponse.data.status);
      setLocation({ lat: gatheringResponse.data.lat, lng: gatheringResponse.data.lng });

      console.log('게시글 정보:', gatheringResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (!data) {
    return (
      <div className="mt-10 w-full">
        <Loader />
      </div>
    );
  }

  const handleRemove = (id: number) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      RemovePost(id);
    } else {
      return;
    }
  };

  const getLimited = (participantsType: string) => {
    switch (participantsType) {
      case 'NO_RESTRICTIONS':
        return '상관없음';
      case 'ADULT':
        return '성인';
      case 'MINOR':
        return '미성년';
      default:
        return 'Unknown';
    }
  };

  const getStatus = (status: string) => {
    if (status === 'PROGRESS') {
      return '참여 가능';
    } else {
      return '모집 마감';
    }
  };

  return (
    <div className="mx-auto mt-5 mb-10">
      <h2 className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <img
            className="w-14 h-14 bg-brand_1 rounded-full"
            src={data.profileImg === null ? defaultImg : data.profileImg}
            alt="작성자 프로필 이미지"
          />
          <p className="ml-3 text2xl">{data.nickName}</p>
        </div>
        <div className="flex space-x-3 items-center">
          <p>{formatDate(data.createdDttm)} 등록</p>
          {data.memberId === userId && (
            <div className="space-x-3">
              <button
                onClick={() => goEdit(data.gatheringId)}
                className="bg-brand_4 py-1 px-3 border-2 hover:bg-brand_3"
              >
                수정
              </button>
              <button
                onClick={() => handleRemove(data.gatheringId)}
                className="bg-brand_4 py-1 px-3 border-2 hover:bg-red-200"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </h2>
      <h1 className="bg-brand_3 text-lg text-center flex justify-around py-3">
        <span className="flex items-center text-gray-500">
          <FaHeart className="mr-2" /> {data.likeCount}
        </span>
        <span className="text-xl">{data.title}</span>
        <span className="bg-white px-3 rounded-xl text-brand_1 text-xl font-sans">
          {data.gatheringType === 'MEETING' ? '모임' : '이벤트'}
        </span>
      </h1>
      <div className="flex mt-5 gap-5 h-[450px]">
        <img className="bg-slate-200 w-4/5 object-cover" src={data.mainImg} alt="썸네일 이미지" />
        <ul className="w-2/5 text-center space-y-3 py-5 px-3">
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl">
            모집기간 : {data.recruitmentStartDt} ~ {data.recruitmentEndDt} 까지
          </li>
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl">모집장소 : {data.address}</li>
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl">모임날짜 : {formatDate(data.day)}</li>
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl">모임시간 : {formatTime(data.time)}</li>
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl">모집인원 : {data.maximumParticipant} 명</li>
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl">참가비용 : {data.fee} 원</li>
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl">
            신청방법 : {data.participantSelectionMethod === 'FIRST_COME' ? '선착순' : '신청선별'}
          </li>
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl">
            나이제한 : {getLimited(data.participantsType)}
          </li>
          <li
            className={`${status === 'PROGRESS' ? 'bg-brand_3' : 'bg-red-300'} p-1 border-2 border-brand_1 rounded-xl`}
          >
            {getStatus(data.status)}
          </li>
        </ul>
      </div>
      <div className="flex gap-3 mt-5">
        <img className="bg-green-300 w-1/3 h-96" src="" alt="" />
        <img className="bg-green-300 w-1/3 h-96" src="" alt="" />
        <img className="bg-green-300 w-1/3 h-96" src="" alt="" />
      </div>
      <div className="mt-5">
        <p className="w-full border-2 p-4 whitespace-pre-wrap">{data.content}</p>
      </div>
      <div className="mt-5">
        <KakaoMap coords={location} />
        <p className="mt-5 text-center border-2 p-2">상세주소 : {data.detailedAddress}</p>
        <div className="flex">
          <button
            onClick={() => addParticipation(id)}
            className="mt-5 w-full bg-brand_2 p-2 rounded-2xl hover:bg-brand_1 text-xl text-white"
          >
            참여하기
          </button>
        </div>
      </div>
      <div className="mt-5 border border-brand_4 rounded-2xl shadow-lg py-2 px-4">
        <CommentBar />
      </div>
    </div>
  );
}
