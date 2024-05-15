import { useState } from 'react';
import axios from 'axios';

const URL = import.meta.env.VITE_SERVER_URL;

export default function PhoneCertificationModal() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [certificationStarted, setCertificationStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const requestVerificationCode = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.post(
        `${URL}/api/auth/phone/sms`,
        { receiverPhoneNumber: phoneNumber },
        { headers: { Authorization: `${token}` } },
      );
      setMessage('인증번호가 전송되었습니다.');
      setCertificationStarted(true);
      console.log(res);
    } catch (error) {
      setMessage('인증번호 요청 실패.');
      console.error(error);
    }
    setLoading(false);
  };

  const verifyCode = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.put(
        `${URL}/api/auth/phone`,
        {
          textAuthenticationNumber: code,
          phoneNumber,
        },
        { headers: { Authorization: `${token}` } },
      );
      if (res.data.success) {
        setMessage('인증 성공!');
        setCertificationStarted(false);
      } else {
        setMessage('인증 실패: ' + res.data.message);
      }
      console.log(res);
    } catch (error) {
      setMessage('인증 실패.');
      console.error('Verification failed:', error);
    }
    setLoading(false);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>{message}</p>
        {!certificationStarted ? (
          <>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="휴대폰 번호"
              disabled={loading}
            />
            <button onClick={requestVerificationCode} disabled={loading}>
              인증번호 받기
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증번호 입력"
              disabled={loading}
            />
            <button onClick={verifyCode} disabled={loading}>
              인증 확인
            </button>
          </>
        )}
      </div>
    </div>
  );
}
