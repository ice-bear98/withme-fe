import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostCard from '../components/post/PostCard';
import SearchBar from '../components/post/SearchBar';
import useGetPost from '../Hooks/useGetPost';
import Loader from '../components/common/Loader';

export default function Post() {
  const [posts, setPosts] = useState<any>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postType = searchParams.get('type');
  console.log(postType);

  const { data, error, isLoading } = useGetPost();

  if (isLoading) return <Loader />;
  if (error) return <div>데이터 에러 : {error.message}</div>;

  console.log('쿼리 데이터 : ', data);

  /** 전체 / 이벤트 / 모임 분류 필터 */
  useEffect(() => {
    if (postType !== 'all') {
      const filteredPosts = data.filter((post: any) => {
        const isMatch = post.gatheringType === postType?.toUpperCase();
        return isMatch;
      });
      setPosts(filteredPosts);
    } else {
      setPosts(data);
    }
  }, [postType, data]);

  return (
    <div className="mb-10">
      <SearchBar />
      <div className="flex justify-center">
        <div className="mt-7 grid gap-7 grid-cols-2 md:grid-cols-1">
          {posts.map((it: any) => (
            <PostCard key={it.gatheringId} data={it} />
          ))}
        </div>
      </div>
    </div>
  );
}
