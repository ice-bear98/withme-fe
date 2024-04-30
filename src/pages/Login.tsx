import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface IForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register } = useForm<IForm>();

  return (
    <div className="py-10 text-center">
      <form>
        <div>
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
            className="placeholder:text-center"
          />
        </div>

        <div>
          <input
            {...register('password', {
              required: '비밀번호를 작성해주세요',
            })}
            type="password"
            placeholder="비밀번호"
            className="placeholder:text-center"
          />
        </div>
      </form>
      <button>
        <Link to={'/join'}>회원가입</Link>
      </button>
    </div>
  );
}
