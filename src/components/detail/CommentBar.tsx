import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useComment from '../../Hooks/useComment';
import useFormat from '../../Hooks/useFormat';

export default function CommentBar({ data }: any) {
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalPages = Math.ceil(data.totalElements / data.size);

  const { id }: any = useParams();
  const commentRef: any = useRef();

  const { addComment, removeComment, editComment } = useComment();
  const { formatDate, formatTime } = useFormat();

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const commentsWithEditingFlag = data.map((comment) => ({
        ...comment,
        isEditing: false,
      }));
      setComments(commentsWithEditingFlag);

      const initialEditStates: { [key: string]: boolean } = {};
      data.forEach((comment) => {
        initialEditStates[comment.id] = false;
      });
      setEditStates(initialEditStates);
    }
  }, [data]);

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

    console.log(editContent);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditContent(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim() === '') {
      return;
    }
    addComment(comment, id);
    setComment('');
  };

  const handleEdit = (id: any) => {
    handleEditToggle(id);
    editComment(id, editContent);
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < data.totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const commentsToShow = comments.slice(currentPage * data.size, (currentPage + 1) * data.size);

  return (
    <div className="space-y-7 mt-3">
      {commentsToShow.map((comment: any) => (
        <div key={comment.id}>
          <div className="bg-gray-200 py-2 px-5 flex justify-between rounded-tl-lg rounded-tr-lg">
            <b>{comment.nickName} </b>
            <div>
              {formatDate(comment.updatedDttm)} {formatTime(comment.updatedDttm)} 작성
            </div>
          </div>

          <div className="flex justify-between bg-gray-100 py-2 px-5 rounded-bl-lg rounded-br-lg">
            {editStates[comment.id] ? (
              <input className="w-4/5" type="text" value={editContent} onChange={handleEditChange} />
            ) : (
              <p>{comment.commentContent} </p>
            )}

            <div className="space-x-5">
              {editStates[comment.id] ? (
                <button className="px-2 rounded-lg bg-brand_3" onClick={() => handleEdit(comment.id)}>
                  저장
                </button>
              ) : (
                <button className="px-2 rounded-lg bg-brand_3" onClick={() => handleEditToggle(comment.id)}>
                  수정
                </button>
              )}

              <button className="px-2 rounded-lg bg-red-200" onClick={() => removeComment(comment.id)}>
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
      <div>
        <input
          className="w-4/5 h-full placeholder:text-center p-2 border-gray-400"
          type="text"
          value={comment}
          onChange={handleCommentChange}
          ref={commentRef}
          placeholder="댓글을 입력하세요"
        />
        <button className="w-1/5 h-full bg-brand_2 p-2 font-bold text-white hover:bg-brand_1" onClick={handleSubmit}>
          작성하기
        </button>
      </div>
    </div>
  );
}
