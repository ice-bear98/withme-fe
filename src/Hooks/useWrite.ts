import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useWrite = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  const addPost = async (data: any) => {
    console.log(data);
    try {
      const res = await axios.post(
        '',
        {
          title: data.title,
          category: data.category,
          gatheringType: data.gatheringType,
          like: data.like,
          startDttm: data.starDttm,
          endDttm: data.endDttm,
          day: data.day,
          time: data.time,
          maximumParticipant: data.maximumParticipant,
          address: data.address,
          detailedAddress: data.detailedAddress,
          location: data.location,
          writer: data.writer,
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
