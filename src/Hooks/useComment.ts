import axios from 'axios';

const useComment = () => {
  const token = localStorage.getItem('accessToken');
  const URL = import.meta.env.VITE_SERVER_URL;

  const addComment = async (commentContent: string, gatheringid: string) => {
    const queryParams = {
      gatheringid: gatheringid,
    };

    await axios
      .post(
        `${URL}/api/comment/add`,
        {
          commentContent,
        },
        {
          params: queryParams,
          headers: {
            Authorization: token,
          },
        },
      )
      .then((res) => console.log(res));
  };

  return {
    addComment,
  };
};

export default useComment;
