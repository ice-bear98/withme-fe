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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /** 게시글 작성 */
  const addPost = async (data: any, img: any) => {
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
      navigate('/post?range=all');
      scrollToTop();
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (error) {
      console.error(error);
    }
  };

  /** 게시글 이미지 업로드 */
  const uploadImg = async (images: any, target: any) => {
    try {
      await axios
        .post(`${URL}/api/gathering/image/${target}`, images, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => queryClient.invalidateQueries({ queryKey: ['posts'] }));
    } catch (error) {
      console.error(error);
    }
  };

  /** 게시글 삭제 */
  const removePost = async (id: number) => {
    try {
      await axios
        .delete(`${URL}/api/gathering/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => console.log('삭제 확인 : ', res));
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (error) {
      console.error(error);
    }
  };

  /** 게시글 수정 */
  const editPost = async (data: any, img: any, id: string) => {
    try {
      await axios.put(
        `${URL}/api/gathering/${id}`,
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
          mainImg: data.mainImg,
          subImg1: data.subImg1,
          subImg2: data.subImg2,
          subImg3: data.subImg3,
          participantsType: data.participantsType,
          fee: data.fee,
          participantSelectionMethod: data.participantSelectionMethod,
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
          responseType: 'json',
        },
      );
      EditImg(img, id);

      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (error) {
      console.error(error);
    }
  };

  /** 게시글 이미지 수정 */
  const EditImg = async (images: any, target: any) => {
    console.log('수정 이미지 확인 : ', images);
    try {
      await axios
        .put(`${URL}/api/gathering/image/${target}`, images, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          navigate(`/postdetail/${target}`);
          scrollToTop();
        });
    } catch (error) {
      console.error(error);
    }
  };

  /** 해당 게시글 수정 페이지 이동 */
  const goEdit = (id: string, save: any) => {
    saveData(save);
    navigate(`/write/${id}`);
    console.log('수정 데이터 저장 확인 :', post);
  };

  return { addPost, removePost, goEdit, editPost };
};

export default useWrite;
