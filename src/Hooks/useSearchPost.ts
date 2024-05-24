import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useSearchPost = (query: string) => {
  const URL = import.meta.env.VITE_SERVER_URL;
  const queryClient = useQueryClient();

  const fetchPosts = async () => {
    const response = await axios.get(`${URL}/api/search/gathering/title?${query}`);
    queryClient.invalidateQueries({ queryKey: [`searchPosts`] });
    return response.data.content;
  };

  const queryOption: UseQueryOptions<any, Error> = {
    queryKey: ['searchPosts', query],
    queryFn: fetchPosts,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!query,
  };

  const { data, error, isLoading } = useQuery(queryOption);

  return { data, error, isLoading };
};

export default useSearchPost;
