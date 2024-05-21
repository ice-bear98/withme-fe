import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import usePostStore from '../store/postStore';

const useWrite = () => {
  const navigate = useNavigate();
  const saveData = usePostStore((state) => state.setPost);

  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;
  const post = usePostStore((state) => state.post);
  const queryClient = useQueryClient();

  const addPost = async (data: any, img: any, writer: any) => {
    console.log(data);
    try {
      const res = await axios.post(
        `${URL}/api/gathering`,
        {
          title: data.title,
          content: data.content,
          gatheringType: data.gatheringType,
          maximumParticipant: data.maximumParticipant,
          recruitmentStartDt: data.recruitmentStartDt,
          recruitmentEndDt: data.recruitmentEndDt,
          category: data.category,
          detailedAddress: data.detailedAddress,
          address: data.address,
          lat: data.lat,
          lng: data.lng,
          day: data.day,
          time: data.time,
          participantsType: data.participantsType,
          fee: data.fee,
          participantSelectionMethod: data.participantSelectionMethod,
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      );
      const target = res.data.gatheringId;
      uploadImg(img, target);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImg = async (images: any, target: any) => {
    try {
      await axios
        .post(`${URL}/api/gathering/image/${target}`, images, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => console.log(res));
    } catch (error) {
      console.error(error);
    }
  };

  const removePost = async (id: number) => {
    try {
      await axios
        .delete(`${URL}/api/gathering/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => console.log('삭제 확인 : ', res));
      navigate('/post?type=all');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (error) {
      console.error(error);
    }
  };

  const editPost = async (data: any, id: string) => {
    try {
      await axios
        .put(
          `${URL}/api/gathering/${id}`,
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
            subImg1: data.subImg1,
            subImg2: data.subImg2,
            subImg3: data.subImg3,
            day: data.day,
            time: data.time,
            participantsType: data.participantsType,
            fee: data.fee,
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
        .then((res) => console.log('수정 확인 : ', res));
      navigate('/post?type=all');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (error) {
      console.error(error);
    }
  };

  const goEdit = (id: string, save: any) => {
    saveData(save);
    navigate(`/write/${id}`);
    console.log('수정 데이터 저장 확인 :', post);
  };

  return { addPost, removePost, goEdit, editPost };
};

export default useWrite;
