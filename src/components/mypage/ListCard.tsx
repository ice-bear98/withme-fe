import useFormat from '../../Hooks/useFormat';
import { useNavigate } from 'react-router-dom';
import { FaUserFriends, FaSketch, FaHeart, FaCalendarAlt } from 'react-icons/fa';
import { IoIosTime } from 'react-icons/io';

export default function ListCard({ list, kind }: any) {
  const { formatDate, formatTime } = useFormat();
  const navigate = useNavigate();

  const isKind = (kind: string) => {
    if (kind === 'App') {
      return true;
    }
    if (kind === 'Like') {
      return false;
    }
  };

  const isType = (type: string) => {
    if (type === 'EVENT') return '이벤트';
    if (type === 'MEETING') return '미팅';
    return;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const gatheringStatus = (status: string) => {
    if (status === 'PROGRESS') {
      return '진행 중';
    } else {
      return '취소됨';
    }
  };

  const myStatusClass = (status: string): string => {
    switch (status) {
      case 'CREATED':
        return 'bg-yellow-300'; // 승인대기
      case 'APPROVED':
        return 'bg-green-300'; // 승인
      case 'REJECTED':
        return 'bg-red-300'; // 거절
      case 'CANCELED':
        return 'bg-gray-300'; // 취소
      default:
        return 'bg-black'; // 알수없는
    }
  };

  const myStatusText = (status: string): string => {
    switch (status) {
      case 'CREATED':
        return '승인대기';
      case 'APPROVED':
        return '승인';
      case 'REJECTED':
        return '거절';
      case 'CANCELED':
        return '취소';
      default:
        return 'Unknown status';
    }
  };

  return (
    <div
      onClick={() => {
        navigate(`/postdetail/${list.gatheringId}`), scrollToTop();
      }}
      className="max-w-[280px] min-w-[280px] h-full bg-brand_4 relative cursor-pointer rounded-lg overflow-hidden"
    >
      <div className="flex flex-col space-y-1 p-2 text-sm">
        <span className="text-black text-center rounded-lg">{list.title.slice(0, 20)}</span>
        <div className={`flex ${!isKind(kind) ? 'justify-center space-x-4' : 'justify-evenly'}  items-center text-xs`}>
          <span
            className={`flex items-center gap-1 px-2 py-1 rounded-lg ${isType(list.gatheringType) === '이벤트' ? 'bg-brand_2' : 'bg-orange-300'}`}
          >
            {isType(list.gatheringType) === '이벤트' ? <FaSketch /> : <FaUserFriends />} {isType(list.gatheringType)}
          </span>
          {isKind(kind) && (
            <span
              className={`${gatheringStatus(list.gatheringStatus) ? 'bg-sky-200' : 'bg-red-300'} px-2 py-1 rounded-lg`}
            >
              {gatheringStatus(list.gatheringStatus)}
            </span>
          )}
          {isKind(kind) && (
            <span className={`${myStatusClass(list.status)} flex items-center bg-brand_4 px-2 py-1 rounded-lg`}>
              {myStatusText(list.status)}
            </span>
          )}
          {!isKind(kind) && (
            <span className="flex items-center bg-brand_4 px-2 py-1 rounded-lg">
              <FaHeart className="mr-2 text-red-400" />
              {list.likeCount}
            </span>
          )}
        </div>
      </div>
      <img className="w-full h-full object-cover" src={list.mainImg} alt="gathering_img" />
      <div className="absolute z-20 bottom-2 left-12 text-sm rounded-md shadow-xl overflow-hidden">
        <p className="flex items-center justify-center bg-brand_4 px-2 py-1">
          <FaCalendarAlt className="mr-1" />
          {formatDate(list.day)}
        </p>
        <p className="flex items-center justify-center bg-white px-2">
          <IoIosTime className="mr-1" />
          {formatTime(list.time)}
        </p>
      </div>
    </div>
  );
}
