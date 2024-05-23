import { MdManageAccounts } from 'react-icons/md';
import GatheringCard from '../components/mymanage/GatheringCard';
import useGathering from '../Hooks/useGathering';
import { useEffect, useState } from 'react';
import useWrite from '../Hooks/useWrite';

export default function MyManage() {
  const [data, setData] = useState<any>();
  const { getMyGathering } = useGathering();
  const { removePost } = useWrite();

  const fetchData = async () => {
    const res = await getMyGathering();
    console.log(res);
    setData(res?.data.content);
  };

  const isDelete = async (targetId: any) => {
    const check = confirm('정말로 개최를 취소하고 삭제하겠습니까?');
    if (check) {
      await removePost(targetId);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full mt-5">
      <div className="h-10 leading-10 mb-5 text-xl font-['LINESeedKR-Bd']">
        <div className="flex items-center justify-center bg-brand_3 rounded-2xl">
          <MdManageAccounts className="mr-2 text-2xl" />내 개설 이벤트 및 모임 관리
        </div>
      </div>
      <div className="w-2/3 mx-auto my-5 md:w-full">
        {data?.map((it: any) => <GatheringCard key={it.gatheringId} data={it} isDelete={isDelete} />)}
      </div>
    </div>
  );
}
