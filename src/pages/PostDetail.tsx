import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const [data, setData] = useState<any>(null);
  const [_, setStatus] = useState<string>('');
  const [location, setLocation] = useState<any>({ lat: '', lng: '' });
  const [ing, setIng] = useState<number>(0);
  const [inn, setInn] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<any>(false);
  const navigate = useNavigate();

  const userId = useUserStore((state) => state.user?.memberId);
  const URL = import.meta.env.VITE_SERVER_URL;

  const { id }: any = useParams();

  const { formatDate, formatTime } = useFormat();
  const { addParticipation, getCount, isCheck, cancelParticipation } = useParticipation();
  const { removePost, goEdit } = useWrite();
  const { changeLike, checkLike } = useLike();

  const fetchData = async () => {
    try {
      const gatheringResponse = await axios.get(`${URL}/api/gathering/${id}`);
      console.log('디테일 홛인 : ', gatheringResponse);
      setData(gatheringResponse.data);
      setStatus(gatheringResponse.data.status);
      setLocation({ lat: gatheringResponse.data.lat, lng: gatheringResponse.data.lng });

      const count = await getCount(id);
      setIng(count);

      const isInn = await isCheck(id);
      setInn(isInn);

      const like = await checkLike(id);
      setIsLike(like);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, inn]);

  if (!data) {
    return (
      <div className="mt-10 w-full">
        <Loader />
      </div>
    );
  }

  const handleRemove = async (id: number) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      await removePost(id);
      navigate('/post?range=all');
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

  const isMax = (count: number) => count === data.maximumParticipant;

  const handleLike = async (id: any) => {
    try {
      await changeLike(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInn = async (id: any) => {
    if (userId === undefined) {
      return;
    }
    try {
      const isInn = await isCheck(id);
      setInn(isInn);
    } catch (error) {
      console.error(error);
    }
    scrollToTop();
  };

  const handleCount = async (id: any) => {
    try {
      const count = await getCount(id);
      setIng(count);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (id: any) => {
    try {
      await cancelParticipation(id);
      setInn(false);
      fetchData();
      scrollToTop();
    } catch (error) {
      console.error(error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const A = data.recruitmentEndDt;
  const B = new Date().toDateString();

  const dateA = new Date(A);
  const dateB = new Date(B);

  const isPast = dateA < dateB;

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
      <div className="flex justify-between mt-5 h-[450px] ml:flex-col ml:h-auto">
        <img
          className="bg-slate-200 min-w-[830px] max-w-[850px] object-cover ml:min-w-full max-h-[450px]"
          src={data.mainImg?.length <= 0 ? noImg : data.mainImg}
          alt="썸네일 이미지"
        />
        <ul className="max-w-2/4 text-center space-y-3 my-auto ml:mt-3 ml:w-full ml:space-y-0 ml:text-start">
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl ml:bg-brand_4 ml:rounded-none ml:pl-10 ml:border-white">
            모집기간 : {data.recruitmentStartDt} ~ {data.recruitmentEndDt} 까지
          </li>
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl ml:bg-brand_4 ml:rounded-none ml:pl-10 ml:border-white">
            모집장소 : {data.address}
          </li>
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl ml:bg-brand_4 ml:rounded-none ml:pl-10 ml:border-white">
            모임날짜 : {formatDate(data.day)}
          </li>
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl ml:bg-brand_4 ml:rounded-none ml:pl-10 ml:border-white">
            모임시간 : {formatTime(data.time)}
          </li>
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl ml:bg-brand_4 ml:rounded-none ml:pl-10 ml:border-white">
            모집인원 : {data.maximumParticipant} 명
          </li>
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl ml:bg-brand_4 ml:rounded-none ml:pl-10 ml:border-white">
            참가비용 : {data.fee} 원
          </li>
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl ml:bg-brand_4 ml:rounded-none ml:pl-10 ml:border-white">
            신청방법 : {data.participantSelectionMethod === 'FIRST_COME' ? '선착순' : '신청선별'}
          </li>
          <li className="bg-white p-1 border-2 border-brand_1 rounded-xl ml:border-white ml:rounded-none ml:pl-10 ml:bg-brand_2">
            나이제한 : {getLimited(data.participantsType)}
          </li>
          <li
            className={`${isMax(ing) ? 'bg-red-300 border-slate-200 text-white' : 'bg-brand_3'} p-1 border-2 border-brand_1 rounded-xl ml:border-white ml:rounded-none ml:pl-10`}
          >
            {isMax(ing) ? '신청 인원 마감' : `신청 가능 ( ${ing} / ${data.maximumParticipant} )`}
          </li>
        </ul>
      </div>

      <div className="flex mt-5 justify-between ml:overflow-x-scroll ml:gap-4">
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
          {isPast ? (
            <span className="bg-red-300 w-full text-center p-3 mt-5 rounded-2xl text-white">모집기간이 지났습니다</span>
          ) : inn ? (
            <button
              disabled={userId === undefined}
              onClick={() => handleCancel(id)}
              className={`${userId === undefined ? 'bg-red-300' : 'bg-brand_1'} mt-5 w-full p-2 rounded-2xl text-xl text-white hover:bg-red-300`}
            >
              {userId !== undefined ? (
                <div>
                  이미 참여중인 모임입니다
                  <p className="text-base">취소하려면 클릭하세요</p>
                </div>
              ) : (
                <p>로그인 후 신청가능합니다</p>
              )}
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
                addParticipation(id, data.memberId, data.participantsType);
                handleInn(id);
                handleCount(id);
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
