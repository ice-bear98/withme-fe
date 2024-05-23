import axiosConfig from '../api/axiosConfig';

const useGathering = () => {
  const { axiosInstance } = axiosConfig();

  const getMyGathering = async () => {
    try {
      const res = await axiosInstance.get('/api/gathering/mylist');
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const getInquiry = async (targetId: any) => {
    const queryParams = {
      gatheringid: targetId,
    };
    try {
      const res = await axiosInstance.get('/api/participation/list', {
        params: queryParams,
      });
      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const cancelApp = async (targetId: any) => {
    try {
      await axiosInstance.put(`/api/participation/reject/${targetId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const acceptApp = async (taretId: any) => {
    try {
      await axiosInstance.put(`/api/participation/approve/${taretId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return { getMyGathering, getInquiry, cancelApp, acceptApp };
};

export default useGathering;
