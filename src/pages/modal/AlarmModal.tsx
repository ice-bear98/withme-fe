import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useFormat from '../../Hooks/useFormat';

// 알림 api 로직 다 떼어내자 너무 길다
interface Notification {
  id: number;
  message: string;
  notificationType: string;
  readDttm: string | null;
  createdDttm: string;
}

interface AlarmModalProps {
  initialNotifications: Notification[];
}

const AlarmModal: React.FC<AlarmModalProps> = ({ initialNotifications }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showUnread, setShowUnread] = useState(false);
  const [unreadPage, setUnreadPage] = useState(0);
  const [listPage, setListPage] = useState(0);
  const URL = import.meta.env.VITE_SERVER_URL;

  const accessToken = localStorage.getItem('accessToken');
  const { formatDate, formatTime } = useFormat();

  // 모든 알림
  const fetchListNotifications = async (page: number) => {
    if (!accessToken) return;

    try {
      setIsLoading(true);
      const res = await axios.get(`${URL}/api/notification/list`, {
        params: { page },
        headers: {
          Authorization: accessToken,
        },
      });

      console.log('모든 데이터:', res.data);

      if (res.data.content.length === 0) {
        setHasMore(false);
      } else {
        setNotifications((prev) => [...prev, ...res.data.content]);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };
  //읽지 않은 알림
  const fetchUnreadNotifications = async () => {
    if (!accessToken) return;

    try {
      setIsLoading(true);
      const res = await axios.get(`${URL}/api/notification/unread`, {
        headers: {
          Authorization: accessToken,
        },
      });

      console.log('읽지 않은:', res.data);

      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setNotifications(res.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showUnread) {
      fetchUnreadNotifications();
    } else {
      fetchListNotifications(listPage);
    }
  }, [showUnread, listPage]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      if (!showUnread) {
        fetchListNotifications(listPage + 1);
        setListPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handleToggleUnread = () => {
    setShowUnread((prevState) => !prevState);
    setNotifications([]);
    setHasMore(true);
  };

  // 읽지않은 알림
  const markAsRead = async (id: number) => {
    if (!accessToken) return;

    try {
      const res = await axios.put(`${URL}/api/notification/${id}`, null, {
        headers: {
          Authorization: accessToken,
        },
      });

      console.log('알림을 읽음으로 표시:', res.data);

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id ? { ...notification, readDttm: new Date().toISOString() } : notification,
        ),
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // 알림삭제
  const deleteNotification = async (id: number) => {
    if (!accessToken) return;

    try {
      const res = await axios.delete(`${URL}/api/notification/${id}`, {
        headers: {
          Authorization: accessToken,
        },
      });

      console.log('알림 삭제:', res.data);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div>
      <div className="my-3 flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleToggleUnread}
        >
          {showUnread ? '모든 알림 보기' : '읽지 않은 알림 보기'}
        </button>
      </div>
      {notifications.length <= 0 && (
        <div className="rounded-xl bg-gray-100 w-96 p-3 text-center">읽지 않은 알림이 없습니다.</div>
      )}
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="mb-5 border-2 p-3 rounded-xl">
            <div>
              <span className={notification.readDttm ? 'text-gray-800' : 'font-semibold'}>{notification.message}</span>{' '}
              <p className="text-gray-500 text-center mt-1">
                {formatDate(notification.createdDttm)} {formatTime(notification.createdDttm)}{' '}
              </p>
            </div>
            <div className="mt-3">
              <button
                className="bg-green-500 hover:bg-green-600 cursor-pointer text-white font-semibold py-1 px-2 rounded mr-2"
                onClick={() => markAsRead(notification.id)}
                disabled={!!notification.readDttm}
              >
                읽음
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                onClick={() => deleteNotification(notification.id)}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showUnread && hasMore && !isLoading && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
          onClick={loadMore}
        >
          더 불러오기
        </button>
      )}
      {isLoading && <p className="mt-4">로딩 중...</p>}
    </div>
  );
};

export default AlarmModal;
