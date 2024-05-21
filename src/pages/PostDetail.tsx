import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { CiCircleInfo } from 'react-icons/ci';

import defaultImg from '../assets/default_profile.jpg';
import useFormat from '../Hooks/useFormat';
import KakaoMap from '../components/post/KakaoMap';
import Loader from '../components/common/Loader';
import CommentBar from '../components/detail/CommentBar';
import useParticipation from '../Hooks/useParticipation';
import useUserStore from '../store/userStore';
import useWrite from '../Hooks/useWrite';

import noImg from '../assets/default_img.jpg';
import useLike from '../Hooks/useLikes';

export default function PostDetail() {
  const [data, setData] = useState<any>();
  const [status, setStatus] = useState<string>('');
  const [location, setLocation] = useState<any>({ lat: '', lng: '' });
  const [ing, setIng] = useState<number>(0);
  const [inn, setInn] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<any>(false);

  const userId = useUserStore((state) => state.user?.memberId);
  const URL = import.meta.env.VITE_SERVER_URL;

  const { id }: any = useParams();

  const { formatDate, formatTime } = useFormat();
  const { addParticipation, getCount, isCheck } = useParticipation();
  const { removePost, goEdit } = useWrite();
  const { changeLike, checkLike } = useLike();

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
    const fetchData = async () => {
      await getData();

      const count = await getCount(id);
      setIng(count);

      const isInn = await isCheck(id);
      setInn(isInn);

      const like = await checkLike(id);
      setIsLike(like);
    };

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    fetchData();
  }, [id, isLike, inn]);

  if (!data) {
    return (
      <div className="mt-10 w-full">
        <Loader />
      </div>
    );
  }

  const handleRemove = (id: number) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      removePost(id);
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

  const isMax = (count: number) => {
    if (count === data.maximumParticipant) {
      return true;
    } else {
      return false;
    }
  };

  const handleLike = async (id: any) => {
    setIsLike(!isLike);
    try {
      await changeLike(id);
      getData();
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  const handleInn = async (id: any) => {
    setInn(!inn);
    try {
      await isCheck(id);
      getData();
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  const handleCount = async (id: any) => {
    try {
      const count = await getCount(id);
      setIng(count);
      getData();
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  return (
    <div className="mx-auto mt-5 mb-10">
      <h2 className="flex items-center justify-between mb-5 dark:text-gray-100">
        <div className="flex items-center">
          <img
            className="w-14 h-14 bg-brand_1 rounded-full object-cover"
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
                onClick={() => goEdit(data.gatheringId, data)}
                className="bg-brand_4 py-1 px-3 border-2 hover:bg-brand_3 dark:text-black dark:bg-brand_2 dark:border-none dark:hover:bg-brand_1"
              >
                수정
              </button>
              <button
                onClick={() => handleRemove(data.gatheringId)}
                className="bg-brand_4 py-1 px-3 border-2 hover:bg-red-200 dark:text-black dark:bg-brand_2 dark:border-none dark:hover:bg-brand_1"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </h2>
      <h1 className="bg-brand_3 text-lg text-center flex justify-around py-3">
        <span className="flex items-center text-gray-500">
          <FaHeart
            onClick={() => handleLike(id)}
            className={`${isLike ? 'text-red-400' : 'text-gray-500'} mr-2 cursor-pointer`}
          />
          {data.likeCount}
        </span>
        <span className="text-xl">{data.title}</span>
        <span className="bg-white px-3 rounded-xl text-brand_1 text-xl font-sans dark:bg-gray-700">
          {data.gatheringType === 'MEETING' ? '모임' : '이벤트'}
        </span>
      </h1>
      <div className="flex mt-5 gap-5 h-[450px]">
        <img
          className="bg-slate-200 w-4/5 object-cover"
          src={data.mainImg.length <= 0 ? noImg : data.mainImg}
          alt="썸네일 이미지"
        />
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
            className={`${isMax(ing) ? 'bg-red-300 border-slate-200 text-white' : 'bg-brand_3'} p-1 border-2 border-brand_1 rounded-xl`}
          >
            {isMax(ing) ? '신청 인원 마감' : `신청 가능 ( ${ing} / ${data.maximumParticipant} )`}
          </li>
        </ul>
      </div>
      <div className="flex mt-5 justify-between">
        <img
          className="bg-green-300 w-[380px] h-96 object-cover"
          src={data.subImg1.length <= 0 ? noImg : data.subImg1}
          alt=""
        />
        <img
          className="bg-green-300 w-[380px] h-96 object-cover"
          src={data.subImg2.length <= 0 ? noImg : data.subImg2}
          alt=""
        />
        <img
          className="bg-green-300 w-[380px] h-96 object-cover"
          src={data.subImg3.length <= 0 ? noImg : data.subImg3}
          alt=""
        />
      </div>
      <div className="mt-5">
        <p className="w-full border-2 p-4 whitespace-pre-wrap dark:bg-brand_3">{data.content}</p>
      </div>
      <div className="mt-5">
        <KakaoMap coords={location} />
        <p className="mt-5 text-center border-2 p-2 dark:bg-brand_3">상세주소 : {data.detailedAddress}</p>
        <div className="flex">
          {inn ? (
            <button
              onClick={() => confirm('정말 참여를 취소하겠습니까?')}
              className="mt-5 w-full bg-brand_1 p-2 rounded-2xl text-xl text-white hover:bg-red-300"
            >
              이미 참여중인 모임입니다
              <p className="text-base">취소하려면 클릭하세요</p>
            </button>
          ) : isMax(ing) ? (
            <button
              onClick={() => alert('참여인원이 가득차서 신청할 수 없어요.')}
              className="mt-5 w-full bg-red-300 p-2 rounded-2xl text-xl text-white"
            >
              참여인원이 가득찼습니다
            </button>
          ) : (
            <button
              onClick={() => {
                addParticipation(id, data.memberId, data.participantsType), handleInn(id), handleCount(id);
              }}
              className="mt-5 w-full bg-brand_2 p-2 rounded-2xl hover:bg-brand_1 text-xl text-white"
            >
              참여 신청하기
            </button>
          )}
        </div>
        <p className="pt-5 text-center flex items-center justify-center text-brand_2">
          <CiCircleInfo className="mr-2" />
          모든 모임 빛 이벤트 마감시간은 오후 9시 입니다
        </p>
      </div>
      <div className="mt-5 border border-brand_4 rounded-2xl shadow-lg py-2 px-4 dark:bg-brand_3">
        <CommentBar />
      </div>
    </div>
  );
}
