import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useLike = () => {
  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;
  const queryClient = useQueryClient();

  const changeLike = async (targetId: any) => {
    const queryParams = {
      gatheringid: targetId,
    };
    try {
      const response = await axios.put(
        `${URL}/api/gathering/like`,
        {},
        {
          params: queryParams,
          headers: {
            Authorization: token,
          },
        },
      );
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (error) {
      console.error(error);
    }
  };

  const checkLike = async (targetId: any) => {
    const queryParams = {
      gatheringid: targetId,
    };
    try {
      const res = await axios.get(`${URL}/api/gathering/like`, {
        params: queryParams,
        headers: {
          Authorization: token,
        },
      });
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getLikes = async () => {
    const queryParams = {
      sort: 'createdDttm,desc',
    };
    const res = await axios.get(`${URL}/api/gathering/like/list`, {
      params: queryParams,
      headers: {
        Authorization: token,
      },
    });
    return res.data.content;
  };

  return { changeLike, checkLike, getLikes };
};

export default useLike;
