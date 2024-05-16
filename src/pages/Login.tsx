import useUserStore from '../store/store';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { RiKakaoTalkFill } from 'react-icons/ri';

interface IForm {
  email: string;
  password: string;
}

const URL = import.meta.env.VITE_SERVER_URL;

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
      const response = await axios.get(`${URL}/api/member/detail`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return null;
    }
  }

  function handleKakaoLogin() {
    const kakaoLoginUrl = `http://localhost:8080/oauth2/authorization/kakao?redirect_uri=${encodeURIComponent('http://localhost:3000/login/oauth2/code/kakao')}`;
    window.location.href = kakaoLoginUrl;
  }

  const onSubmit = async (data: IForm) => {
    try {
      const res = await axios.post(`${URL}/api/auth/signin`, data);
      const accessToken = res.headers['authorization'];
      localStorage.setItem('accessToken', accessToken);

      if (accessToken) {
        const userDetails = await fetchUserDetails(accessToken);

        if (userDetails) {
          setUser({ ...userDetails, accessToken });
        }
        reset();
        navigate('/');
      } else {
        console.error('로그인 실패: 토큰이 반환되지 않았습니다.');
      }
    } catch (error) {
      console.error('로그인 실패', error);
    }
  };
  return (
    <div className="py-10 flex justify-center font-['TAEBAEKmilkyway']">
      <div className="max-w-lg w-full p-10 border border-gray-200 rounded-xl shadow-md dark:bg-brand_4">
        <h1 className="flex  items-center justify-center text-center mb-6 text-3xl text-brand_1 font-['BagelFatOne-Regular']">
          로그인
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-center">
            <input
              {...register('email', {
                required: '이메일을 작성해주세요',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식에 맞춰 작성해주세요',
                },
              })}
              type="email"
              placeholder="가입한 이메일을 입력해주세요"
              className="rounded-md w-3/4 border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans"
            />
          </div>
          {errors.email && <p className="text-red-500 text-center">{errors.email.message}</p>}

          <div className="flex justify-center">
            <input
              {...register('password', {
                required: '비밀번호를 작성해주세요',
              })}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className="rounded-md w-3/4 border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans"
            />
          </div>
          {errors.password && <p className="text-red-500 text-center">{errors.password.message}</p>}

          <div className="flex justify-center items-center mt-4">
            <input
              type="submit"
              value="로그인"
              className="btn btn-primary cursor-pointer max-w-xs rounded-md py-1 px-3 bg-brand_1 text-white hover:bg-brand_2 font-['LINESeedKR-Bd']"
            />
            <span className="ml-2 mr-2">또는</span>
            <div className="text-center">
              <button
                onClick={handleKakaoLogin}
                className="flex items-center bg-yellow-300 hover:bg-yellow-400 rounded-md py-1 px-3 text-sm font-['LINESeedKR-Bd']"
              >
                <RiKakaoTalkFill className="text-2xl mr-1" />
                카카오로 로그인하기
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <span className="border-t-2 w-64"></span>
          </div>
          <div className="flex-col text-center">
            <span className="">아직 계정이 없다면</span>
            <Link to={'/join'}>
              <span className="ml-1 text-blue-600 font-['LINESeedKR-Bd']">회원가입</span>
            </Link>
          </div>
          <div className="flex justify-center">
            <span className="border-t-2 w-64"></span>
          </div>
          <p className="text-center text-gray-500 text-sm">
            윗미 서비스를 제대로 이용하기 위해서는 계정이 필요해요.
            <br />
            회원가입 또는 카카오 로그인으로 편하게 계정을 만들어 사용하세요.
          </p>
        </form>
      </div>
    </div>
  );
}
