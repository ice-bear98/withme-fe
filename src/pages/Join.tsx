import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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
    <div className="py-10 flex justify-center">
      <div className="max-w-lg w-full p-4 border-2 rounded-xl">
        <div className="text-center mb-4 text-blue-500">
          회원가입을 위해 <br />
          정보를 입력해주세요.
        </div>
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
                maxLength: {
                  value: 20,
                  message: '20글자 미만 작성해주세요',
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
              placeholder="비밀번호"
              className=" rounded-md w-full bg-brand_3 text-brand_1 placeholder-brand_2"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-left text-brand_1">패스워드 확인</label>
            <input
              {...register('passwordChk', {
                required: '비밀번호를 작성해주세요',
                validate: validatePassword,
              })}
              type="password"
              placeholder="비밀번호 확인"
              className="rounded-md w-full bg-brand_3 text-brand_1 placeholder-brand_2"
            />
            {errors.passwordChk && <p className="text-red-500">{errors.passwordChk.message}</p>}
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="md:w-1/4 text-left text-brand_1">생년월일</label>
            <input
              {...register('birthDate', {
                required: '생년월일을 입력해주세요',
              })}
              type="date"
              className="w-full md:w-3/5 lg:w-2/5 bg-brand_4"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="md:w-1/4 text-left text-brand_1">성별</label>
            <select
              {...register('gender', {
                required: '성별을 선택해주세요',
              })}
              className="w-full md:w-3/5 lg:w-2/5 bg-brand_4"
            >
              <option value="">성별 선택</option>
              <option value="MALE">남성</option>
              <option value="FEMALE">여성</option>
            </select>
            {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
          </div>
          <div className="flex justify-center mt-4">
            <input
              type="button"
              value="가입하기"
              onClick={() => handleSubmit(onSubmit)()}
              className="rounded-md btn-primary w-full max-w-xs bg-brand_1 text-white hover:bg-brand_2"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
