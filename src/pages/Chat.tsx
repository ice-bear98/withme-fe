import { BsChatQuoteFill } from 'react-icons/bs';
import img from '../assets/default_profile.jpg';

export default function Chat() {
  return (
    <div className="w-4/5 mx-auto mt-5 s:w-full rounded-2xl overflow-hidden">
      <h1 className="flex items-center justify-center bg-brand_1 py-3 text-lg">
        <BsChatQuoteFill className="mr-2 text-lg" />
        ㅇㅇㅇ 채팅방
      </h1>
      <div className="bg-brand_4 max-h-[44rem] overflow-scroll">
        <ul className="p-5">
          <li className="p-2 mt-5">
            <div className="flex items-center mb-5">
              <img src={img} className="w-10 h-10 object-cover rounded-full" alt="userImg" />
              <span className="ml-2">닉네임</span>
            </div>
            <span className="bg-white px-7 py-2 rounded-lg">안녕하세요</span>
            <p className="text-sm mt-3 text-gray-500">12월 12일 오후 4시 30분</p>
          </li>

          <li className="p-2 mt-5">
            <div className="flex items-center mb-5">
              <img src={img} className="w-10 h-10 object-cover rounded-full" alt="userImg" />
              <span className="ml-2">닉네임2</span>
            </div>
            <span className="bg-white px-7 py-2 rounded-lg">누구세요</span>
            <p className="text-sm mt-3 text-gray-500">12월 12일 오후 4시 32분</p>
          </li>

          <li className="p-2 mt-5">
            <div className="flex items-center mb-5">
              <img src={img} className="w-10 h-10 object-cover rounded-full" alt="userImg" />
              <span className="ml-2">닉네임3</span>
            </div>
            <span className="bg-white px-7 py-2 rounded-lg">말뽄새 머고;</span>
            <p className="text-sm mt-3 text-gray-500">12월 12일 오후 4시 33분</p>
          </li>

          {/* 상태에 따라서 본인 li에만 오른쪽에 나오게 스타일 달아주면 될듯 {`${isMe ? '' : '' }`} 처럼 */}
          <li className="p-2 mt-5 flex justify-end">
            <div>
              <div className="flex justify-end items-center mb-5">
                <img src={img} className="w-10 h-10 object-cover rounded-full" alt="userImg" />
                <span className="ml-2">본인 닉네임</span>
              </div>
              <div className="flex justify-end">
                <span className="bg-yellow-200 px-7 py-2 rounded-lg">헉;</span>
              </div>
              <div className="flex justify-end">
                <p className="text-sm mt-3 text-gray-500">12월 12일 오후 4시 33분</p>
              </div>
            </div>
          </li>

          <li className="p-2 mt-5 flex justify-end">
            <div>
              <div className="flex justify-end items-center mb-5">
                <img src={img} className="w-10 h-10 object-cover rounded-full" alt="userImg" />
                <span className="ml-2">본인 닉네임</span>
              </div>
              <div className="flex justify-end">
                <span className="bg-yellow-200 px-7 py-2 rounded-lg">잘못들어온거 같습니다 죄송합니다 여러분 ...</span>
              </div>
              <div className="flex justify-end">
                <p className="text-sm mt-3 text-gray-500">12월 12일 오후 4시 33분</p>
              </div>
            </div>
          </li>

          <li className="p-2 mt-5">
            <div className="flex items-center mb-5">
              <img src={img} className="w-10 h-10 object-cover rounded-full" alt="userImg" />
              <span className="ml-2">닉네임3</span>
            </div>
            <span className="bg-white px-7 py-2 rounded-lg">어어 ... 그러지 말아다오...</span>
            <p className="text-sm mt-3 text-gray-500">12월 12일 오후 4시 33분</p>
          </li>
        </ul>
        <div className="flex justify-center space-x-1 mb-3">
          <button className="h-10 w-20 bg-red-300 border-2">나가기</button>
          <input
            className="border-2 w-2/3 py-2 h-10 placeholder:text-center"
            placeholder="채팅을 입력하세요..."
            type="text"
          />
          <button className="h-10 w-20 bg-brand_3 border-2">보내기</button>
        </div>
      </div>
    </div>
  );
}
