// {
//     "title": "등산모임",
//     "content": "이 모임은 백두산 등산 모임입니다. 함께하시죠",
//     "gatheringType": "MEETING",
//     "maximumParticipant": 4,
//     "recruitmentStartDt": "2024-03-10",
//     "recruitmentEndDt": "2024-03-12",
//     "category": "여행",
//     "address": "국희시 강락구 승찬동 155-1번지",
//     "detailedAddress": "123동 456호",
//     "location": "POINT(경도,위도)",
//     "mainImg": "img link",
//     "participantsType": "ADULT",
//     "fee": 10000,
//     "participantSelectionMethod": "FIRST_COME",
//     "likeCount": 10,
//   }

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useWrite = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;

  const addPost = async (data: any) => {
    console.log(data);
    try {
      const res = await axios.post(
        `${URL}/api/gathering`,
        {
          title: data.title,
          category: data.category,
          gatheringType: data.gatheringType,
          likeCount: data.like,
          recruitmentStartDt: data.starDttm,
          recruitmentEndDt: data.endDttm,
          day: data.day,
          time: data.time,
          maximumParticipant: data.maximumParticipant,
          address: data.address,
          detailedAddress: data.detailedAddress,
          location: data.location,
          fee: data.fee,
          participantSelectionMethod: data.participantSelectionMethod,
          participantsType: data.participantsType,
          mainImg: data.mainImg,
          subImg: data.subImg,
          content: data.content,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return { addPost };
};

export default useWrite;
