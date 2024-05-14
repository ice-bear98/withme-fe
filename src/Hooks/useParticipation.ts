import axios from 'axios';

const useParticipation = () => {
  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;

  const addParticipation = async (id: any) => {
    await axios
      .post(`${URL}/api/participation?gatheringid=${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => console.log(res));
  };

  return { addParticipation };
};

export default useParticipation;
