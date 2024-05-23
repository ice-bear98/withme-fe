import axios from 'axios';

const axiosConfig = () => {
  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;

  const axiosInstance = axios.create({
    baseURL: URL,
    headers: {
      Authorization: token,
    },
  });

  return { axiosInstance };
};

export default axiosConfig;
