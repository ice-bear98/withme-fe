import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const useGetPost = (range: any) => {
  const URL = import.meta.env.VITE_SERVER_URL;

  const [more, setMore] = useState<number>(10);
  const [totalElements, setTotalElements] = useState<number>(0);

  const handleMore = () => {
    setMore(more + 10);
  };

  console.log(totalElements);

  const defaultMore = () => {
    setMore(10);
  };

  const fetchPosts = async () => {
    const queryParams = {
      size: more,
      range,
    };
    try {
      const response = await axios.get(`${URL}/api/gathering/list`, {
        params: queryParams,
      });
      setTotalElements(response.data.totalElements);
      return response.data.content;
    } catch (error) {
      console.error(`${range} 게시글 로드 실패:`, error);
      throw error;
    }
  };

  const queryOption: UseQueryOptions<any, Error> = {
    queryKey: ['posts', range],
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

  return { data, error, isLoading, fetchPosts, handleMore, defaultMore };
};

export default useGetPost;
