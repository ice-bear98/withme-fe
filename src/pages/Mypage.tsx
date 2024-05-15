import { useEffect, useState } from 'react';
import useUserStore from '../store/store';
import defaultImg from '../assets/default_profile.jpg';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Modal from './modal/Modal';
import PhoneCertificationModal from './modal/PhoneCertificationModal';

const URL = import.meta.env.VITE_SERVER_URL;

export default function Mypage() {
  const { user, logout, setUser } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(user?.profileImg || defaultImg);
  const [editMode, setEditMode] = useState(false);
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    watch,
  } = useForm({
    defaultValues: {
      nickName: user?.nickName,
    },
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleNicknameChange = async (data: any) => {
    if (nicknameAvailable === true && user?.memberId) {
      try {
        const res = await axios.put(
          `${URL}/api/member/nickname`,
          { nickName: data.nickName, memberId: user?.memberId },
          { headers: { Authorization: `${localStorage.getItem('accessToken')}` } },
        );
        if (res.data) {
          setUser({ ...user, nickName: data.nickName });
          reset({ nickName: data.nickName });
          setEditMode(false);
          alert('닉네임이 수정 되었습니다.');
        } else {
          alert('닉네임 수정 실패');
        }
      } catch (error) {
        console.error('닉네임 업데이트 실패:', error);
        alert('닉네임 업데이트를 실패했습니다.');
        setEditMode(false);
      }
    } else {
      alert('닉네임 중복확인을 해주세요');
    }
  };

  const checkNickname = async (nickname: string) => {
    if (!nickname) {
      setError('nickName', { type: 'manual', message: '닉네임을 입력해주세요.' });
      return;
    }
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(`${URL}/api/member/check/nickname?nickname=${nickname}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      setNicknameAvailable(!res.data);
      alert(res.data ? '이미 사용 중인 닉네임입니다.' : '사용 가능한 닉네임입니다.');
    } catch (error) {
      console.error('닉네임 중복 확인 실패:', error);
      setNicknameAvailable(false);
    }
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  useEffect(() => {
    setImage(user?.profileImg || defaultImg);
    reset({
      nickName: user?.nickName,
    });
  }, [user, reset]);

  const genderText = user?.gender === 'MALE' ? '남자' : '여자';
  const nickName = user?.nickName.slice(0, 8);
  const date = user?.signupDttm.slice(0, 10);

  return (
    <div className="p-4 max-w-4xl m-auto">
      <h1 className="text-center text-2xl font-bold mb-4">{nickName}님의 마이페이지</h1>

      <div className="flex justify-center items-start gap-4">
        <div className="w-72 h-96 flex flex-col justify-center items-center bg-brand_4 p-4 rounded-lg text-center">
          <div className="">
            <img src={image} alt="Profile" className="rounded-full object-cover h-64 w-72 mb-4" />
          </div>
          <label
            htmlFor="image-upload"
            className=" text-white hover:bg-brand_2 cursor-pointer bg-brand_3 p-2 rounded-lg"
          >
            프로필 이미지 변경
          </label>
          <input id="image-upload" type="file" onChange={handleImageChange} className="hidden" />
        </div>
        <div className="relative font-['LINESeedKR-Bd'] w-72 h-96 flex flex-col justify-between p-4 bg-gray-100 rounded-lg">
          {editMode ? (
            <form onSubmit={handleSubmit(handleNicknameChange)}>
              <input
                {...register('nickName', {
                  required: '닉네임을 입력해주세요.',
                  minLength: { value: 1, message: '닉네임은 최소 1자 이상이어야 합니다.' },
                })}
              />
              <button type="button" onClick={() => checkNickname(watch('nickName') ?? '')}>
                중복 확인
              </button>
              {errors.nickName && <p>{errors.nickName.message}</p>}
              {nicknameAvailable === false && <p>이미 사용 중인 닉네임입니다.</p>}
              <button type="submit">수정 완료</button>
              <button type="button" onClick={() => setEditMode(false)}>
                취소
              </button>
            </form>
          ) : (
            <div className="flex rounded-md  border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans ">
              <p>닉네임: {user?.nickName}</p>
              <button onClick={() => setEditMode(true)}>닉네임 수정</button>
            </div>
          )}
          <p className="rounded-md  border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans">
            이메일: {user?.email}
          </p>
          <p className="rounded-md border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans">
            생년월일: {user?.birthDate}
          </p>
          <p className="rounded-md  border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans">
            성별: {genderText}
          </p>
          <p className="rounded-md  border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans">
            Phone Number: {user?.phoneNumber || 'Not provided'}
          </p>
          <p className="rounded-md  border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans">
            멤버 등급: {user?.membership}
          </p>
          <p className="rounded-md  border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans">
            가입 경로: {user?.signupPath}
          </p>
          <p className="rounded-md  border-2 text-black p-1 placeholder-brand_2 placeholder:text-center font-sans">
            가입 일: {date}
          </p>
          <div className="absolute top-96 right-0  flex  justify-center items-start space-x-3">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              핸드폰 인증
            </button>
            <Modal title="휴대폰 인증" isOpen={isOpen} onClose={toggleModal}>
              <PhoneCertificationModal />
            </Modal>
            <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
              로그아웃
            </button>
          </div>
        </div>
      </div>

      <div className="text-center my-12 py-4 bg-brand_4">내가 구독한 유저의 모임 목록</div>
      <div className="flex space-x-3 overflow-x-auto">
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
      </div>
      <div className="text-center my-8 py-4 bg-brand_4">내가 신청한 모임 목록</div>
      <div className="flex space-x-3 overflow-x-auto">
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
      </div>
      <div className="text-center my-8 py-4 bg-brand_4">내가 관심 등록한 모임 목록</div>
      <div className="flex space-x-3 overflow-x-auto">
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
      </div>
      <div className="text-center my-8 py-4 bg-brand_4">내가 참여중인 채팅방 목록</div>
      <div className="flex space-x-3 custom-scrollbar overflow-x-auto">
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
      </div>
    </div>
  );
}
