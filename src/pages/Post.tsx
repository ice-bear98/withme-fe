import axios from 'axios';
import PostCard from '../components/post/PostCard';
import SearchBar from '../components/post/SearchBar';
import { useEffect, useState } from 'react';

export default function Post() {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get('http://43.200.85.230:8080/api/gathering/list');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
