import { useNavigate, useSearchParams } from 'react-router-dom';
import useUserStore from '../store/store';
import { useEffect } from 'react';
import axios from 'axios';

const URL = import.meta.env.VITE_SERVER_URL;

export default function ParsingToken() {
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  async function fetchUserDetails(token: string) {
    try {
      const response = await axios.get(`${URL}/api/member/detail`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('유저 정보 가져오기 실패:', error);
      return null;
    }
  }

  useEffect(() => {
    const accessToken = searchParams.get('Authorization');
    const requiredInfo = searchParams.get('isAdditionalInfoRequired');

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      if (requiredInfo === 'true') {
        navigate('/auth/requiredInfo');
      } else {
        fetchUserDetails(accessToken).then((userDetails) => {
          if (userDetails) {
            setUser({ ...userDetails, accessToken });
            navigate('/');
          } else {
            console.error('유저 정보를 가져오는데 실패했습니다.');
          }
        });
      }
    } else {
      console.error('토큰이 없습니다.');
    }
  }, [searchParams, navigate, setUser]);

  return (
    <div className="py-10 flex justify-center font-['TAEBAEKmilkyway']">
      <div className="max-w-lg w-full p-10 border border-gray-200 rounded-xl shadow-md dark:bg-brand_4">
        <div className="text-center mb-10 text-2xl">
          <strong>로그인 중입니다...</strong>
        </div>
      </div>
    </div>
  );
}
