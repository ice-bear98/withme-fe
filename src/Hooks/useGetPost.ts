import axios from 'axios';

const useGetPost = () => {
  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;

  const getPost = async () => {
    await axios
      .get(`${URL}/api/gathering/list`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => console.log(res));
  };

  return { getPost };
};

export default useGetPost;
