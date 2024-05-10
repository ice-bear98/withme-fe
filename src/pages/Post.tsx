import axios from 'axios';
import PostCard from '../components/post/PostCard';
import SearchBar from '../components/post/SearchBar';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useGetPost from '../Hooks/useGetPost';

export default function Post() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postType = searchParams.get('type');

  const { getPost } = useGetPost();

  console.log(postType);

  /** searchParams에 따라 게시글 분류하여 받아오기 */
  const getData = async () => {
    try {
      const response = await axios.get('http://43.200.85.230:8080/api/gathering/list');
      if (postType !== 'all') {
        const filteredPosts = response.data.filter((post: any) => {
          const isMatch = post.kind === postType?.toUpperCase();
          return isMatch;
        });
        setPosts(filteredPosts);
      } else {
        setPosts(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
    getPost();
  }, [postType]);

  const [posts, setPosts] = useState<any>([]);

  console.log(posts);

  return (
    <div className="mb-10">
      <SearchBar />
      <div className="flex justify-center">
        <div className="mt-7 grid gap-7 grid-cols-2 md:grid-cols-1">
          {posts.map((it: any) => (
            <PostCard key={it.id} data={it} />
          ))}
        </div>
      </div>
    </div>
  );
}
