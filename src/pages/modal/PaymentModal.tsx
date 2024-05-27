import React, { useEffect, useState } from 'react';
import usePayment from '../../Hooks/usePayment';

declare global {
  interface Window {
    KCP_Pay_Execute_Web: (form: HTMLFormElement) => void;
    m_Completepayment: (FormOrJson: any, closeEvent: any) => void;
  }
}

const PaymentModal: React.FC = () => {
  const [data, setData] = useState<any>();
  const { appPay, checkPay } = usePayment();

  useEffect(() => {
    const fetchData = async () => {
      const res = await appPay();
      setData(res);

      const script = document.createElement('script');
      script.src = 'https://testspay.kcp.co.kr/plugin/kcp_spay_hub.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        try {
          const form = document.forms.namedItem('order_info') as HTMLFormElement;
          if (form) {
            window.KCP_Pay_Execute_Web(form);
          } else {
            console.error('Payment form not found');
          }
        } catch (e) {
          console.error('Payment execution failed', e);
        }
      };

      script.onerror = () => {
        console.error('Failed to load KCP script');
      };

      return () => {
        document.body.removeChild(script);
      };
    };

    fetchData();
  }, []);

  // 결제 완료 후 데이터 처리를 위한 함수
  window.m_Completepayment = (FormOrJson, closeEvent) => {
    let formData = new FormData(FormOrJson); // 폼 데이터 생성

    let formDataObject: any = {}; // 결과를 담을 객체

    // FormData 객체의 forEach 메소드를 사용하여 formData를 객체로 변환
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log('Payment complete data:', formDataObject);

    checkPay(formDataObject);
    closeEvent();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <form name="order_info" id="order_info">
          <input type="hidden" name="ordr_idxx" value={data?.ordrId} />
          <input type="hidden" name="good_name" value={data?.goodName} />
          <input type="hidden" name="good_mny" value={data?.goodMny} />
          <input type="hidden" name="pay_method" value={data?.payMethod} />
          <input type="hidden" name="site_cd" value={data?.siteCd} />
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
