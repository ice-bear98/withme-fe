import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdMale, IoMdFemale } from 'react-icons/io';
import { IoPersonCircle } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa';
import { RiMapPinAddFill, RiMessage3Fill } from 'react-icons/ri';

import useUserStore from '../store/userStore';
import axios from 'axios';
import Modal from './modal/Modal';
import PhoneCertificationModal from './modal/PhoneCertificationModal';
import ListCard from '../components/mypage/ListCard';
import useFormat from '../Hooks/useFormat';
import useParticipation from '../Hooks/useParticipation';
import defaultImg from '../assets/default_profile.jpg';
import useLike from '../Hooks/useLikes';

const URL = import.meta.env.VITE_SERVER_URL;

export default function Mypage() {
  const { user, setUser } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(user?.profileImg || defaultImg);
  const [editMode, setEditMode] = useState(false);
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);
  const [myAppList, setMyAppList] = useState<any>();
  const [myLikeList, setMyLikeList] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: {},
    reset,
    setError,
    watch,
  } = useForm({
    defaultValues: {
      nickName: user?.nickName,
    },
  });

  const { formatDate } = useFormat();
  const { getList } = useParticipation();
  const { getLikes } = useLike();

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

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('profileImg', file);

    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.put(`${URL}/api/member/profile_img`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      });

      if (res.status === 200) {
        fetchUserData();
        alert('프로필 이미지가 변경되었습니다.');
      } else {
        console.error('프로필 이미지 변경 실패:', res.statusText);
      }
    } catch (error) {
      console.error('프로필 이미지 변경 실패:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(`${URL}/api/member/detail`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (res.status === 200) {
        const updatedUser = res.data;
        setUser(updatedUser);
        setImage(updatedUser.profileImg || defaultImg);
      } else {
        console.error('유저 정보 가져오기 실패:', res.statusText);
      }
    } catch (error) {
      console.error('유저 정보 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    setImage(user?.profileImg || defaultImg);
    reset({
      nickName: user?.nickName,
    });
  }, [user, reset, user?.profileImg]);

  useEffect(() => {
    const fetchData = async () => {
      const appList = await getList();
      setMyAppList(appList);

      const likeList = await getLikes();
      setMyLikeList(likeList);
    };
    fetchData();
  }, []);

  console.log(myAppList);
  console.log(myLikeList);

  const genderText =
    user?.gender === 'MALE' ? (
      <span className="flex items-center ml-1">
        남성
        <IoMdMale className="p-1 bg-blue-300 text-xl rounded-full text-white ml-1" />
      </span>
    ) : (
      <span className="flex items-center ml-1">
        여성
        <IoMdFemale className="p-1 bg-pink-300 text-xl rounded-full text-white ml-1" />
      </span>
    );
  const nickName = user?.nickName;
  const date = user?.signupDttm ? user.signupDttm.slice(0, 10) : 'Not available';

  return (
    <div className="p-4 max-w-4xl m-auto font-['LINESeedKR-Bd']">
      <h1 className="flex items-center justify-center text-2xl font-bold mb-4 bg-brand_1 py-2 text-white rounded-lg font-['seolleimcool-SemiBold']">
        <IoPersonCircle className="mr-1 text-3xl" />
        {nickName ? `${nickName}님의 마이페이지` : 'Loading...'}
      </h1>
      {user ? (
        <div className="flex justify-center items-start gap-4 ssm:flex-col">
          <div className="w-1/2 h-96 flex flex-col justify-center items-center bg-brand_4 p-4 rounded-lg text-center ssm:w-full">
            <div className="">
              <img src={image} alt="Profile" className="rounded-full object-cover h-72 w-72 mb-4" />
            </div>
            <label
              htmlFor="image-upload"
              className="text-white hover:bg-brand_1 cursor-pointer bg-brand_2 p-2 rounded-lg"
            >
              프로필 이미지 변경하기
            </label>
            <input id="image-upload" type="file" onChange={handleImageChange} className="hidden" />
          </div>
          <div className="relative font-['LINESeedKR-Bd'] w-1/2 h-96 flex flex-col justify-between p-4 bg-brand_3 rounded-lg ssm:w-full">
            {editMode ? (
              <form
                onSubmit={handleSubmit(handleNicknameChange)}
                className="w-full gap-1 bg-white p-1 flex justify-center"
              >
                <input
                  className="border-2 border-brand_2 text-center"
                  {...register('nickName', {
                    required: '닉네임을 입력해주세요.',
                    minLength: { value: 1, message: '닉네임은 최소 1자 이상이어야 합니다.' },
                  })}
                />
                <button
                  type="button"
                  className="px-2 bg-brand_3 hover:bg-brand_2"
                  onClick={() => checkNickname(watch('nickName') ?? '')}
                >
                  중복 확인
                </button>
                <button type="submit" className="px-2 bg-sky-200 hover:bg-sky-300">
                  수정
                </button>
                <button type="button" className="px-2 bg-red-200 hover:bg-red-300" onClick={() => setEditMode(false)}>
                  취소
                </button>
              </form>
            ) : (
              <div className="flex gap-3 justify-center bg-white rounded-md text-black py-1 px-5 placeholder-brand_2 placeholder:text-center font-sans">
                <p>이름 : {user.nickName}</p>
                <button
                  onClick={() => setEditMode(true)}
                  className="px-2 bg-sky-100 rounded-xl text-sm hover:bg-sky-200"
                >
                  이름 변경
                </button>
              </div>
            )}
            <p className="flex justify-center gap-6 bg-white rounded-md text-black py-1 px-5 placeholder-brand_2 placeholder:text-center font-sans">
              휴대폰 : {user.phoneNumber || '미등록 (미인증)'}
              {user.isCertification ? (
                <span className="flex px-2 items-center  bg-yellow-200 rounded-xl text-sm">인증완료</span>
              ) : (
                <button onClick={() => setIsOpen(true)} className="px-2 bg-sky-100 rounded-xl text-sm hover:bg-sky-200">
                  핸드폰 인증
                </button>
              )}
            </p>
            <p className="flex justify-center bg-white rounded-md text-black py-1 px-5 placeholder-brand_2 placeholder:text-center font-sans">
              이메일 : {user.email}
            </p>
            <p className="flex justify-center bg-white rounded-md text-black py-1 px-5 placeholder-brand_2 placeholder:text-center font-sans">
              가입일 : {formatDate(date)}
            </p>
            <p className="flex justify-center bg-white rounded-md text-black py-1 px-5 placeholder-brand_2 placeholder:text-center font-sans">
              생년월일 : {user.birthDate}
            </p>
            <p className="flex justify-center bg-white rounded-md text-black py-1 px-5 placeholder-brand_2 placeholder:text-center font-sans">
              멤버 등급 : <span className="ml-1 bg-brand_3 px-2 rounded-lg">{user.membership}</span>
            </p>
            <p className="flex justify-center bg-white rounded-md text-black py-1 px-5 placeholder-brand_2 placeholder:text-center font-sans">
              가입 경로 :<span className="ml-1 bg-brand_3 px-2 rounded-lg">{user.signupPath}</span>
            </p>
            <p className="flex justify-center bg-white rounded-md text-black py-1 px-5 placeholder-brand_2 placeholder:text-center font-sans">
              성별 : {genderText}
            </p>
            <div className="absolute top-96 right-0 flex justify-center items-start space-x-3">
              <Modal title="휴대폰 인증" isOpen={isOpen} onClose={toggleModal}>
                <PhoneCertificationModal />
              </Modal>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div className="flex items-center justify-center text-white text-lg my-5 py-2 bg-brand_2">
        <RiMapPinAddFill className="mr-2 text-2xl" />내 신청 목록
      </div>
      <div className="flex space-x-3 overflow-y-hidden overflow-x-auto h-72 ">
        {myAppList?.length === 0 && (
          <div className="flex justify-center items-center w-full h-full bg-brand_4">아직 신청한 모임이 없습니다</div>
        )}
        {myAppList?.map((it: any, idx: any) => <ListCard key={idx} list={it} kind={'App'} />)}
      </div>
      <div className="flex items-center justify-center text-white text-lg my-5 py-2 bg-brand_2">
        <FaHeart className="mr-2" />내 관심 목록
      </div>
      <div className="flex space-x-3 overflow-y-hidden overflow-x-auto h-72 ">
        {myLikeList?.length === 0 && (
          <div className="flex justify-center items-center w-full h-full bg-brand_4">아직 좋아요한 모임이 없습니다</div>
        )}
        {myLikeList?.map((it: any, idx: any) => <ListCard key={idx} list={it} kind={'Like'} />)}
      </div>
      <div className="flex justify-center items-center text-white text-lg my-5 py-2 bg-brand_2">
        <RiMessage3Fill className="mr-2 text-2xl" />내 참여 채팅방 목록
      </div>
      <div className="flex space-x-3 custom-scrollbar overflow-x-auto">
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
        <div className="min-w-72 min-h-64 bg-brand_3">아이템 카드</div>
      </div>
    </div>
  );
}
