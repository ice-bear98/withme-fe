import { useState, useEffect } from 'react';
import useGathering from '../../Hooks/useGathering';
import AppList from '../../components/mymanage/AppList';

const AppStatusModal = ({ gatheringId }: any) => {
  const [participants, setParticipants] = useState<any>([]);
  const { getInquiry, cancelApp, acceptApp } = useGathering();

  const fetchParticipants = async () => {
    const res = await getInquiry(gatheringId);
    setParticipants(res?.data.content);
  };

  useEffect(() => {
    fetchParticipants();
  }, [gatheringId]);

  const cancelHandler = async (participantId: any) => {
    await cancelApp(participantId);
    await fetchParticipants();
  };

  const acceptHandler = async (participantId: any) => {
    await acceptApp(participantId);
    await fetchParticipants();
  };

  return (
    <div className="p-4">
      {participants.map((it: any) => (
        <AppList key={it.id} data={it} cancelApp={cancelHandler} acceptApp={acceptHandler} />
      ))}
    </div>
  );
};

export default AppStatusModal;
