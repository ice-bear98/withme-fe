const useFormat = () => {
  /** 시간 데이터 가공 (13:04 -> 오후 1시 04분) */
  const formatTime = (time: any) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? '오후' : '오전';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedTime = `${period} ${formattedHour}시 ${minutes}분`;
    return formattedTime;
  };

  /** 날짜 데이터 가공 (2024-05-24 -> 2024년 5월 24일 금요일) */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };

    const formattedDate = date.toLocaleDateString('ko-KR', options);
    return formattedDate;
  };

  /** 나이 계산기 */
  const calculateAge = (birthdate: any): number => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return { formatDate, formatTime, calculateAge };
};

export default useFormat;
