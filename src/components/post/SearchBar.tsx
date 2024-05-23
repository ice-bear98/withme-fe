import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [category, setCategory] = useState<string>('전체');
  const [search, setSearch] = useState({
    title: '',
    range: 'all',
    option: 'created_dttm,desc',
    sort: 'all',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postType = searchParams.get('range');

  useEffect(() => {
    if (postType) {
      setCategory(isCategory(postType));
      setSearch((prevSearch) => ({
        ...prevSearch,
        range: postType,
      }));
    }
  }, [postType]);

  const isCategory = (type: string | null): string => {
    switch (type) {
      case 'all':
        return '전체';
      case 'event':
        return '이벤트';
      case 'meeting':
        return '모임';
      default:
        return '전체';
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  };

  const handleSearchSubmit = () => {
    const params = new URLSearchParams({
      range: search.range,
      title: search.title,
      sort: search.option,
      option: search.sort,
    });
    navigate({ search: params.toString() });
    onSearch(params.toString());
  };

  return (
    <div className="flex justify-center items-center space-x-3 w-full bg-brand_3 p-2 mt-5 rounded-full dark:bg-slate-600 md:-p-1 md:text-sm shadow-sm s:rounded-none">
      <b className="text-white text-xl ss:text-sm">{category}</b>
      <input
        type="text"
        name="title"
        value={search.title}
        onChange={handleSearch}
        className="placeholder:text-center py-1 px-3 dark:bg-gray-800 dark:text-white outline-none"
        placeholder="검색할 제목을 입력해주세요"
      />
      <select
        name="option"
        value={search.option}
        onChange={handleSearch}
        className="text-center py-1 px-2 dark:bg-gray-800 dark:text-white outline-none"
      >
        <option value="createdDttm,desc">최신 순</option>
        <option value="createdDttm,asc">예전 순</option>
        <option value="likeCount,desc">인기 순</option>
      </select>
      <select
        name="sort"
        value={search.sort}
        onChange={handleSearch}
        className="text-center py-1 px-2 dark:bg-gray-800 dark:text-white outline-none"
      >
        <option value="all">전체보기</option>
        <option value="first">선착순 모임</option>
        <option value="application">신청선별 모임</option>
        <option value="adult">성인 모임</option>
        <option value="minor">미성년 모임</option>
        <option value="no_limit">나이제한 없음</option>
        <option value="pay_free">무료</option>
        <option value="pay_has">유료</option>
      </select>
      <button
        onClick={handleSearchSubmit}
        className="bg-brand_2 px-4 text-white rounded-xl py-1 dark:bg-gray-200 dark:text-black ss:text-sm ss:px-1 ss:rounded-lg"
      >
        검색
      </button>
    </div>
  );
}
