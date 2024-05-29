import useFormat from '../../Hooks/useFormat';
import img from '../../assets/default_profile.jpg';

export default function AppList({ data, acceptApp, cancelApp }: any) {
  const { formatDate, formatTime, calculateAge } = useFormat();

  const isGender = (gender: string) => {
    if (gender === 'MALE') {
      return '남성';
    } else {
      return '여성';
    }
  };

  const myStatusClass = (status: string) => {
    switch (status) {
      case 'CREATED':
        return 'bg-yellow-300'; // 승인대기
      case 'APPROVED':
        return 'bg-green-300'; // 승인
      case 'REJECTED':
        return 'bg-red-300'; // 거절
      case 'CANCELED':
        return 'bg-gray-300'; // 취소
      default:
        return 'bg-black'; // 알수없는
    }
  };

  const myStatusText = (status: string) => {
    switch (status) {
      case 'CREATED':
        return '승인대기';
      case 'APPROVED':
        return '승인';
      case 'REJECTED':
        return '거절';
      case 'CANCELED':
        return '취소';
      default:
        return 'Unknown status';
    }
  };

  const isCheck = (status: string) => {
    if (status === 'APPROVED') {
      return '수락';
    } else {
      return '거절';
    }
  };

  return (
    <div className="border-2 dark:border-none w-[400px] mb-5 py-5 px-2 rounded-2xl shadow-md dark:bg-gray-700 dark:text-gray-200">
      <p className="text-start ml-2 mb-3 text-sm">{formatDate(data.createdDttm)}에 신청</p>
      <div className="flex items-center gap-2">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src={data.profileImg == null ? img : data.profileImg}
          alt="userImage"
        />
        <div className="flex-col">
          <p className="text-xl">{data.nickName}</p>
          <div className="space-x-3 mt-1 text-sm">
            <span className="bg-brand_3 py-1 px-2 rounded-xl dark:text-black">{calculateAge(data.birthDate)}세</span>
            <span
              className={`${data.gender == 'MALE' ? 'bg-blue-300' : 'bg-pink-300'} py-1 px-2 rounded-xl dark:text-black`}
            >
              {isGender(data.gender)}
            </span>
            {/* <span className={`${myStatusClass(data.status)} py-1 px-2 rounded-xl dark:text-black`}>
              {myStatusText(data.status)}
            </span> */}
            <button
              onClick={() => acceptApp(data.id)}
              className={`py-2 px-3 rounded-lg dark:text-black ${
                data.status === 'APPROVED' || data.status === 'REJECTED'
                  ? 'bg-gray-300 text-gray-500'
                  : 'bg-green-300 hover:text-white hover:bg-green-400'
              }`}
              disabled={data.status === 'APPROVED' || data.status === 'REJECTED'}
            >
              수락
            </button>
            <button
              onClick={() => cancelApp(data.id)}
              className={`py-2 px-3 rounded-lg dark:text-black ${
                data.status === 'REJECTED'
                  ? 'bg-gray-300 text-gray-500'
                  : 'bg-red-300 hover:text-white hover:bg-red-400'
              }`}
              disabled={data.status === 'REJECTED'}
            >
              거절
            </button>
          </div>
        </div>
      </div>
      {data.status === 'CREATED' ? (
        <p className="text-center mt-3 text-sm">
          {formatDate(data.updatedDttm)} {formatTime(data.updatedDttm)}에 요청
        </p>
      ) : (
        <p className="text-center mt-3 text-sm">
          {formatDate(data.updatedDttm)} {formatTime(data.updatedDttm)}에
          <span className={`${data.status === 'APPROVED' ? 'text-green-600' : 'text-red-600'} ml-1`}>
            {isCheck(data.status)}
          </span>
        </p>
      )}
    </div>
  );
}
