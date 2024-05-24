import axios from 'axios';
import useUserStore from '../store/userStore';
import useFormat from './useFormat';

const useParticipation = () => {
  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;
  const user = useUserStore((state) => state);
  const setPart = useUserStore((state) => state.setMyParticipation);
  const myPart = useUserStore((state) => state.myParticipation);

  const { calculateAge } = useFormat();

  const addParticipation = async (id: any, memberId: any, participantsType: any) => {
    console.log(id, memberId, participantsType);

    if (user.isLoggedIn === false) {
      alert('로그인 후 이용가능합니다');
      return;
    } else if (user.user?.isCertification === false) {
      alert('마이페이지에서 휴대폰 인증 후 신청가능합니다');
      return;
    } else if (memberId === user.user.memberId) {
      alert('본인의 모집에 본인이 참여신청을 할 수는 없습니다');
    } else if (participantsType === 'ADULT' && calculateAge(user.user.birthDate) < 19) {
      alert('성인 제한 모임입니다');
    } else if (participantsType === 'MINOR' && calculateAge(user.user.birthDate) >= 19) {
      alert('미성년자 제한 모임입니다.');
    }

    try {
      const response = await axios.post(`${URL}/api/participation?gatheringid=${id}`, null, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 403) {
        alert('모임 및 이벤트 참여를 하려면 마이페이지에서 휴대폰 인증을 해야합니다');
        return;
      }

      console.log(response);

      alert('참여 신청이 완료되었습니다.');
    } catch (error) {
      console.error('모임 참여 통신 에러:', error);
    }
  };

  const cancelParticipation = async (targetId: any) => {
    const isConfirmed = confirm('정말 취소하겠습니까?');
    if (isConfirmed) {
      const partId = myPart.find((it: any) => it.gatheringId == targetId);

      try {
        const response = await axios.put(
          `${URL}/api/participation/cancel/${partId.id}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          },
        );
        console.log(response);
        alert('참여가 취소되었습니다.');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getCount = async (targetId: any) => {
    const queryParams = {
      gatheringid: targetId,
    };
    try {
      const res = await axios.get(`${URL}/api/participation/count`, {
        params: queryParams,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  const isCheck = async (targetId: any) => {
    const queryParams = {
      gatheringid: targetId,
    };
    try {
      const res = await axios.get(`${URL}/api/participation`, {
        params: queryParams,
        headers: {
          Authorization: token,
        },
      });
      console.log('신청 참여 여부 : ', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getList = async () => {
    const res = await axios.get(`${URL}/api/participation/mylist`, {
      headers: {
        Authorization: token,
      },
    });
    setPart(res.data.content);
    return res.data.content;
  };

  return { addParticipation, getCount, isCheck, getList, cancelParticipation };
};

export default useParticipation;
