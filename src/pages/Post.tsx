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
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageRange, setPageRange] = useState<number[]>([0, 1, 2, 3, 4]);

  const { data: allData, error: allError, isLoading: isAllLoading } = useGetPost('all', currentPage);
  const { data: eventData, error: eventError, isLoading: isEventLoading } = useGetPost('event', currentPage);
  const { data: meetingData, error: meetingError, isLoading: isMeetingLoading } = useGetPost('meeting', currentPage);
  const { data: searchData, error: searchError, isLoading: isSearchLoading } = useSearchPost(searchQuery);

  const [posts, setPosts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (searchQuery) {
      setPosts(searchData?.content || []);
      setTotalPages(searchData?.totalPages || 0);
    } else {
      let data;
      switch (postType) {
        case 'event':
          data = eventData;
          break;
        case 'meeting':
          data = meetingData;
          break;
        case 'all':
        default:
          data = allData;
      }
      setPosts(data?.content || []);
      setTotalPages(data?.totalPages || 0);
    }
    console.log('데이터 다시 불러옴');
  }, [allData, eventData, meetingData, searchData, searchQuery, postType]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(0);
    console.log('검색완료');
  };

  useEffect(() => {
    setCurrentPage(0); // Reset to first page when postType changes
  }, [postType]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const middle = Math.floor(pageRange.length / 2);
    const newRange = Array.from({ length: 5 }, (_, i) => currentPage - middle + i).filter(
      (page) => page >= 0 && page < totalPages,
    );
    setPageRange(newRange);
  }, [currentPage, totalPages]);

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
      <div className="flex justify-center mt-10">
        <button
          onClick={() => handlePageChange(0)}
          disabled={currentPage === 0}
          className="px-3 py-1 mx-1 bg-brand_1 text-white"
        >
          처음
        </button>
        {pageRange.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 mx-1 ${page === currentPage ? 'bg-brand_2' : 'bg-brand_3'}`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
          className="px-3 py-1 mx-1  bg-brand_1 text-white"
        >
          마지막
        </button>
      </div>
    </div>
  );
}
