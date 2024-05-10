import React from 'react';

export default function SearchBar() {
  return (
    <div className="flex justify-center space-x-3 w-full bg-brand_4 p-2 mt-5 rounded-2xl md:-p-1 md:text-sm">
      <input type="text" className="placeholder:text-center py-1 px-3" placeholder="검색할 제목을 입력해주세요" />
      <select name="filter_date" id="filter" className="text-center px-2">
        <option value="lastest">최신 순</option>
        <option value="oldest">예전 순</option>
        <option value="hot">인기 순</option>
      </select>
      <select name="filter_method" id="filter2" className="text-center px-2">
        <option value="default">추가선택</option>
        <option value="method">선착순 모임</option>
        <option value="method2">신청선별 모임</option>
        <option value="part">성인 모임</option>
        <option value="part2">미성년 모임</option>
        <option value="part2">나이제한 없음</option>
        <option value="free">무료</option>
        <option value="pay">유료</option>
      </select>
      <button className="bg-brand_2 px-3 text-white rounded-xl">검색</button>
    </div>
  );
}
