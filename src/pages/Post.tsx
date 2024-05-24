import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostCard from '../components/post/PostCard';
import SearchBar from '../components/post/SearchBar';
import useGetPost from '../Hooks/useGetPost';
import useSearchPost from '../Hooks/useSearchPost';
import Loader from '../components/common/Loader';

export default function Post() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postType = searchParams.get('range');

  const { data: allData, error: allError, isLoading: isAllLoading } = useGetPost('all');
  const { data: eventData, error: eventError, isLoading: isEventLoading } = useGetPost('event');
  const { data: meetingData, error: meetingError, isLoading: isMeetingLoading } = useGetPost('meeting');
  const { data: searchData, error: searchError, isLoading: isSearchLoading } = useSearchPost(searchQuery);

  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (searchQuery) {
      setPosts(searchData || []);
    } else {
      switch (postType) {
        case 'event':
          setPosts(eventData || []);
          break;
        case 'meeting':
          setPosts(meetingData || []);
          break;
        case 'all':
        default:
          setPosts(allData || []);
      }
    }
  }, [allData, eventData, meetingData, searchData, searchQuery, postType]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (isAllLoading || isEventLoading || isMeetingLoading || isSearchLoading) return <Loader />;
  if (allError || eventError || meetingError || searchError)
    return (
      <div>
        데이터 에러 : {allError?.message || eventError?.message || meetingError?.message || searchError?.message}
      </div>
    );

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
