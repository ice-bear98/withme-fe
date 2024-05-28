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

  const {
    data: allData,
    error: allError,
    isLoading: isAllLoading,
    handleMore: handleMoreAll,
    defaultMore: defaultMoreAll,
  } = useGetPost('all');
  const {
    data: eventData,
    error: eventError,
    isLoading: isEventLoading,
    handleMore: handleMoreEvent,
    defaultMore: defaultMoreEvent,
  } = useGetPost('event');
  const {
    data: meetingData,
    error: meetingError,
    isLoading: isMeetingLoading,
    handleMore: handleMoreMeeting,
    defaultMore: defaultMoreMeeting,
  } = useGetPost('meeting');
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
          break;
      }
    }
  }, [allData, eventData, meetingData, searchData, searchQuery, postType]);

  const setDefaultMore = () => {
    if (postType === 'all') {
      defaultMoreAll();
    } else if (postType === 'event') {
      defaultMoreEvent();
    } else if (postType === 'meeting') {
      defaultMoreMeeting();
    }
  };

  useEffect(() => {
    switch (postType) {
      case 'event':
        setPosts(eventData || []);
        setDefaultMore();
        break;
      case 'meeting':
        setPosts(meetingData || []);
        setDefaultMore();
        break;
      case 'all':
      default:
        setPosts(allData || []);
        setDefaultMore();
    }
  }, [postType]);

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

  const handleClick = () => {
    if (postType === 'all') {
      handleMoreAll();
    } else if (postType === 'event') {
      handleMoreEvent();
    } else if (postType === 'meeting') {
      handleMoreMeeting();
    }
  };

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
      <div className="w-full flex justify-center mt-10">
        <button className="w-2/3 p-2 bg-brand_3 rounded-3xl hover:bg-brand_2" onClick={handleClick}>
          더 보기
        </button>
      </div>
    </div>
  );
}
