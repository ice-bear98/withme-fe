import useFormat from '../../Hooks/useFormat';
import { useNavigate } from 'react-router-dom';

export default function ListCard({ list }: any) {
  const { formatDate, formatTime } = useFormat();
  const navigate = useNavigate();

  const isKind = (type: string) => {
    if (type === 'EVENT') return '이벤트';
    if (type === 'MEETING') return '미팅';
    return '나이제한 없음';
  };

  return (
    <div
      onClick={() => navigate(`/postdetail/${list.gatheringId}`)}
      className="max-w-[280px] min-w-[280px] h-full bg-gray-200 relative cursor-pointer rounded-lg overflow-hidden"
    >
      <div className="flex flex-col space-y-1 p-2 text-sm">
        <span className="text-black text-center rounded-lg">{list.title.slice(0, 20)}</span>
        <div className="flex justify-evenly items-center text-xs">
          <span className="bg-brand_4 px-2 rounded-lg">{isKind(list.gatheringType)}</span>
          <span className="bg-brand_4 px-2 rounded-lg">{list.gatheringStatus}</span>
          <span className="bg-brand_4 px-2 rounded-lg">{list.status}</span>
        </div>
      </div>
      <img className="w-full h-full object-cover" src={list.mainImg} alt="gathering_img" />
      <div className="absolute z-20 bottom-2 left-8 text-sm space-y-0 rounded-md shadow-xl overflow-hidden">
        <p className="bg-brand_2 py-1 px-2">개최일자 : {formatDate(list.day)}</p>
        <p className="bg-brand_1 py-1 px-2">개최시간 : {formatTime(list.time)}</p>
      </div>
    </div>
  );
}
