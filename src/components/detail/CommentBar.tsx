import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useComment from '../../Hooks/useComment';
import Loader from '../common/Loader';
import useFormat from '../../Hooks/useFormat';

export default function CommentBar({ data }: any) {
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState<string>('');
  const { id }: any = useParams();
  const commentRef: any = useRef();

  const { addComment } = useComment();
  const { formatDate, formatTime } = useFormat();

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.length < 1) {
      commentRef.current.focus();
    } else {
      addComment(comment, id);
      setComment('');
    }
  };

  useEffect(() => {
    setComments(data);
  }, [data]);

  console.log('댓글 : ', data);

  if (!data) {
    return (
      <div className="mt-10 w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="flex p-2 font-['TAEBAEKmilkyway']">
        <ul className="space-y-2 w-full">
          {comments.map((it: any) => (
            <li key={it.id} className="flex justify-between">
              <div className="text-lg">
                <b>{it.nickName} : </b>
                <span>{it.commentContent}</span>
              </div>
              <div className="flex space-x-2 text-gray-400 items-center">
                <span>{formatDate(it.updatedDttm)}</span>
                <span>{formatTime(it.updatedDttm)} 작성</span>
                <button className="px-2 bg-brand_3 text-black rounded-lg font-sans">수정</button>
                <button className="px-2 bg-red-200 text-black rounded-lg font-sans">삭제</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center my-3">
        <input
          onChange={handleComment}
          ref={commentRef}
          value={comment}
          className="border-2 border-slate-400 w-5/6 p-2 placeholder:text-center rounded-l-2xl"
          type="text"
          placeholder="댓글을 입력하세요"
        />
        <button onClick={handleSubmit} className="bg-brand_3 w-1/6 text-lg py-2 px-5 rounded-r-2xl hover:bg-brand_2">
          작성
        </button>
      </div>
    </div>
  );
}
