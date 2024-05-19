import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import axios from 'axios';

interface FormData {
  birthDate: string;
  gender: string;
}

const URL = import.meta.env.VITE_SERVER_URL;

export default function RequiredInfo() {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.put(`${URL}/api/member/additionalInfo`, data, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });

      if (response.status === 200) {
        setUser(response.data);
        navigate('/');
      } else {
        console.error('회원 정보 저장 실패');
      }
    } catch (error) {
      console.error('회원 정보 저장 중 에러 발생:', error);
    }
  };

  return (
    <div className="py-10 flex justify-center font-['TAEBAEKmilkyway']">
      <div className="max-w-lg w-full p-10 border border-gray-200 rounded-xl shadow-md dark:bg-brand_4">
        <div className="text-center mb-10 text-2xl">
          <strong>카카오 로그인 필수 입력 항목입니다.</strong>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-center">
            <div className="flex justify-center w-3/4 border-2 items-center p-2 gap-2 rounded-md dark:bg-brand_3 dark:border-none">
              <label className="md:w-1/4 text-left text-slate-600 text-md font-['LINESeedKR-Bd']">생년월일</label>
              <input
                {...register('birthDate', {
                  required: '생년월일을 입력해주세요',
                })}
                type="date"
                className="w-full md:w-3/5 lg:w-2/4 text-center p-1 bg-brand_4 rounded-3xl"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex justify-center w-3/4 border-2 items-center p-2 gap-2 rounded-md dark:bg-brand_3 dark:border-none">
              <label className="md:w-1/4 text-left text-slate-600 text-md font-['LINESeedKR-Bd']">성별</label>
              <select
                {...register('gender', {
                  required: '성별을 선택해주세요',
                })}
                className="w-full md:w-3/5 lg:w-2/5 bg-brand_4 text-center p-1 rounded-3xl"
              >
                <option value="">성별 선택</option>
                <option value="MALE">남성</option>
                <option value="FEMALE">여성</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-4 ">
            <input
              type="submit"
              value="가입하기"
              className="rounded-lg btn-primary w-full max-w-xs cursor-pointer p-2 text-lg bg-brand_1 text-white hover:bg-brand_2 font-['LINESeedKR-Bd']"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
