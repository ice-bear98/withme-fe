import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectRoute({ children }: any) {
  const navigate = useNavigate();
  const token: any = 123;

  // 비로그인 상태일시 홈으로 보내기
  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return token ? children : null;
}
