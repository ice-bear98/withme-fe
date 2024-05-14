import axios from 'axios';

const useParticipation = () => {
  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;

  const addParticipation = async (id: any) => {
    console.log(id);

    await axios
      .post(`${URL}/api/participation?gatheringid=${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => console.log('모임 참여 통신 결과 : ', res));
  };

  return { addParticipation };
};

export default useParticipation;
