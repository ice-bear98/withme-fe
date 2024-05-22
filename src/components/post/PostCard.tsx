import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaMapMarkerAlt, FaHeart, FaCalendarDay } from 'react-icons/fa';
import { IoPeopleSharp } from 'react-icons/io5';
import { IoIosTime } from 'react-icons/io';

import useFormat from '../../Hooks/useFormat';
import defaultImg from '../../assets/default_profile.jpg';
import noImg from '../../assets/default_img.jpg';
import useLike from '../../Hooks/useLikes';
import useUserStore from '../../store/userStore';

interface PostCardProps {
  data: {
    title: string;
    gatheringType: string;
    likeCount: number;
    recruitmentStartDt: string;
    recruitmentEndDt: string;
    createdDttm: string;
    time: string;
    category: string;
    maximumParticipant: number;
    address: string;
    gatheringId: string;
    profileImg: string | null;
    nickName: string;
    fee: number;
    participantSelectionMethod: string;
    participantsType: string;
    mainImg: string;
    day: string;
  };
}

const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const {
    title,
    gatheringType,
    likeCount: initialLikeCount,
    recruitmentStartDt,
    recruitmentEndDt,
    createdDttm,
    time,
    category,
    maximumParticipant,
    address,
    gatheringId,
    profileImg,
    nickName,
    fee,
    participantSelectionMethod,
    participantsType,
    mainImg,
    day,
  } = data;

  const [isKind, setIsKind] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const navigate = useNavigate();
  const { isLoggedIn } = useUserStore();
  const { formatDate, formatTime } = useFormat();
  const { checkLike, changeLike } = useLike();

  useEffect(() => {
    setIsKind(gatheringType === 'MEETING' ? '모임' : '이벤트');
  }, [gatheringType]);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchLikeStatus = async () => {
        const liked = await checkLike(gatheringId);
        setIsLiked(liked);
      };

      fetchLikeStatus();
    }
  }, [gatheringId, isLoggedIn, checkLike]);

  const handleLikeClick = async () => {
    if (isLoggedIn) {
      const newLikeStatus = await changeLike(gatheringId);
      if (newLikeStatus !== null) {
        setIsLiked(newLikeStatus);
        setLikeCount((prevCount) => (newLikeStatus ? prevCount + 1 : prevCount - 1));
      }
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const isPay = (pay: number) => (pay > 0 ? '비용있음' : '무료참여');

  const isAge = (type: string) => {
    if (type === 'ADULT') return '성인';
    if (type === 'MINOR') return '미성년';
    return '나이제한 없음';
  };

  const isMethod = (method: string) => (method === 'FIRST_COME' ? '선착순 참여' : '신청선별 참여');

  const TruncatedTitle = ({ title, length }: { title: string; length: number }) => {
    const truncatedTitle = title.length > length ? `${title.slice(0, length)}···` : title;
    return <h2 className="rounded-3xl mb-1 text-xl font-['LINESeedKR-Bd'] dark:text-gray-100">{truncatedTitle}</h2>;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex-col gap-4 w-[540px] bg-white pt-4 rounded-2xl border shadow-lg overflow-hidden dark:bg-slate-700 dark:border-none md:w-full md:p-2">
      <h3 className="flex items-center my-3 px-3 text-lg justify-between">
        <span className="flex items-center ml-3 dark:text-gray-100">
          <img
            className="w-12 h-12 rounded-full object-cover mr-2 cursor-pointer"
            src={profileImg || defaultImg}
            alt="userProfile_Img"
          />
          {nickName}
        </span>
        <span className="text-gray-300 text-sm">{formatDate(createdDttm)} 작성</span>
      </h3>
      <div className="flex justify-around px-3 mb-2">
        <span className="flex items-center text-gray-400">
          <p className="bg-brand_1 px-2 mr-2 rounded-lg text-white dark:text-black">{category}</p>
          <p
            className={`bg-brand_2 px-2 mr-2 rounded-lg text-white dark:text-black ${isKind === '모임' ? 'bg-orange-300' : 'bg-brand_2'}`}
          >
            {isKind}
          </p>
          <FaHeart
            onClick={handleLikeClick}
            className={`mr-2 cursor-pointer ${isLiked ? 'text-red-400' : 'text-gray-400'}`}
          />
          {likeCount}
        </span>
        <TruncatedTitle title={title} length={14} />
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <img className="w-48 h-48 mx-3 object-cover rounded-2xl" src={mainImg || noImg} alt="" />
        <div className="ml-2">
          <div className="text-sm mt-5 s:text-xs">
            <span className="bg-green-300 py-1 px-2 rounded-lg mr-2">{isAge(participantsType)}</span>
            <span className="bg-yellow-300 py-1 px-2 rounded-lg mr-2">{isPay(fee)}</span>
            <span className="bg-blue-200 py-1 px-2 rounded-lg mr-2">{isMethod(participantSelectionMethod)}</span>
          </div>
          <div className="mt-3 font-['TAEBAEKmilkyway']">
            <p className="flex items-center bg-white mt-2 p-1 rounded-lg dark:bg-inherit dark:text-gray-100">
              <FaMapMarkerAlt className="mr-2" /> {address}
            </p>
            <p className="flex items-center bg-white p-1 rounded-lg dark:bg-inherit dark:text-gray-100">
              <FaCalendarDay className="mr-2" />
              일시 - {formatDate(day)}
            </p>
            <p className="flex items-center bg-white p-1 rounded-l dark:bg-inherit dark:text-gray-100">
              <IoIosTime className="mr-2" />
              시간 - {formatTime(time)}
            </p>
            <p className="flex items-center bg-white p-1 rounded-lg dark:bg-inherit dark:text-gray-100">
              <IoPeopleSharp className="mr-2" />
              인원 - {maximumParticipant} 명
            </p>
          </div>
        </div>
      </div>
      <p
        onClick={() => {
          navigate(`/postdetail/${gatheringId}`), scrollToTop();
        }}
        className="bg-brand_2 text-base mt-5 text-center p-2 text-white hover:bg-brand_1 md:rounded-2xl md:mb-3 dark:bg-slate-600 cursor-pointer"
      >
        상세보기
      </p>
      <p className="bg-slate-100 text-center p-2 font-['TAEBAEKmilkyway'] md:rounded-2xl dark:bg-gray-700 dark:text-gray-100">
        참여 기간 : {formatDate(recruitmentStartDt)} ~ {formatDate(recruitmentEndDt)}
      </p>
    </div>
  );
};

export default PostCard;
