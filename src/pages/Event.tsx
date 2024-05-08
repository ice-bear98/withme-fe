import { useEffect } from 'react';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

export default function Event() {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get('http://43.200.85.230:8080/api/gathering/list').then((res) => console.log(res));
  };

  return (
    <div className="mb-10">
      <SearchBar />
      <div className="flex justify-center">
        <div className="mt-7 grid gap-7 grid-cols-2 md:grid-cols-1">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
}
