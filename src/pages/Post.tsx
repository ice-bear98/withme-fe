import axios from 'axios';
import PostCard from '../components/post/PostCard';
import SearchBar from '../components/post/SearchBar';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Post() {
  const [posts, setPosts] = useState<any>([]);

  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postType = searchParams.get('type');
  console.log(postType);

  const getPost = async () => {
    try {
      await axios
        .get(`${URL}/api/gathering/list`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log('통신 상태 : ', res);
          console.log('통신 데이터', res.data);

          if (postType !== 'all') {
            const filteredPosts = res.data.filter((post: any) => {
              const isMatch = post.gatheringType === postType?.toUpperCase();
              return isMatch;
            });
            setPosts(filteredPosts);
          } else {
            setPosts(res.data);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPost();
  }, [postType]);

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
