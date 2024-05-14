import axios from 'axios';

const useGetPost = () => {
  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;

  const getPost = async () => {
    try {
      await axios
        .get(`${URL}/api/gathering/list`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log('서버 데이터 : ', res);
          return res;
        });
    } catch (error) {
      console.error(error);
    }
  };

  return { getPost };
};

export default useGetPost;
