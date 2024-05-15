import axios from 'axios';

const useParticipation = () => {
  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;

  const addParticipation = async (id: any) => {
    console.log(id);

    try {
      const response = await axios.post(`${URL}/api/participation?gatheringid=${id}`, null, {
        headers: {
          Authorization: token,
        },
      });

      console.log('모임 참여 통신 결과:', response);
    } catch (error) {
      console.error('모임 참여 통신 에러:', error);
    }
  };

  return { addParticipation };
};

export default useParticipation;
