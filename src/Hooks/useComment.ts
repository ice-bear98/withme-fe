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

  const removeComment = async (commentId: any) => {
    await axios
      .delete(`${URL}/api/comment/${commentId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => console.log(res));
  };

  const editComment = async (commentId: any, commentContent: string) => {
    try {
      await axios
        .put(
          `${URL}/api/comment/${commentId}`,
          {
            commentContent: commentContent,
          },
          {
            headers: {
              Authorization: token,
            },
          },
        )
        .then((res) => console.log('댓글 수정 : ', res));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    addComment,
    removeComment,
    editComment,
  };
};

export default useComment;
