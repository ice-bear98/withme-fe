import { useState, useEffect, useRef } from 'react';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import Modal from '../../pages/modal/Modal';
import AlarmModal from '../../pages/modal/AlarmModal';
import useUserStore from '../../store/userStore';
import axios from 'axios';

interface Notification {
  id: number;
  message: string;
  notificationType: string;
  readDttm: string | null;
  createdDttm: string;
}

const NotificationButton = () => {
  const memberId = useUserStore((state) => state.user?.memberId);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setOpen] = useState(false);
  const URL = import.meta.env.VITE_SERVER_URL;
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const subscribeToNotifications = async () => {
      try {
        const eventSource = new EventSource(`${URL}/api/notification/subscribe?memberid=${memberId}`);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
          console.log('SSE 연결이 열렸습니다.');
        };

        eventSource.onmessage = (event) => {
          try {
            const newNotification: Notification = JSON.parse(event.data);
            setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
          } catch (parseError) {
            console.error('JSON 파싱 오류:', parseError, '받은 데이터:', event.data);
          }
        };

        eventSource.onerror = () => {
          eventSource.close();
        };
      } catch (error) {
        console.error('Error subscribing to notifications:', error);
      }
    };

    if (memberId) {
      subscribeToNotifications();
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        console.log('SSE 연결이 해제되었습니다.');
      }
    };
  }, [memberId, URL]);

  const fetchInitialNotifications = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return [];

    try {
      const res = await axios.get(`${URL}/api/notification/list`, {
        params: { page: 1 },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error fetching initial notifications:', error);
      return [];
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInitialNotifications().then((data) => setNotifications(data));
    }
  }, [isOpen]);

  return (
    <>
      <div className="text-2xl cursor-pointer" onClick={() => setOpen(true)}>
        <HiOutlineBellAlert />
      </div>
      {isOpen && (
        <Modal title="알림" isOpen={isOpen} onClose={() => setOpen(false)}>
          <AlarmModal initialNotifications={notifications} />
        </Modal>
      )}
    </>
  );
};

export default NotificationButton;
