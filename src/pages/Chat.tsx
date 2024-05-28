import { BsChatQuoteFill } from 'react-icons/bs';
import img from '../assets/default_profile.jpg';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { useEffect, useRef } from 'react';

export default function Chat({ roomId }: any) {
  const URL = import.meta.env.VITE_SERVER_URL;
  const SOCKETURL = import.meta.env.VITE_SOCKET_URL;
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS(`${SOCKETURL}/ws`);
    const accessToken = localStorage.getItem('accessToken') || '';
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log('STOMP:', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log('소켓 연결 성공');
        client.subscribe(`/topic/chatroom/${roomId}`, onMessageReceived, {
          Authorization: accessToken,
        });
      },
      onStompError: (frame) => {
        console.error('STOMP: 소켓 연결 오류:', frame);
      },
      onWebSocketClose: () => {
        console.log('소켓 연결 종료');
      },
      onWebSocketError: (error) => {
        console.error('소켓 오류:', error);
      },
    });

    clientRef.current = client;
    console.log('Opening Web Socket...');
    client.activate();

    return () => {
      console.log('소켓 연결 해제 중...');
      client.deactivate();
    };
  }, [URL, roomId]);

  const onMessageReceived = (message: IMessage) => {
    console.log('수신한 메시지:', message.body);
  };

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
          {/* 나머지 채팅 메시지들 */}
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
          {/* 나머지 채팅 메시지들 */}
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
