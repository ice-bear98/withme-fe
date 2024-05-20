import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetPost = () => {
  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;

  const fetchPosts = async () => {
    const response = await axios.get(`${URL}/api/gathering/list`, {
      headers: {
        Authorization: token,
      },
    });
    console.log('게시글 통신 :', response);
    return response.data;
  };

  const queryOption: UseQueryOptions<any, Error> = {
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  };

  const { data, error, isLoading } = useQuery(queryOption);

  return { data, error, isLoading, useGetPost };
};

export default useGetPost;
