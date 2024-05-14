import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const useWrite = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;

  const addPost = async (data: any) => {
    try {
      await axios
        .post(
          `${URL}/api/gathering`,
          {
            title: data.title,
            content: data.content,
            gatheringType: data.gatheringType,
            maximumParticipant: data.maximumParticipant,
            recruitmentStartDt: data.recruitmentStartDt,
            recruitmentEndDt: data.recruitmentEndDt,
            category: data.category,
            address: data.address,
            detailedAddress: data.detailedAddress,
            lat: data.lat,
            lng: data.lng,
            mainImg: data.mainImg,
            day: data.day,
            time: data.time,
            participantsType: data.participantsType,
            fee: 0,
            participantSelectionMethod: data.participantSelectionMethod,
            likeCount: 0,
          },
          {
            headers: {
              Authorization: token,
            },
            responseType: 'json',
          },
        )
        .then((res) => {
          console.log('결과 데이터 : ', res.data, '통신 결과 : ', res);
          navigate('/post?type=all');
        });
    } catch (error) {
      console.error('Error : ', error);
    }
  };

  return { addPost };
};

export default useWrite;
