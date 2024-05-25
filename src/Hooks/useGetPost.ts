import { useEffect } from 'react';
import axios from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const useGetPost = (range: any, page = 0, size = 10) => {
  const URL = import.meta.env.VITE_SERVER_URL;

  const fetchPosts = async () => {
    const queryParams = {
      size,
      page,
      range,
    };
    try {
      const response = await axios.get(`${URL}/api/gathering/list`, {
        params: queryParams,
      });
      return {
        content: response.data.content,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      console.error(`${range} 게시글 로드 실패:`, error);
      throw error;
    }
  };

  const queryOption: UseQueryOptions<any, Error> = {
    queryKey: ['posts', range, page, size],
    queryFn: fetchPosts,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  };

  const { data, error, isLoading } = useQuery(queryOption);

  useEffect(() => {
    if (error) {
      console.error(`${range} 데이터 에러 :`, error.message);
    }
  }, [error]);

  return { data, error, isLoading, fetchPosts };
};

export default useGetPost;
