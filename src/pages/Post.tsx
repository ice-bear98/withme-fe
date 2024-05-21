import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostCard from '../components/post/PostCard';
import SearchBar from '../components/post/SearchBar';
import useGetPost from '../Hooks/useGetPost';
import Loader from '../components/common/Loader';

export default function Post() {
  const [posts, setPosts] = useState<any[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postType = searchParams.get('type');

  const { data, error, isLoading } = useGetPost();

  useEffect(() => {
    if (data && data.length > 0) {
      const filteredPosts =
        postType !== 'all'
          ? data.filter((post: any) => post.gatheringType.trim().toLowerCase() === postType?.trim().toLowerCase())
          : data;

      setPosts(filteredPosts);
      console.log('필터링된 게시글:', filteredPosts);
    } else {
      setPosts([]);
    }
  }, [data, postType]);

  if (isLoading) return <Loader />;
  if (error) return <div>데이터 에러 : {error.message}</div>;

  return (
    <div className="mb-10">
      <SearchBar />
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
