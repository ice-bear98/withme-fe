import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { SiKakaotalk } from 'react-icons/si';
import axios from 'axios';
import useUserStore from '../store/store';

interface IForm {
  email: string;
  password: string;
}
const SIGNIN_URL = 'http://43.200.85.230:8080/api/auth/signin';

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IForm>();
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  async function fetchUserDetails(token: string) {
    try {
      const response = await axios.get('http://43.200.85.230:8080/api/member/detail', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response:', response);
      return response.data;
    } catch (error) {
      console.error('사용자 상세 정보 가져오기 실패:', error);
      return null;
    }
  }

  const onSubmit = async (data: IForm) => {
    try {
      const res = await axios.post(SIGNIN_URL, data);
      const { accessToken } = res.data;
      setUser({ ...res.data.user, accessToken });

      const userDetails = await fetchUserDetails(accessToken);
      if (userDetails) {
        setUser(userDetails);
      }

      reset();
      navigate('/');
    } catch (error) {
      console.error('로그인 실패', error);
    }
  };

  return (
    <div className="py-10 flex justify-center">
      <div className="max-w-lg w-full p-4 border-2 rounded-xl">
        <div className="text-center mb-4 text-blue-500">로그인</div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-2 text-left text-brand_1">이메일</label>
            <input
              {...register('email', {
                required: '이메일을 작성해주세요',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식에 맞춰 작성해주세요',
                },
              })}
              type="email"
              placeholder="이메일"
              className=" rounded-md w-full bg-brand_3 text-brand_1 placeholder-brand_2"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-left text-brand_1">패스워드</label>
            <input
              {...register('password', {
                required: '비밀번호를 작성해주세요',
              })}
              type="password"
              placeholder="비밀번호"
              className=" rounded-md w-full bg-brand_3 text-brand_1 placeholder-brand_2"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <div className="text-center mt-4">
            <button className="flex items-center bg-yellow-300 hover:bg-yellow-400 rounded-md p-1 text-sm">
              <SiKakaotalk className="text-2xl" />
              카카오 로그인
            </button>
          </div>
          <div className="flex justify-between mt-4">
            <input
              type="submit"
              value="로그인"
              className="btn btn-primary max-w-xs rounded-md p-1 bg-brand_1 text-white hover:bg-brand_2"
            />

            <div className="text-cente rounded-md p-1 bg-brand_1 text-white hover:bg-brand_2 ">
              <Link to={'/join'}>회원가입</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
