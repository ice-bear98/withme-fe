import React from 'react';
import { FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

export default function PostCard({ data }: any) {
  const {
    title,
    kind,
    like,
    date_st,
    date_end,
    posted,
    time,
    category,
    personnel,
    address,
    address_detail,
    location,
    writer,
    pay,
    method,
    target,
    title_img,
    day,
    sub_img,
    content,
  } = data;

  const formatTime = (time: any) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? '오후' : '오전';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedTime = `${period} ${formattedHour}시 ${minutes}분`;
    return formattedTime;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };

    const formattedDate = date.toLocaleDateString('ko-KR', options);
    return formattedDate;
  };

  return (
    <div className="flex-col gap-4 w-[520px] bg-white pt-4 rounded-2xl border shadow-lg overflow-hidden cursor-pointer md:w-full">
      <div className="flex justify-between px-3 mb-2">
        <span className="flex items-center text-gray-400">
          <p className="bg-red-400 px-2 mr-2 rounded-lg text-white">HOT</p>
          <p className="bg-brand_1 px-2 mr-2 rounded-lg text-white">{category}</p>
          <FaHeart className="mr-2 cursor-pointer" /> {like}
        </span>
        <span className="text-gray-300 text-sm">{posted} 작성</span>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <img className="w-48 h-48 mx-3 object-cover rounded-2xl" src={title_img} alt="" />
        <div className="ml-2">
          <h2 className="py-2 rounded-3xl mb-4">{title}</h2>
          <div className="text-sm">
            <span className="bg-green-300 py-1 px-2 rounded-lg mr-2">나이제한 없음</span>
            <span className="bg-yellow-300 py-1 px-2 rounded-lg mr-2">무료참여</span>
            <span className="bg-orange-300 py-1 px-2 rounded-lg mr-2">선착순</span>
          </div>
          <p className="flex items-center bg-white mt-3 p-1 rounded-lg">
            <FaMapMarkerAlt className="mr-2" /> {address}
          </p>
          <p className="bg-white p-1 rounded-lg">
            {formatDate(day)} <br /> {formatTime(time)}
          </p>
          <p className="bg-white p-1 rounded-lg">작성자 : {writer}</p>
          <p className="bg-white p-1 rounded-lg">모집인원 : {personnel}</p>
        </div>
      </div>
      <p className="bg-green-300 mt-2 text-center p-2 text-white">· · · 현재 모집중 ( 2 / 8 ) · · ·</p>
      <p className="bg-brand_1 text-center p-2 text-white">
        모집기간 : {date_st} ~ {date_end}
      </p>
    </div>
  );
}
