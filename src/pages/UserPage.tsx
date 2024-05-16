import { PiGenderMaleBold } from 'react-icons/pi';
import PostCard from '../components/post/PostCard';

export default function UserPage() {
  const infoListStyle = 'flex items-center justify-center bg-white text-center rounded-xl text-xl py-1 px-5';

  return (
    <div className="w-full mt-5 shadow-2xl p-3 mb-10">
      <div className="flex w-full justify-center items-center py-5 px-10 space-x-5 bg-gray-200 rounded-2xl">
        <img
          src="https://cdn.pixabay.com/photo/2019/11/05/16/03/man-4603859_1280.jpg"
          className="w-60 h-60 object-cover rounded-full"
        />
        <div className="flex-col justify-center">
          <ul className="space-y-3">
            <li className={`${infoListStyle}`}>
              이름 : 홍길동 <PiGenderMaleBold className="ml-2 bg-blue-400 text-white rounded-full p-1 text-2xl" />
            </li>
            <li className={`${infoListStyle}`}>멤버쉽 : 일반 유저</li>
            <li className={`${infoListStyle}`}>가입일자 : 2024.05.04</li>
            <li className={`${infoListStyle}`}>생년월일 : 1999.09.19 </li>
            <li className={`${infoListStyle} space-x-3`}>
              <span>총 모임 : 3</span>
              <span>총 이벤트 : 3</span>
            </li>

            <li className="space-x-3 text-center text-xl pt-2">
              <span className="bg-brand_1 py-2 px-4 text-white rounded-3xl cursor-pointer">팔로워 100</span>
              <span className="bg-brand_2 py-2 px-4 text-white rounded-3xl cursor-pointer">팔로우 100</span>
              <span className="bg-gray-500 py-2 px-4 text-white rounded-3xl cursor-pointer hover:bg-gray-800">
                팔로우하기
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className="mt-7 rounded-2xl text-center bg-brand_1 p-3 text-white text-xl">진행중인 이벤트 및 모임 (3)</h3>
        <div className="flex justify-center mb-7">
          <div className="mt-7 grid gap-7 grid-cols-2 md:grid-cols-1">
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mt-7 rounded-2xl text-center bg-brand_2 text-white p-3 text-xl">
          진행한 이벤트 및 모임 기록 (3)
        </h3>
        <div className="flex justify-center mb-7">
          <div className="mt-7 grid gap-7 grid-cols-2 md:grid-cols-1">
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </div>
    </div>
  );
}
