import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostCard from '../components/post/PostCard';
import SearchBar from '../components/post/SearchBar';
import useGetPost from '../Hooks/useGetPost';
import useSearchPost from '../Hooks/useSearchPost';
import Loader from '../components/common/Loader';

type QueryString = { [key: string]: string };

export default function Post() {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const location = useLocation();

  const { data: initialData, error: initialError, isLoading: isInitialLoading } = useGetPost();
  const { data: searchData, error: searchError, isLoading: isSearchLoading } = useSearchPost(searchQuery);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const queryString: QueryString = {};
    for (const [key, value] of searchParams.entries()) {
      queryString[key] = value;
    }

    const { range, title, option, sort } = queryString;
    if (!title && !option && !sort) {
      const filterdData =
        range === 'all' ? initialData : initialData?.filter((post: any) => post.gatheringType.toLowerCase() === range);
      setPosts(filterdData || []);
    } else {
      setPosts(searchData || []);
    }
  }, [initialData, searchData, location.search]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (isInitialLoading || isSearchLoading) return <Loader />;
  if (initialError || searchError) return <div>데이터 에러 : {initialError?.message || searchError?.message}</div>;
  console.log();
  return (
    <div className="mb-10">
      <SearchBar onSearch={handleSearch} />
      <div className="flex justify-center">
        <div className="mt-7 grid gap-7 grid-cols-2 md:grid-cols-1">
          {posts.length === 0 ? (
            <p>게시글이 없습니다.</p>
          ) : (
            posts.map((it: any) => <PostCard key={it.gatheringId} data={it} />)
          )}
        </div>
      </div>
    </div>
  );
}
