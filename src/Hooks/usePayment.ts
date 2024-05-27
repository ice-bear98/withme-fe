import axiosConfig from '../api/axiosConfig';

const usePayment = () => {
  const { axiosInstance } = axiosConfig();

  const appPay = async () => {
    try {
      const res = await axiosInstance.post('/api/payment');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const checkPay = async (data: any) => {
    console.log(data);

    try {
      await axiosInstance
        .put('/api/payment/approve', {
          encData: data.enc_data,
          encInfo: data.enc_info,
          tranCd: data.tran_cd,
          ordrChk: data.ordr_chk,
        })
        .then((res) => console.log(res));
    } catch (error) {
      console.error(error);
    }
  };

  return { appPay, checkPay };
};

export default usePayment;
