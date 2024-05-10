import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const useWrite = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;

  const addPost = async (data: any) => {
    console.log(data);
    try {
      await axios
        .post(
          `${URL}/api/gathering`,
          {
            title: '제목제목제목제목제목',
            content: '내용내용내용내용내용내용내용내용내용내용내용내용내용',
            gatheringType: 'MEETING',
            maximumParticipant: 1,
            recruitmentStartDt: '2024-05-10',
            recruitmentEndDt: '2024-05-11',
            category: '카테고리',
            address: '경기 오산시 부산중앙로 11',
            detailedAddress: '상세주소소',
            location: 'fadfadfadf',
            mainImg: 'blob:http://localhost:5173/edd74f1c-3276-4b85-a80d-ebde5e950cff',
            day: '2024-05-12',
            time: '15:45',
            participantsType: 'NO_RESTRICTIONS',
            fee: 0,
            participantSelectionMethod: 'FIRST_COME',
            likeCount: 0,
          },
          {
            headers: {
              Authorization: token,
            },
            responseType: 'json',
          },
        )
        .then((res) => console.log(res.data, res.status));
    } catch (error) {
      console.error('Error : ', error);
    }
  };

  return { addPost };
};

export default useWrite;
