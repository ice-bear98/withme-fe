import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

const URL = import.meta.env.VITE_SERVER_URL;

export default function PhoneCertificationModal() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [certificationStarted, setCertificationStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [expirationSeconds, setExpirationSeconds] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (certificationStarted && expirationSeconds > 0) {
      timer = setTimeout(() => {
        setExpirationSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [certificationStarted, expirationSeconds]);

  const formatPhoneNumber = (value: string): string => {
    const phoneNumberDigits = value.replace(/\D/g, '');
    let formattedPhoneNumber = '';
    if (phoneNumberDigits.length < 4) {
      formattedPhoneNumber = phoneNumberDigits;
    } else if (phoneNumberDigits.length < 7) {
      formattedPhoneNumber = `${phoneNumberDigits.slice(0, 3)}-${phoneNumberDigits.slice(3)}`;
    } else if (phoneNumberDigits.length < 11) {
      formattedPhoneNumber = `${phoneNumberDigits.slice(0, 3)}-${phoneNumberDigits.slice(3, 6)}-${phoneNumberDigits.slice(6)}`;
    } else {
      formattedPhoneNumber = `${phoneNumberDigits.slice(0, 3)}-${phoneNumberDigits.slice(3, 7)}-${phoneNumberDigits.slice(7, 11)}`;
    }
    return formattedPhoneNumber;
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedNumber);
  };

  const requestVerificationCode = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.post(
        `${URL}/api/auth/sms`,
        { receiverPhoneNumber: phoneNumber },
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setMessage('인증번호가 전송되었습니다.');
      setCertificationStarted(true);
      setExpirationSeconds(res.data.expirationSeconds);
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
        `${URL}/api/auth/sms`,
        {
          authenticationText: code,
          phoneNumber,
        },
        { headers: { Authorization: `${token}` } },
      );
      if (res.data === true) {
        setMessage('인증 성공!');
        setCertificationStarted(false);
      } else {
        setMessage('인증 실패: ' + res);
      }
      console.log(res);
    } catch (error) {
      setMessage('인증 실패.');
      console.error('Verification failed:', error);
    }
    setLoading(false);
  };

  const handleResendCode = () => {
    setCertificationStarted(false);
    setMessage('');
    setExpirationSeconds(0);
    setPhoneNumber('');
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
              onChange={handlePhoneNumberChange}
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
            {expirationSeconds === 0 ? <p>인증시간이 만료되었습니다.</p> : <p>남은 시간: {expirationSeconds}초</p>}
          </>
        )}
        {certificationStarted && expirationSeconds === 0 && (
          <button onClick={handleResendCode} disabled={loading}>
            재요청
          </button>
        )}
      </div>
    </div>
  );
}
