import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useComment from '../../Hooks/useComment';
import useFormat from '../../Hooks/useFormat';
import axios from 'axios';
import useUserStore from '../../store/userStore';
import defaultImg from '../../assets/default_profile.jpg';

export default function CommentBar() {
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const isLogin = useUserStore((state) => state.isLoggedIn);

  const userName = useUserStore((state) => state.user?.nickName);

  const { id }: any = useParams();
  const commentRef: any = useRef();
  const URL = import.meta.env.VITE_SERVER_URL;

  const { addComment, removeComment, editComment } = useComment();
  const { formatDate, formatTime } = useFormat();

  /** 댓글 페이지 변경 함수 */
  const changePage = (page: number) => {
    const pageLimit = Math.max(0, Math.min(page, totalPage - 1));
    setCurrentPage(pageLimit);
    fetchComments(pageLimit);
  };

  /** 댓글 요청 함수 */
  const fetchComments = async (page: number) => {
    try {
      const data = await axios.get(`${URL}/api/comment/list/${id}?page=${page}&size=10&sort=id,desc`);
      console.log('댓글 정보:', data);
      setComments(data.data.content);
      setTotalPage(data.data.totalPages);
    } catch (error) {
      console.error('댓글 요청 실패 : ', error);
    }
  };

  useEffect(() => {
    fetchComments(0);
    if (comments && Array.isArray(comments)) {
      const commentsWithEditingFlag = comments.map((comment) => ({
        ...comment,
        isEditing: false,
      }));
      setComments(commentsWithEditingFlag);

      const initialEditStates: { [key: string]: boolean } = {};
      comments.forEach((comment) => {
        initialEditStates[comment.id] = false;
      });
      setEditStates(initialEditStates);
    }
  }, []);

  /** 댓글 수정 토글 */
  const handleEditToggle = (commentId: string) => {
    setEditStates({
      ...editStates,
      [commentId]: !editStates[commentId],
    });

    if (!editStates[commentId]) {
      const targetComment = comments.find((comment) => comment.id === commentId);
      if (targetComment) {
        setEditContent(targetComment.commentContent);
      }
    }
  };

  /** 댓글 내용 입력(Add) 핸들러 */
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  /** 댓글 내용 변경(Edit) 핸들러 */
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditContent(e.target.value);
  };

  /** 댓글 등록 */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLogin) {
      alert('로그인 후 등록가능합니다.');
    } else if (comment.trim() === '') {
      return;
    }
    await addComment(comment, id);
    setComment('');
    fetchComments(currentPage);
  };

  /** 댓글 수정 */
  const handleEdit = async (id: any) => {
    await editComment(id, editContent);
    fetchComments(currentPage);
    handleEditToggle(id);
  };

  /** 댓글 삭제 */
  const handleRemove = async (id: any) => {
    await removeComment(id);
    fetchComments(currentPage);
  };

  /** 페이지 번호 생성 함수 */
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPage <= maxPagesToShow) {
      for (let i = 0; i < totalPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => changePage(i)}
            className={`px-2 py-1 border rounded-full ${i === currentPage ? 'bg-blue-300 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>,
        );
      }
    } else {
      const startPage = Math.max(0, Math.min(currentPage - Math.floor(maxPagesToShow / 2), totalPage - maxPagesToShow));
      const endPage = startPage + maxPagesToShow;

      if (startPage > 0) {
        pageNumbers.push(
          <button
            key="start"
            onClick={() => changePage(0)}
            className={`px-2 py-1 border rounded-full  ${currentPage === 0 ? 'bg-blue-300 text-white' : 'bg-gray-200'}`}
          >
            1
          </button>,
        );
        if (startPage > 1) {
          pageNumbers.push(
            <span key="start-ellipsis" className="px-2 py-1 bg-gray-200 rounded-full ">
              ···
            </span>,
          );
        }
      }

      for (let i = startPage; i < endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => changePage(i)}
            className={`px-2 py-1 border rounded-full  ${i === currentPage ? 'bg-blue-300 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>,
        );
      }

      if (endPage < totalPage) {
        if (endPage < totalPage - 1) {
          pageNumbers.push(
            <span key="end-ellipsis" className="px-2 py-1 bg-gray-200 rounded-full ">
              ···
            </span>,
          );
        }
        pageNumbers.push(
          <button
            key="end"
            onClick={() => changePage(totalPage - 1)}
            className={`px-2 py-1 border rounded-full  ${currentPage === totalPage - 1 ? 'bg-blue-300 text-white' : 'bg-gray-200'}`}
          >
            {totalPage}
          </button>,
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="space-y-7 mt-3">
      <div className="flex justify-between px-5">
        <button
          onClick={() => changePage(currentPage - 1)}
          className="border-2 shadow-sm py-1 px-3 rounded-2xl dark:bg-brand_1 dark:border-none"
          disabled={currentPage === 0}
        >
          이전
        </button>
        <h4 className="text-lg">댓글</h4>
        <button
          onClick={() => changePage(currentPage + 1)}
          className="border-2 shadow-sm py-1 px-3 rounded-2xl dark:bg-brand_1 dark:border-none"
          disabled={currentPage === totalPage - 1}
        >
          다음
        </button>
      </div>
      <div className="flex justify-center space-x-2">{renderPageNumbers()}</div>
      {comments.map((comment: any) => (
        <div key={comment.id}>
          <div className="bg-gray-200 py-2 px-5 flex items-center justify-between rounded-tl-lg rounded-tr-lg dark:bg-slate-400">
            <span className="flex items-center space-x-2">
              <img
                src={comment?.profileImg === null ? defaultImg : comment?.profileImg}
                alt="유저 프로필"
                className="w-9 h-9 rounded-full object-cover"
              />
              <b>{comment.nickName} </b>
            </span>
            <div>
              {formatDate(comment.updatedDttm)} {formatTime(comment.updatedDttm)} 작성
            </div>
          </div>

          <div className="flex justify-between bg-gray-100 py-2 px-5 rounded-bl-lg rounded-br-lg dark:bg-slate-500 dark:text-white">
            {editStates[comment.id] ? (
              <input
                className="w-4/5 border-2 border-brand_1 dark:text-black dark:bg-gray-200"
                type="text"
                value={editContent}
                onChange={handleEditChange}
              />
            ) : (
              <p>{comment.commentContent} </p>
            )}

            {comment.nickName === userName && (
              <div className="space-x-5">
                {editStates[comment.id] ? (
                  <button className="px-2 rounded-lg bg-brand_3 dark:text-black" onClick={() => handleEdit(comment.id)}>
                    저장
                  </button>
                ) : (
                  <button
                    className="px-2 rounded-lg bg-brand_3 dark:text-black"
                    onClick={() => handleEditToggle(comment.id)}
                  >
                    수정
                  </button>
                )}

                <button className="px-2 rounded-lg bg-red-200 dark:text-black" onClick={() => handleRemove(comment.id)}>
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          className="w-4/5 h-full placeholder:text-center p-2 border-gray-400 dark:bg-gray-100 dark:placeholder:text-black"
          type="text"
          value={comment}
          onChange={handleCommentChange}
          ref={commentRef}
          placeholder="댓글을 입력하세요"
        />
        <button
          className="w-1/5 h-full bg-brand_2 p-2 font-bold text-white hover:bg-brand_1"
          onClick={() => handleSubmit}
        >
          작성하기
        </button>
      </form>
    </div>
  );
}
