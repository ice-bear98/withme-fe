import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosReturnLeft } from 'react-icons/io';

interface IForm {
  email: string;
  password: string;
  passwordChk: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
}

const SIGNUP_URL = 'http://43.200.85.230:8080/api/auth/signup';

export default function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IForm>();

  const navigate = useNavigate();

  const onSubmit = async (data: IForm) => {
    console.log(data);
    try {
      const res = await axios.post(SIGNUP_URL, data);
      console.log('회원가입 성공', res.data);
      reset();
      navigate('/login');
    } catch (error) {
      console.log('회원가입 실패', error);
    }
  };

  const validatePassword = (value: string) => {
    return value === watch('password') || '비밀번호가 일치하지 않습니다';
  };

  return (
    <div className="py-10 flex justify-center font-['TAEBAEKmilkyway']">
      <div className="max-w-lg w-full p-4 py-10 border rounded-xl shadow-md dark:bg-brand_4">
        <div className="text-center mb-6 text-2xl text-blue-500 font-['KCC-Hanbit']">
          <h1>Join</h1>
          <p className="text-base mt-2 text-blue-400">회원가입을 위한 정보를 입력해주세요</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-center items-center">
            <input
              {...register('email', {
                required: '이메일을 작성해주세요',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식에 맞춰 작성해주세요',
                },
                maxLength: {
                  value: 20,
                  message: '20글자 미만 작성해주세요',
                },
              })}
              type="email"
              placeholder="사용할 아이디 이메일을 적어주세요"
              className="rounded-md w-3/4 border-2 p-1 placeholder-brand_2 placeholder:text-center font-sans"
            />
          </div>
          {errors.email && <p className="text-red-500 text-center">{errors.email.message}</p>}

          <div className="flex justify-center items-center">
            <input
              {...register('password', {
                required: '비밀번호를 작성해주세요',
                minLength: {
                  value: 8,
                  message: '8글자 이상 작성해주세요',
                },
                maxLength: {
                  value: 20,
                  message: '20글자 미만 작성해주세요',
                },
              })}
              type="password"
              placeholder="사용할 비밀번호를 입력하세요"
              className="rounded-md w-3/4 p-1 border-2 placeholder-brand_2 placeholder:text-center font-sans"
            />
          </div>
          {errors.password && <p className="text-red-500 text-center">{errors.password.message}</p>}

          <div className="flex justify-center items-center">
            <input
              {...register('passwordChk', {
                required: '비밀번호를 작성해주세요',
                validate: validatePassword,
              })}
              type="password"
              placeholder="사용할 비밀번호 재확인"
              className="rounded-md w-3/4 p-1 border-2 placeholder-brand_2 placeholder:text-center font-sans"
            />
          </div>
          {errors.passwordChk && <p className="text-red-500 text-center">{errors.passwordChk.message}</p>}

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
          {errors.gender && <p className="text-red-500 text-center">{errors.gender.message}</p>}
          <div className="flex justify-center mt-4 ">
            <input
              type="button"
              value="가입하기"
              onClick={() => handleSubmit(onSubmit)()}
              className="rounded-lg btn-primary w-full max-w-xs cursor-pointer p-2 text-lg bg-brand_1 text-white hover:bg-brand_2 font-['LINESeedKR-Bd']"
            />
            <Link to={'/login'} className="p-3 bg-brand_3 rounded-lg ml-2 hover:bg-brand_2 cursor-pointer">
              <IoIosReturnLeft />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
