import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useWrite = () => {
  const navigate = useNavigate();

  const addPost = async (data: any, token: any) => {
    await axios
      .post('http://localhost:8080/api/gathering', data, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => console.log(res));
  };

  return { addPost };
};

export default useWrite;
