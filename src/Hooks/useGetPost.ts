import { useEffect } from 'react';
import axios from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const useGetPost = () => {
  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;

  const fetchPosts = async () => {
    const queryParams = {
      size: 10,
    };
    try {
      const response = await axios.get(`${URL}/api/gathering/list`, {
        params: queryParams,
      });
      console.log('게시글 통신 :', response.data.content);
      return response.data.content;
    } catch (error) {
      console.error('게시글 로드 실패:', error);
      throw error;
    }
  };

  const queryOption: UseQueryOptions<any, Error> = {
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  };

  const { data, error, isLoading } = useQuery(queryOption);

  useEffect(() => {
    if (error) {
      console.error('데이터 에러 :', error.message);
    }
  }, [error]);

  return { data, error, isLoading, fetchPosts };
};

export default useGetPost;
