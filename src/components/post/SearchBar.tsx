import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchBar() {
  const [category, setCategory] = useState<string | null>('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postType = searchParams.get('type');

  console.log('타입 : ', postType);

  useEffect(() => {
    setCategory(postType);
  }, [postType]);

  const isCategory = (category: any) => {
    if (category === 'all') {
      return '전체';
    } else if (category === 'event') {
      return '이벤트';
    } else if (category === 'meeting') {
      return '모임';
    }
  };

  return (
    <div className="flex justify-center items-center space-x-3 w-full bg-brand_3 p-2 mt-5 rounded-full dark:bg-slate-600 md:-p-1 md:text-sm shadow-sm">
      <b className="text-white text-xl">{isCategory(postType)}</b>
      <input
        type="text"
        className="placeholder:text-center py-1 px-3 dark:bg-gray-800 dark:text-white outline-none"
        placeholder="검색할 제목을 입력해주세요"
      />
      <select
        name="filter_date"
        id="filter"
        className="text-center py-1 px-2 dark:bg-gray-800 dark:text-white outline-none"
      >
        <option value="lastest">최신 순</option>
        <option value="oldest">예전 순</option>
        <option value="hot">인기 순</option>
      </select>
      <select
        name="filter_method"
        id="filter2"
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
      <button className="bg-brand_2 px-4 text-white rounded-xl py-1 dark:bg-gray-200 dark:text-black">검색</button>
    </div>
  );
}
